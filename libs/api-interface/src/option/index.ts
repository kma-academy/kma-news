import client from '../axiosClient';
import { Option } from './option.interface';

export const getOptionByName = <T extends object | string = string>(
  name: string
) => {
  return client.get(`/options/${name}`) as Promise<Option<T>>;
};
