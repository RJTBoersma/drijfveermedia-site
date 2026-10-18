<?php
// Bezoekersteller zonder cookies en zonder persoonsgegevens.
// We bewaren alleen tellingen per dag: welke pagina, van welke website iemand kwam (alleen de domeinnaam),
// en hoeveel aanvragen er binnenkwamen. Geen IP-adressen, geen apparaat-ID's, niets om iemand mee te herkennen.
declare(strict_types=1);

const TELLER_MAP = __DIR__ . '/data';

function teller_bestand(string $maand): string {
    return TELLER_MAP . '/' . preg_replace('/[^0-9-]/', '', $maand) . '.json';
}

function teller_ophogen(callable $wijzig): void {
    if (!is_dir(TELLER_MAP)) @mkdir(TELLER_MAP, 0750, true);
    $f = @fopen(teller_bestand(date('Y-m')), 'c+');
    if (!$f) return;
    if (flock($f, LOCK_EX)) {
        $inhoud = stream_get_contents($f);
        $data = json_decode($inhoud ?: '{}', true) ?: [];
        $wijzig($data, date('Y-m-d'));
        ftruncate($f, 0);
        rewind($f);
        fwrite($f, json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
        fflush($f);
        flock($f, LOCK_UN);
    }
    fclose($f);
}

function teller_plus(?array &$a, string $k, int $n = 1): void { $a[$k] = ($a[$k] ?? 0) + $n; }

// Een paginabezoek. $pad is het pad op onze site, $bron de domeinnaam van de verwijzer (of '').
function tel_bezoek(string $pad, string $bron): void {
    teller_ophogen(function (array &$d, string $dag) use ($pad, $bron) {
        teller_plus($d['dagen'][$dag], 'bezoeken');
        teller_plus($d['paginas'], $pad);
        if ($bron !== '') teller_plus($d['bronnen'], $bron);
    });
}

// Een aanvraag via het formulier.
function tel_aanvraag(string $pad): void {
    teller_ophogen(function (array &$d, string $dag) use ($pad) {
        teller_plus($d['dagen'][$dag], 'aanvragen');
        teller_plus($d['aanvraagpaginas'], $pad ?: '(onbekend)');
    });
}
