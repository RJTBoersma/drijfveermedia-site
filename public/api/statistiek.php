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
$maanden = array_map(fn($f) => basename($f, '.json'), glob(TELLER_MAP . '/*.json') ?: []);
rsort($maanden);
?><!doctype html>
<html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>Statistiek · Drijfveer Media</title>
<style>body{font-family:system-ui,sans-serif;margin:0;padding:24px;color:#10283f;background:#f4f7fa}main{max-width:900px;margin:auto}h1{margin:0 0 4px}.k{display:flex;gap:12px;flex-wrap:wrap;margin:18px 0}.k div{background:#fff;border:1px solid #d9e1ea;border-radius:12px;padding:14px 18px;min-width:160px}.k b{display:block;font-size:2rem}table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #d9e1ea;border-radius:12px;margin:12px 0 28px}td,th{padding:8px 12px;border-bottom:1px solid #e8eef4;text-align:left}td:last-child,th:last-child{text-align:right}a{color:#074663}</style></head>
<body><main>
<h1>Statistiek <?= $e($maand) ?></h1>
<p>Zonder cookies en zonder persoonsgegevens. Andere maand: <?php foreach ($maanden as $m): ?><a href="?sleutel=<?= $e($sleutel) ?>&amp;maand=<?= $e($m) ?>"><?= $e($m) ?></a> <?php endforeach; ?></p>
<div class="k"><div><b><?= $bezoeken ?></b>paginabezoeken</div><div><b><?= $aanvragen ?></b>aanvragen</div><div><b><?= $bezoeken ? round($aanvragen / $bezoeken * 100, 2) : 0 ?>%</b>aanvragen per bezoek</div></div>
<h2>Per dag</h2><table><tr><th>Dag</th><th>Bezoeken</th><th>Aanvragen</th></tr>
<?php $dagen = $data['dagen'] ?? []; krsort($dagen); foreach ($dagen as $d => $v): ?><tr><td><?= $e($d) ?></td><td><?= (int)($v['bezoeken'] ?? 0) ?></td><td><?= (int)($v['aanvragen'] ?? 0) ?></td></tr><?php endforeach; ?></table>
<h2>Pagina's</h2><table><tr><th>Pagina</th><th>Bezoeken</th></tr>
<?php foreach ($top($data['paginas'] ?? []) as $p => $n): ?><tr><td><a href="<?= $e($p) ?>"><?= $e($p) ?></a></td><td><?= (int)$n ?></td></tr><?php endforeach; ?></table>
<h2>Kwamen van</h2><table><tr><th>Website</th><th>Bezoeken</th></tr>
<?php foreach ($top($data['bronnen'] ?? []) as $p => $n): ?><tr><td><?= $e($p) ?></td><td><?= (int)$n ?></td></tr><?php endforeach; ?></table>
<h2>Aanvragen vanaf</h2><table><tr><th>Pagina</th><th>Aanvragen</th></tr>
<?php foreach ($top($data['aanvraagpaginas'] ?? []) as $p => $n): ?><tr><td><?= $e($p) ?></td><td><?= (int)$n ?></td></tr><?php endforeach; ?></table>
</main></body></html>
