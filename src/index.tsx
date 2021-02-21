import {createContext, useContext} from 'react'


export enum Locale {
  English = 'en',
  Romanian = 'ro',
  Russian = 'ru'
}

export interface Translate {
   [translationKey: string]: Record<Locale, string>
}

export interface TranslateUtils {
   lang: Locale,
   t: (key: string, params?: { [key: string]: string }) => string
}

const intls: Translate = {
  hello: {
    en: 'Hello {name}!',
    ro: 'Salut {name}!',
    ru: 'Привет {name}!'
  },
};

function pickEntries(language: Locale): Record<keyof Translate, string> {
  const obj = {};
  for(const token of Object.keys(intls)) {
    obj[token] = intls[token][language];
  }
  return obj;
}

function translate(entries: Record<string, string>, key: string, params?: Record<string, string>) {
  const hostToken = entries[key];
  if(!params) {
    return hostToken;
  }

  return Object.entries(params).reduce((acc, [key, value]) => acc.replace(new RegExp(`{${key}}`, 'g'), value), hostToken);
}

export function generateTranslation(language: Locale) {
  const entries = pickEntries(language);
  return (key: string, params?: Record<string, string>) => translate(entries, key, params);
}

export const LocaleContext = createContext<TranslateUtils>({lang: Locale.English, t: generateTranslation(Locale.English)});

export function useIntl() {
  return useContext(LocaleContext);
};
