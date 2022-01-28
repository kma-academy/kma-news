export interface Option<T extends object | string = string> {
  name: string;
  value: T;
  type: 'plain_text' | 'json_text';
}
