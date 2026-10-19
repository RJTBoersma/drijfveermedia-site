<?php
// Overzicht van de bezoekersteller. Openen met /api/statistiek.php?sleutel=JOUW-SLEUTEL
// De sleutel staat in data/sleutel.txt (dat bestand is niet via internet te lezen). Maak het één keer aan via FTP.
declare(strict_types=1);
require __DIR__ . '/teller-lib.php';
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

$sleutelBestand = TELLER_MAP . '/sleutel.txt';
$sleutel = is_file($sleutelBestand) ? trim((string)file_get_contents($sleutelBestand)) : '';
if (strlen($sleutel) < 12 || !hash_equals($sleutel, (string)($_GET['sleutel'] ?? ''))) {
    http_response_code(403);
    exit('Geen toegang. Zet een sleutel van minstens 12 tekens in api/data/sleutel.txt.');
}

$maand = preg_match('/^\d{4}-\d{2}$/', (string)($_GET['maand'] ?? '')) ? $_GET['maand'] : date('Y-m');
$data = is_file(teller_bestand($maand)) ? (json_decode((string)file_get_contents(teller_bestand($maand)), true) ?: []) : [];
$e = fn($s) => htmlspecialchars((string)$s, ENT_QUOTES);
$top = function (array $a, int $n = 25) { arsort($a); return array_slice($a, 0, $n, true); };
$bezoeken = array_sum(array_column($data['dagen'] ?? [], 'bezoeken'));
$aanvragen = array_sum(array_column($data['dagen'] ?? [], 'aanvragen'));
$binnen = array_sum(array_column($data['dagen'] ?? [], 'binnenkomsten'));
$bellen = array_sum(array_filter($data['klikken'] ?? [], fn($k) => str_starts_with((string)$k, 'bellen'), ARRAY_FILTER_USE_KEY));
$maanden = array_map(fn($f) => basename($f, '.json'), glob(TELLER_MAP . '/*.json') ?: []);
// Per onderwerp (cluster): pagina's samengeteld via clusters.json, dat bij elke build wordt gemaakt.
$kaart = is_file(__DIR__ . '/clusters.json') ? (json_decode((string)file_get_contents(__DIR__ . '/clusters.json'), true) ?: []) : [];
$cl = fn(string $pad) => $kaart[$pad] ?? (str_starts_with($pad, '/_tool/') ? 'Tools' : 'Overig');
$clusters = [];
foreach (['paginas' => 'bezoeken', 'binnenkomsten' => 'binnen', 'aanvraagpaginas' => 'aanvragen', 'aanvraag_eerste' => 'eerste', 'ai_paginas' => 'ai'] as $bron => $veld) {
    foreach ($data[$bron] ?? [] as $pad => $n) { $c = $cl((string)$pad); $clusters[$c][$veld] = ($clusters[$c][$veld] ?? 0) + (int)$n; }
}
uasort($clusters, fn($a, $b) => ($b['bezoeken'] ?? 0) <=> ($a['bezoeken'] ?? 0));
$aiTotaal = array_sum($data['ai_bronnen'] ?? []);
rsort($maanden);
?><!doctype html>
<html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>Statistiek · Drijfveer Media</title>
<style>body{font-family:system-ui,sans-serif;margin:0;padding:24px;color:#10283f;background:#f4f7fa}main{max-width:900px;margin:auto}h1{margin:0 0 4px}.k{display:flex;gap:12px;flex-wrap:wrap;margin:18px 0}.k div{background:#fff;border:1px solid #d9e1ea;border-radius:12px;padding:14px 18px;min-width:160px}.k b{display:block;font-size:2rem}table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #d9e1ea;border-radius:12px;margin:12px 0 28px}td,th{padding:8px 12px;border-bottom:1px solid #e8eef4;text-align:left}td:last-child,th:last-child{text-align:right}a{color:#074663}</style></head>
<body><main>
<h1>Statistiek <?= $e($maand) ?></h1>
<p>Zonder cookies en zonder persoonsgegevens. Andere maand: <?php foreach ($maanden as $m): ?><a href="?sleutel=<?= $e($sleutel) ?>&amp;maand=<?= $e($m) ?>"><?= $e($m) ?></a> <?php endforeach; ?></p>
<div class="k"><div><b><?= $bezoeken ?></b>paginabezoeken</div><div><b><?= (int)$aiTotaal ?></b>uit AI-assistenten</div><div><b><?= $binnen ?></b>bezoeken (binnenkomsten)</div><div><b><?= $aanvragen ?></b>aanvragen</div><div><b><?= $bellen ?></b>klikken op bellen</div><div><b><?= $binnen ? round($aanvragen / $binnen * 100, 2) : 0 ?>%</b>aanvragen per bezoek</div></div>
<h2>Per onderwerp</h2><p>Bezoeken, binnenkomsten en aanvragen per cluster. "Aanvragen" telt waar het formulier stond; "eerste pagina" telt op welke pagina de bezoeker die later een aanvraag deed, binnenkwam. Zo zie je ook wat een uitlegpagina oplevert.</p>
<table><tr><th>Onderwerp</th><th>Bezoeken</th><th>Binnenkomsten</th><th>Uit AI</th><th>Aanvragen (formulier)</th><th>Aanvragen (eerste pagina)</th></tr>
<?php foreach ($clusters as $c => $v): ?><tr><td><?= $e($c) ?></td><td><?= (int)($v['bezoeken'] ?? 0) ?></td><td><?= (int)($v['binnen'] ?? 0) ?></td><td><?= (int)($v['ai'] ?? 0) ?></td><td><?= (int)($v['aanvragen'] ?? 0) ?></td><td><?= (int)($v['eerste'] ?? 0) ?></td></tr><?php endforeach; ?></table>
<h2>Uit AI-assistenten (<?= (int)$aiTotaal ?>)</h2><p>Bezoekers die via ChatGPT, Perplexity, Gemini, Copilot of Claude binnenkwamen. Een deel van die apps geeft geen verwijzer mee, dus zie dit als ondergrens en kijk naar de trend per kwartaal.</p>
<table><tr><th>Bron</th><th>Binnenkomsten</th></tr><?php foreach ($top($data['ai_bronnen'] ?? []) as $p => $n): ?><tr><td><?= $e($p) ?></td><td><?= (int)$n ?></td></tr><?php endforeach; ?></table>
<table><tr><th>Binnengekomen op</th><th>Uit AI</th></tr><?php foreach ($top($data['ai_paginas'] ?? []) as $p => $n): ?><tr><td><a href="<?= $e($p) ?>"><?= $e($p) ?></a></td><td><?= (int)$n ?></td></tr><?php endforeach; ?></table>
<h2>Aanvragen naar eerste pagina en herkomst</h2><table><tr><th>Eerste pagina van de bezoeker</th><th>Aanvragen</th></tr>
<?php foreach ($top($data['aanvraag_eerste'] ?? []) as $p => $n): ?><tr><td><a href="<?= $e($p) ?>"><?= $e($p) ?></a></td><td><?= (int)$n ?></td></tr><?php endforeach; ?></table>
<table><tr><th>Kwam via site</th><th>Aanvragen</th></tr><?php foreach ($top($data['aanvraag_via'] ?? []) as $p => $n): ?><tr><td><?= $e($p) ?></td><td><?= (int)$n ?></td></tr><?php endforeach; ?></table>
<h2>Per dag</h2><table><tr><th>Dag</th><th>Paginabezoeken</th><th>Binnenkomsten</th><th>Aanvragen</th></tr>
<?php $dagen = $data['dagen'] ?? []; krsort($dagen); foreach ($dagen as $d => $v): ?><tr><td><?= $e($d) ?></td><td><?= (int)($v['bezoeken'] ?? 0) ?></td><td><?= (int)($v['binnenkomsten'] ?? 0) ?></td><td><?= (int)($v['aanvragen'] ?? 0) ?></td></tr><?php endforeach; ?></table>
<h2>Pagina's</h2><table><tr><th>Pagina</th><th>Bezoeken</th></tr>
<?php foreach ($top($data['paginas'] ?? []) as $p => $n): ?><tr><td><a href="<?= $e($p) ?>"><?= $e($p) ?></a></td><td><?= (int)$n ?></td></tr><?php endforeach; ?></table>
<h2>Kwamen van</h2><table><tr><th>Website</th><th>Bezoeken</th></tr>
<?php foreach ($top($data['bronnen'] ?? []) as $p => $n): ?><tr><td><?= $e($p) ?></td><td><?= (int)$n ?></td></tr><?php endforeach; ?></table>
<h2>Aanvragen vanaf</h2><table><tr><th>Pagina</th><th>Aanvragen</th></tr>
<?php foreach ($top($data['aanvraagpaginas'] ?? []) as $p => $n): ?><tr><td><?= $e($p) ?></td><td><?= (int)$n ?></td></tr><?php endforeach; ?></table>
<h2>Aanvragen per soort</h2><table><tr><th>Soort</th><th>Aanvragen</th></tr>
<?php foreach ($top($data['aanvraagsoorten'] ?? []) as $p => $n): ?><tr><td><?= $e($p) ?></td><td><?= (int)$n ?></td></tr><?php endforeach; ?></table>
<h2>Klikken op bellen, mail, vCard en route</h2><table><tr><th>Klik en pagina</th><th>Aantal</th></tr>
<?php foreach ($top($data['klikken'] ?? [], 40) as $p => $n): ?><tr><td><?= $e($p) ?></td><td><?= (int)$n ?></td></tr><?php endforeach; ?></table>
<h2>Binnenkomsten per pagina</h2><table><tr><th>Pagina</th><th>Binnenkomsten</th></tr>
<?php foreach ($top($data['binnenkomsten'] ?? []) as $p => $n): ?><tr><td><?= $e($p) ?></td><td><?= (int)$n ?></td></tr><?php endforeach; ?></table>
<h2>Campagnes (utm)</h2><table><tr><th>Campagne</th><th>Bezoeken</th><th>Aanvragen</th></tr>
<?php foreach ($top($data['campagnes'] ?? []) as $p => $n): ?><tr><td><?= $e($p) ?></td><td><?= (int)$n ?></td><td><?= (int)($data['aanvraagcampagnes'][$p] ?? 0) ?></td></tr><?php endforeach; ?></table>
</main></body></html>
