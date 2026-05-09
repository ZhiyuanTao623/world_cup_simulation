// 2026 FIFA World Cup — official group draw (December 5, 2024, Miami)
// code: ISO 3166-1 alpha-2 (lowercase) used for flagcdn.com images
// England = gb-eng, Scotland = gb-sct (sub-national codes supported by flagcdn)

export const groups = {
  A: { teams: [
    { name: 'Mexico',             code: 'mx' },
    { name: 'South Africa',       code: 'za' },
    { name: 'Korea Republic',     code: 'kr' },
    { name: 'Czechia',            code: 'cz' },
  ]},
  B: { teams: [
    { name: 'Canada',             code: 'ca' },
    { name: 'Switzerland',        code: 'ch' },
    { name: 'Qatar',              code: 'qa' },
    { name: 'Bosnia-Herzegovina', code: 'ba' },
  ]},
  C: { teams: [
    { name: 'Brazil',             code: 'br' },
    { name: 'Morocco',            code: 'ma' },
    { name: 'Haiti',              code: 'ht' },
    { name: 'Scotland',           code: 'gb-sct' },
  ]},
  D: { teams: [
    { name: 'USA',                code: 'us' },
    { name: 'Paraguay',           code: 'py' },
    { name: 'Australia',          code: 'au' },
    { name: 'Türkiye',            code: 'tr' },
  ]},
  E: { teams: [
    { name: 'Germany',            code: 'de' },
    { name: 'Curaçao',            code: 'cw' },
    { name: "Côte d'Ivoire",      code: 'ci' },
    { name: 'Ecuador',            code: 'ec' },
  ]},
  F: { teams: [
    { name: 'Netherlands',        code: 'nl' },
    { name: 'Japan',              code: 'jp' },
    { name: 'Tunisia',            code: 'tn' },
    { name: 'Sweden',             code: 'se' },
  ]},
  G: { teams: [
    { name: 'Belgium',            code: 'be' },
    { name: 'Egypt',              code: 'eg' },
    { name: 'Iran',               code: 'ir' },
    { name: 'New Zealand',        code: 'nz' },
  ]},
  H: { teams: [
    { name: 'Spain',              code: 'es' },
    { name: 'Cape Verde',         code: 'cv' },
    { name: 'Saudi Arabia',       code: 'sa' },
    { name: 'Uruguay',            code: 'uy' },
  ]},
  I: { teams: [
    { name: 'France',             code: 'fr' },
    { name: 'Senegal',            code: 'sn' },
    { name: 'Norway',             code: 'no' },
    { name: 'Iraq',               code: 'iq' },
  ]},
  J: { teams: [
    { name: 'Argentina',          code: 'ar' },
    { name: 'Algeria',            code: 'dz' },
    { name: 'Austria',            code: 'at' },
    { name: 'Jordan',             code: 'jo' },
  ]},
  K: { teams: [
    { name: 'Portugal',           code: 'pt' },
    { name: 'Uzbekistan',         code: 'uz' },
    { name: 'Colombia',           code: 'co' },
    { name: 'DR Congo',           code: 'cd' },
  ]},
  L: { teams: [
    { name: 'England',            code: 'gb-eng' },
    { name: 'Croatia',            code: 'hr' },
    { name: 'Ghana',              code: 'gh' },
    { name: 'Panama',             code: 'pa' },
  ]},
}

export const groupNames = Object.keys(groups)

// Helper: get team info (name + code) by name, searching all groups
export function getTeamByName(name) {
  for (const g of Object.values(groups)) {
    const t = g.teams.find(t => t.name === name)
    if (t) return t
  }
  return null
}
