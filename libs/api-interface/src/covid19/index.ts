import client from 'axios';
export const COVID19_GENERAL_API =
  'https://static.pipezero.com/covid/data.json';

export const fetchCovid19General = async () => {
  const { data } = await client.get(COVID19_GENERAL_API);
  const { locations, total, today } = data;
  return {
    locations,
    internal: {
      cases: total.internal.cases,
      casesToday: today.internal.cases,
      death: total.internal.death,
      deathToday: today.internal.death,
      recovered: total.internal.recovered,
      recoveredToday: today.internal.recovered,
      treating: total.internal.treating,
      treatingToday: today.internal.treating,
    },
    world: {
      cases: total.world.cases,
      casesToday: today.world.cases,
      death: total.world.death,
      deathToday: today.world.death,
      recovered: total.world.recovered,
      recoveredToday: today.world.recovered,
      treating: total.world.treating,
      treatingToday: today.world.treating,
    },
  } as const;
};

export type Covid19Response = Awaited<ReturnType<typeof fetchCovid19General>>;
