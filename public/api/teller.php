<?php
// Ontvangt één paginabezoek van de site (navigator.sendBeacon). Zie teller-lib.php: geen cookies, geen persoonsgegevens.
declare(strict_types=1);
require __DIR__ . '/teller-lib.php';

header('Cache-Control: no-store');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(204); exit; }

$ua = (string)($_SERVER['HTTP_USER_AGENT'] ?? '');
if ($ua === '' || preg_match('/bot|crawl|spider|slurp|preview|headless|lighthouse|pingdom|monitor|curl|wget|python|java\//i', $ua)) { http_response_code(204); exit; }
// Respecteer "niet volgen" in de browser
if (($_SERVER['HTTP_DNT'] ?? '') === '1' || ($_SERVER['HTTP_SEC_GPC'] ?? '') === '1') { http_response_code(204); exit; }

$in = json_decode((string)file_get_contents('php://input', false, null, 0, 2000), true) ?: [];
$pad = (string)($in['p'] ?? '/');
if (!preg_match('#^/[a-z0-9/_.-]{0,150}$#i', $pad)) { http_response_code(204); exit; }
$bron = strtolower((string)parse_url((string)($in['r'] ?? ''), PHP_URL_HOST));
$bron = preg_replace('/^www\./', '', $bron);
if ($bron === 'drijfveermedia.nl' || !preg_match('/^[a-z0-9.-]{3,80}$/', $bron)) $bron = '';

tel_bezoek($pad, $bron);
http_response_code(204);
