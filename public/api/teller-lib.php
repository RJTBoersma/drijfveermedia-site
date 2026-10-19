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
function tel_bezoek(string $pad, string $bron, bool $binnen = false, string $utm = ''): void {
    teller_ophogen(function (array &$d, string $dag) use ($pad, $bron, $binnen, $utm) {
        if (str_starts_with($pad, '/_klik/')) { teller_plus($d['klikken'], substr($pad, 7)); return; }
        teller_plus($d['dagen'][$dag], 'bezoeken');
        teller_plus($d['paginas'], $pad);
        if ($bron !== '') teller_plus($d['bronnen'], $bron);
        // Bezoek uit AI-assistenten apart, per bron en per pagina waarop ze binnenkomen.
        if ($bron !== '' && $binnen && is_ai_bron($bron)) { teller_plus($d['ai_bronnen'], $bron); teller_plus($d['ai_paginas'], $pad); }
        if ($binnen) { teller_plus($d['dagen'][$dag], 'binnenkomsten'); teller_plus($d['binnenkomsten'], $pad); }
        if ($utm !== '') teller_plus($d['campagnes'], $utm);
    });
}

// Domeinen van AI-assistenten (ChatGPT, Perplexity, Gemini, Copilot, Claude en andere).
function is_ai_bron(string $bron): bool {
    return (bool)preg_match('/(^|\.)(chatgpt\.com|openai\.com|perplexity\.ai|gemini\.google\.com|bard\.google\.com|copilot\.microsoft\.com|claude\.ai|you\.com|phind\.com|mistral\.ai|deepseek\.com|meta\.ai|grok\.com)$/', $bron);
}

// Een aanvraag via het formulier. $eerste is de eerste pagina in die tab, $via de site waar de bezoeker vandaan kwam.
function tel_aanvraag(string $pad, string $soort = '', string $campagne = '', string $eerste = '', string $via = ''): void {
    teller_ophogen(function (array &$d, string $dag) use ($pad, $soort, $campagne, $eerste, $via) {
        if (preg_match('#^/[a-z0-9/_.-]{0,150}$#i', $eerste)) teller_plus($d['aanvraag_eerste'], $eerste);
        if (preg_match('/^[a-z0-9.-]{3,80}$/', $via)) teller_plus($d['aanvraag_via'], $via);
        teller_plus($d['dagen'][$dag], 'aanvragen');
        teller_plus($d['aanvraagpaginas'], $pad ?: '(onbekend)');
        if ($soort !== '') teller_plus($d['aanvraagsoorten'], $soort);
        if ($campagne !== '') teller_plus($d['aanvraagcampagnes'], $campagne);
    });
}
