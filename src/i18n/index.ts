
import { strings, LocaleKey } from './strings';
export const t = (lang: string, key: string) => {
  const k = (lang as LocaleKey) in strings ? (lang as LocaleKey) : 'en';
  // @ts-ignore
  return strings[k][key] || key;
};
