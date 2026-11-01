// Controle van telefoonnummers in het aanvraagformulier. Dezelfde regels staan in public/api/aanvraag.php (nummer_ok).
// Houdt nepnummers tegen zoals 0612345678, 0600000000 of een rij willekeurige cijfers van de verkeerde lengte.

export function nummerOk(invoer: string): boolean {
  const ruw = invoer.trim();
  // Alleen cijfers, spaties, streepjes, punten, schuine strepen en haakjes; een plus alleen vooraan
  if (!/^\+?[0-9\s\-.()/]+$/.test(ruw)) return false;
  let cijfers = ruw.replace(/\D/g, '');
  let buitenland = false;
  if (ruw.startsWith('+')) buitenland = true;
  else if (cijfers.startsWith('00')) { buitenland = true; cijfers = cijfers.slice(2); }

  let nummer: string;
  if (buitenland && cijfers.startsWith('31')) {
    // +31 6 ... of +31 (0)6 ...
    nummer = '0' + cijfers.slice(2).replace(/^0/, '');
  } else if (buitenland) {
    if (!/^[1-9][0-9]{7,14}$/.test(cijfers)) return false;
    return !lijktNep(cijfers.slice(-8));
  } else {
    nummer = cijfers;
  }
  // Nederlands nummer: 10 cijfers, begint met 0 en daarna geen 0
  if (!/^0[1-9][0-9]{8}$/.test(nummer)) return false;
  return !lijktNep(nummer.startsWith('06') ? nummer.slice(2) : nummer.slice(-7));
}

function lijktNep(deel: string): boolean {
  // Zeven of meer keer hetzelfde cijfer achter elkaar
  if (/(\d)\1{6,}/.test(deel)) return true;
  // Een oplopende of aflopende reeks, zoals 12345678 of 8765432
  const op = '01234567890123456789';
  const af = '98765432109876543210';
  return op.includes(deel) || af.includes(deel);
}
