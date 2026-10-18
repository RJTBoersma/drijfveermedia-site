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

// Spam: honeypot moet leeg zijn, en het formulier moet minstens 3 seconden open hebben gestaan.
$honing = veld('website_extra');
$start  = (int)($_POST['t'] ?? 0);
if ($honing !== '' || ($start > 0 && (time() - intdiv($start, 1000)) < 3)) {
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
    'Vraag'          => trim(mb_substr((string)($_POST['bericht'] ?? ''), 0, 3000)),
    'Gevonden via'   => veld('bron', 80),
    'Pagina'         => veld('pagina', 200),
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
$regels[] = 'Ontvangen: ' . date('d-m-Y H:i') . ' (bel binnen 15 minuten terug)';

$onderwerp = '=?UTF-8?B?' . base64_encode('Nieuwe aanvraag: ' . ($gegevens['Naam'] ?: $gegevens['Telefoon'] ?: $gegevens['E-mail'])) . '?=';
$kopregels = [
    'From: Drijfveer Media website <' . AFZENDER . '>',
    'Content-Type: text/plain; charset=UTF-8',
];
if (filter_var($gegevens['E-mail'], FILTER_VALIDATE_EMAIL)) {
    $kopregels[] = 'Reply-To: ' . $gegevens['E-mail'];
}

@mail(ONTVANGER, $onderwerp, implode("\n", $regels), implode("\r\n", $kopregels));

// Tellen voor de statistiek (alleen het aantal en de pagina, geen gegevens van de aanvrager)
require __DIR__ . '/teller-lib.php';
tel_aanvraag(parse_url($gegevens['Pagina'], PHP_URL_PATH) ?: '');

header('Location: /bedankt/', true, 303);
exit;
