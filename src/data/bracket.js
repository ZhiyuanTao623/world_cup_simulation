// 2026 FIFA World Cup — official knockout bracket
// R32 match numbers: 73–88 | R16: 89–96 | QF: 97–100 | SF: 101–102 | Final: 104
// Slot format: "A1" = 1st place Group A, "A2" = 2nd place Group A, "TP0"–"TP7" = 8 best 3rd-place picks
// Bracket source: FIFA official / Wikipedia 2026 FIFA World Cup knockout stage

const tm = (id) => `https://www.ticketmaster.com/event/${id}`
const FIFA_TICKETS_URL = 'https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/tickets'

// 3rd-place slots (TP0–TP7) are assigned in user-pick order to these R32 matches:
// TP0 → M74 (vs E1), TP1 → M77 (vs I1), TP2 → M79 (vs A1), TP3 → M80 (vs L1)
// TP4 → M81 (vs D1), TP5 → M82 (vs G1), TP6 → M85 (vs B1), TP7 → M87 (vs K1)

export const r32Pairings = [
  { id: 'm73', home: 'A2', away: 'B2',  venue: 'SoFi Stadium',             city: 'Inglewood, CA',        date: 'Jun 28', tmUrl: tm('Z7r9jZ1A7434f') },
  { id: 'm74', home: 'E1', away: 'TP0', venue: 'Gillette Stadium',          city: 'Foxborough, MA',       date: 'Jun 29', tmUrl: tm('Z7r9jZ1A74344') },
  { id: 'm75', home: 'F1', away: 'C2',  venue: 'Estadio BBVA',              city: 'Monterrey, Mexico',    date: 'Jun 29', tmUrl: FIFA_TICKETS_URL },
  { id: 'm76', home: 'C1', away: 'F2',  venue: 'NRG Stadium',               city: 'Houston, TX',          date: 'Jun 29', tmUrl: tm('Z7r9jZ1A7434p') },
  { id: 'm77', home: 'I1', away: 'TP1', venue: 'MetLife Stadium',           city: 'East Rutherford, NJ',  date: 'Jun 30', tmUrl: tm('Z7r9jZ1A74349') },
  { id: 'm78', home: 'E2', away: 'I2',  venue: 'AT&T Stadium',              city: 'Arlington, TX',        date: 'Jun 30', tmUrl: tm('Z7r9jZ1A7bOAx') },
  { id: 'm79', home: 'A1', away: 'TP2', venue: 'Estadio Azteca',            city: 'Mexico City, Mexico',  date: 'Jun 30', tmUrl: FIFA_TICKETS_URL },
  { id: 'm80', home: 'L1', away: 'TP3', venue: 'Mercedes-Benz Stadium',     city: 'Atlanta, GA',          date: 'Jul 1',  tmUrl: tm('Z7r9jZ1A7434_') },
  { id: 'm81', home: 'D1', away: 'TP4', venue: "Levi's Stadium",            city: 'Santa Clara, CA',      date: 'Jul 1',  tmUrl: tm('Z7r9jZ1A7434O') },
  { id: 'm82', home: 'G1', away: 'TP5', venue: 'Lumen Field',               city: 'Seattle, WA',          date: 'Jul 1',  tmUrl: tm('Z7r9jZ1A7434-') },
  { id: 'm83', home: 'K2', away: 'L2',  venue: 'BMO Field',                 city: 'Toronto, Canada',      date: 'Jul 2',  tmUrl: FIFA_TICKETS_URL },
  { id: 'm84', home: 'H1', away: 'J2',  venue: 'SoFi Stadium',              city: 'Inglewood, CA',        date: 'Jul 2',  tmUrl: tm('Z7r9jZ1A7434N') },
  { id: 'm85', home: 'B1', away: 'TP6', venue: 'BC Place',                  city: 'Vancouver, Canada',    date: 'Jul 2',  tmUrl: FIFA_TICKETS_URL },
  { id: 'm86', home: 'J1', away: 'H2',  venue: 'Hard Rock Stadium',         city: 'Miami, FL',            date: 'Jul 3',  tmUrl: tm('Z7r9jZ1A7434P') },
  { id: 'm87', home: 'K1', away: 'TP7', venue: 'GEHA Field at Arrowhead',  city: 'Kansas City, MO',      date: 'Jul 3',  tmUrl: tm('Z7r9jZ1A7434J') },
  { id: 'm88', home: 'D2', away: 'G2',  venue: 'AT&T Stadium',              city: 'Arlington, TX',        date: 'Jul 3',  tmUrl: tm('Z7r9jZ1A7434E') },
]

export const r16Pairings = [
  { id: 'm89', homeFrom: 'm74', awayFrom: 'm77', venue: 'Lincoln Financial Field', city: 'Philadelphia, PA',    date: 'Jul 4', tmUrl: tm('Z7r9jZ1A7434I') },
  { id: 'm90', homeFrom: 'm73', awayFrom: 'm75', venue: 'NRG Stadium',             city: 'Houston, TX',         date: 'Jul 4', tmUrl: tm('Z7r9jZ1A7434t') },
  { id: 'm91', homeFrom: 'm76', awayFrom: 'm78', venue: 'MetLife Stadium',         city: 'East Rutherford, NJ', date: 'Jul 5', tmUrl: tm('Z7r9jZ1A743Q_') },
  { id: 'm92', homeFrom: 'm79', awayFrom: 'm80', venue: 'Estadio Azteca',          city: 'Mexico City, Mexico', date: 'Jul 5', tmUrl: FIFA_TICKETS_URL },
  { id: 'm93', homeFrom: 'm83', awayFrom: 'm84', venue: 'AT&T Stadium',            city: 'Arlington, TX',       date: 'Jul 6', tmUrl: tm('Z7r9jZ1A7434s') },
  { id: 'm94', homeFrom: 'm81', awayFrom: 'm82', venue: 'Lumen Field',             city: 'Seattle, WA',         date: 'Jul 6', tmUrl: tm('Z7r9jZ1A7434w') },
  { id: 'm95', homeFrom: 'm86', awayFrom: 'm88', venue: 'Mercedes-Benz Stadium',  city: 'Atlanta, GA',         date: 'Jul 7', tmUrl: tm('Z7r9jZ1A7434S') },
  { id: 'm96', homeFrom: 'm85', awayFrom: 'm87', venue: 'BC Place',               city: 'Vancouver, Canada',   date: 'Jul 7', tmUrl: FIFA_TICKETS_URL },
]

export const qfPairings = [
  { id: 'm97',  homeFrom: 'm89', awayFrom: 'm90', venue: 'Gillette Stadium',        city: 'Foxborough, MA',   date: 'Jul 9',  tmUrl: tm('Z7r9jZ1A7434g') },
  { id: 'm98',  homeFrom: 'm93', awayFrom: 'm94', venue: 'SoFi Stadium',            city: 'Inglewood, CA',    date: 'Jul 10', tmUrl: tm('Z7r9jZ1A7434U') },
  { id: 'm99',  homeFrom: 'm91', awayFrom: 'm92', venue: 'Hard Rock Stadium',       city: 'Miami, FL',        date: 'Jul 11', tmUrl: tm('Z7r9jZ1A7434M') },
  { id: 'm100', homeFrom: 'm95', awayFrom: 'm96', venue: 'GEHA Field at Arrowhead', city: 'Kansas City, MO', date: 'Jul 11', tmUrl: tm('Z7r9jZ1A7434z') },
]

export const sfPairings = [
  { id: 'm101', homeFrom: 'm97',  awayFrom: 'm98',  venue: 'AT&T Stadium',          city: 'Arlington, TX', date: 'Jul 14', tmUrl: tm('Z7r9jZ1A7434y') },
  { id: 'm102', homeFrom: 'm99',  awayFrom: 'm100', venue: 'Mercedes-Benz Stadium', city: 'Atlanta, GA',   date: 'Jul 15', tmUrl: tm('Z7r9jZ1A743pZ') },
]

export const finalPairing = {
  id: 'm104', homeFrom: 'm101', awayFrom: 'm102',
  venue: 'MetLife Stadium', city: 'East Rutherford, NJ', date: 'Jul 19',
  tmUrl: tm('Z7r9jZ1A743j4'),
}

// Parse slot: "A1" → { group:'A', rank:0 } | "TP3" → { tp:3 }
export function parseSlot(slot) {
  if (slot.startsWith('TP')) return { tp: parseInt(slot.slice(2)) }
  return { group: slot[0], rank: parseInt(slot.slice(1)) - 1 }
}
