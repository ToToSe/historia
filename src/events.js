export default [
  {
    year: -3000,
    title: `Histoire de l'écriture`,
    url: `Histoire_de_l%27écriture`
  },
  {
    year: -480,
    title: `Bataille de Salamine`,
    url: `Bataille_de_Salamine`
  },
  {
    year: -58,
    title: `Guerre des Gaules`,
    url: `Guerre_des_Gaules`
  },
  {
    year: 481,
    title: `Royaumes francs`,
    url: `Royaumes_francs`
  },
  {
    year: 2022,
    title: `Invasion de l'Ukraine par la Russie`,
    url: `Invasion_de_l%27Ukraine_par_la_Russie_en_2022`
  },
  {
    year: 476,
    title: `Empire romain d'Occident`,
    url: `Empire_romain_d%27Occident`
  },
  {
    year: 1453,
    title: `Chute de Constantinople`,
    url: `Chute_de_Constantinople`
  },
  {
    year: 1789,
    title: `Révolution française`,
    url: `Révolution_française`
  },
  {
    year: -264,
    title: `Première guerre punique`,
    url: `Première_guerre_punique`
  },
  {
    year: -218,
    title: `Deuxième guerre punique`,
    url: `Deuxième_guerre_punique`
  },
  {
    year: -149,
    title: `Troisième guerre punique`,
    url: `Troisième_guerre_punique`
  },
].map((e, i) => ({
  ...e,
  text: {
    headline: e.title
  },
  unique_id: String(i),
  start_date: { year: e.year }
}))