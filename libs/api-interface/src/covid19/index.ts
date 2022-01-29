import client from 'axios';
export const COVID19_API = 'https://static.pipezero.com/covid/data.json';

type LocationField =
  | 'cases'
  | 'death'
  | 'treating'
  | 'recovered'
  | 'casesToday'
  | 'deathToday'
  | 'recoveredToday'
  | 'treatingToday';

type LocationData = Record<LocationField, number>;

type LocationReport = LocationData & Record<'name', string>;
export interface Covid19Response {
  locations: LocationReport[];
  internal: LocationData;
  world: LocationData;
}

export const fetchCovid19General = async () => {
  const { data } = await client.get(COVID19_API);
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
  } as Covid19Response;
};
