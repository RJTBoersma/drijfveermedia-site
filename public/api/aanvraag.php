<?php
// Ontvangt aanvragen van de site en mailt ze naar Drijfveer Media.
// Draait op de PHP van Vimexx. Geen database, geen cookies.

declare(strict_types=1);

const ONTVANGER = 'info@drijfveermedia.nl';
const AFZENDER  = 'website@drijfveermedia.nl';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /', true, 303);
    exit;
}

function veld(string $naam, int $max = 500): string {
    $waarde = trim((string)($_POST[$naam] ?? ''));
    $waarde = str_replace(["\r", "\n"], ' ', $waarde);
    return mb_substr($waarde, 0, $max);
}

// Elke inzending ook bewaren (api/data is afgeschermd), zodat er nooit een aanvraag stil verdwijnt.
function bewaar(string $bestand, array $gegevens): void {
    $map = __DIR__ . '/data';
    if (!is_dir($map)) { @mkdir($map, 0750, true); }
    $gegevens['tijd'] = date('c');
    // Aanvragen per maand, afgewezen inzendingen per dag (die bewaren we korter)
    $periode = $bestand === 'afgewezen' ? date('Y-m-d') : date('Y-m');
    @file_put_contents($map . '/' . $bestand . '-' . $periode . '.log', json_encode($gegevens, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n", FILE_APPEND | LOCK_EX);
    // Bewaartermijnen uit de privacyverklaring: aanvragen hooguit 3 maanden, afgewezen inzendingen 30 dagen.
    // Een maandbestand wordt na de laatste regel nog 2 maanden bewaard, dus de oudste regel is hooguit 3 maanden oud.
    foreach (glob($map . '/aanvragen-*.log') ?: [] as $oud) {
        if (filemtime($oud) < time() - 61 * 86400) { @unlink($oud); }
    }
    foreach (glob($map . '/afgewezen-*.log') ?: [] as $oud) {
        if (filemtime($oud) < time() - 30 * 86400) { @unlink($oud); }
    }
}

// Soort aanvraag naar een korte sleutel voor de bedankpagina
function soort_sleutel(string $soort): string {
    $s = mb_strtolower($soort);
    foreach (['kaart' => 'kaart', 'ads' => 'ads', 'website' => 'website', 'ai' => 'ai', 'scan' => 'scan', 'consult' => 'consult', 'training' => 'training', 'second' => 'second'] as $zoek => $sleutel) {
        if (str_contains($s, $zoek)) return $sleutel;
    }
    return 'contact';
}

// Spam: het lokveld moet leeg zijn, en het formulier moet minstens 3 seconden open hebben gestaan.
// Afgewezen inzendingen gaan naar een apart logbestand, zodat je kunt nalopen of er een echte klant tussen zat.
// De duur meet het apparaat zelf (milliseconden sinds het laden), dus een verkeerd ingestelde klok maakt niet uit.
$honing = veld('hp_veld_x') . veld('website_extra');
$duur   = (int)($_POST['t'] ?? -1);
$teSnel = $duur >= 0 && $duur < 1500;
if ($honing !== '' || $teSnel) {
    $verdacht = ['reden' => $honing !== '' ? 'lokveld' : 'te snel (' . $duur . ' ms)', 'naam' => veld('naam', 120), 'telefoon' => veld('telefoon', 40), 'email' => veld('email', 160), 'pagina' => veld('pagina', 200)];
    bewaar('afgewezen', $verdacht);
    // Toch even laten weten, met een herkenbaar onderwerp: zo zie je het als er een echte klant tussen zit.
    $tekst = [];
    foreach ($verdacht as $k => $v) { if ($v !== '') $tekst[] = $k . ': ' . $v; }
    @mail(ONTVANGER, '=?UTF-8?B?' . base64_encode('[Spam?] Afgewezen aanvraag: ' . ($verdacht['naam'] ?: $verdacht['telefoon'] ?: '-')) . '?=', implode("\n", $tekst), 'From: Drijfveer Media website <' . AFZENDER . ">\r\nContent-Type: text/plain; charset=UTF-8");
    header('Location: /bedankt/', true, 303);
    exit;
}

$gegevens = [
    'Soort aanvraag' => veld('soort', 60) ?: 'Aanvraag',
    'Naam'           => veld('naam', 120),
    'Telefoon'       => veld('telefoon', 40),
    'E-mail'         => veld('email', 160),
    'Website'        => veld('website', 200),
    'Vak'            => veld('vak', 80),
    'Plaats'         => veld('plaats', 80),
    'Belmoment'      => veld('moment', 40),
    'Vraag'          => trim(mb_substr((string)($_POST['bericht'] ?? ''), 0, 3000)),
    'Contact via'    => veld('contactwijze', 20) === 'mail' ? 'Alleen mailen' : '',
    'Geen website'   => veld('geen_website', 5) === 'ja' ? 'Heeft nog geen website' : '',
    'Uitkomst tool'  => veld('context', 400),
    'Hoe ken je ons' => veld('bron', 80),
    'Klikte vanaf'   => veld('van', 200),
    'Campagne'       => veld('campagne', 120),
    'Formulier op'   => veld('pagina', 200),
];

if ($gegevens['Telefoon'] === '' && $gegevens['E-mail'] === '') {
    header('Location: /contact/?fout=gegevens', true, 303);
    exit;
}

$regels = [];
foreach ($gegevens as $label => $waarde) {
    if ($waarde !== '') {
        $regels[] = $label . ': ' . $waarde;
    }
}
$regels[] = '';
// Deadline in het onderwerp: binnen kantoortijd binnen 15 minuten, anders de volgende werkdag vóór 8.15 uur
$nu = new DateTime('now', new DateTimeZone('Europe/Amsterdam'));
$feest = ['2026-01-01','2026-04-06','2026-04-27','2026-05-14','2026-05-25','2026-12-25','2026-12-26','2027-01-01','2027-03-29','2027-04-27','2027-05-06','2027-05-17','2027-12-25','2027-12-26'];
$werkdag = fn(DateTime $d) => (int)$d->format('N') < 6 && !in_array($d->format('Y-m-d'), $feest, true);
$minuten = (int)$nu->format('G') * 60 + (int)$nu->format('i');
if ($werkdag($nu) && $minuten >= 480 && $minuten < 1020) {
    $deadline = 'Bel vóór ' . (clone $nu)->modify('+15 minutes')->format('H.i');
} else {
    $d = clone $nu;
    if (!($werkdag($d) && $minuten < 480)) { do { $d->modify('+1 day'); } while (!$werkdag($d)); }
    $dagen = ['', 'ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];
    $deadline = 'Bel ' . $dagen[(int)$d->format('N')] . ' ' . $d->format('j-n') . ' vóór 8.15';
}
$regels[] = 'Ontvangen: ' . $nu->format('d-m-Y H:i') . ' · ' . $deadline;

$wie = trim(implode(', ', array_filter([$gegevens['Vak'], $gegevens['Plaats']]))) ?: ($gegevens['Naam'] ?: $gegevens['Telefoon'] ?: $gegevens['E-mail']);
$onderwerp = '=?UTF-8?B?' . base64_encode($deadline . ' · ' . $gegevens['Soort aanvraag'] . ' · ' . $wie) . '?=';
$kopregels = [
    'From: Drijfveer Media website <' . AFZENDER . '>',
    'Content-Type: text/plain; charset=UTF-8',
];
if (filter_var($gegevens['E-mail'], FILTER_VALIDATE_EMAIL)) {
    $kopregels[] = 'Reply-To: ' . $gegevens['E-mail'];
}

bewaar('aanvragen', $gegevens);
$verstuurd = @mail(ONTVANGER, $onderwerp, implode("\n", $regels), implode("\r\n", $kopregels));

// Tellen voor de statistiek (alleen het aantal en de pagina, geen gegevens van de aanvrager)
require __DIR__ . '/teller-lib.php';
tel_aanvraag(parse_url($gegevens['Klikte vanaf'] ?: $gegevens['Formulier op'], PHP_URL_PATH) ?: '', $gegevens['Soort aanvraag'], $gegevens['Campagne']);

if (!$verstuurd) {
    // De aanvraag staat wel in het logbestand, maar de mail kwam niet weg. Laat de bezoeker niet in de waan.
    header('Location: /contact/?fout=mail', true, 303);
    exit;
}

header('Location: /bedankt/?s=' . soort_sleutel($gegevens['Soort aanvraag']), true, 303);
exit;
