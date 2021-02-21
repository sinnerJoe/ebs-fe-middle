import React, {useState} from 'react';
import { render } from 'react-dom';
import { useIntl, generateTranslation, LocaleContext, Locale } from 'ebs-intl';

const createLocaleState = (lang) => ({
  lang,
  t: generateTranslation(lang)
});

const Root = () => {
  const [localeState, setLocaleState] = useState(() => createLocaleState(Locale.English));
  return (
    <LocaleContext.Provider value={localeState}>
      <App onLocaleChange={(lang) => setLocaleState(createLocaleState(lang))} />
    </LocaleContext.Provider>
  )
}

const rollLocale = (locale) => {
  return {
    [Locale.English]: Locale.Romanian,
    [Locale.Romanian]: Locale.Russian,
    [Locale.Russian]: Locale.English,
  }[locale]
}

const App = ({onLocaleChange}) => {
  const {t, lang} = useIntl();

  return <div>
    <div>{t('hello', {name: 'Абэма'})}</div>
    <button onClick={() => onLocaleChange(rollLocale(lang))}>Change language</button>
  </div>;
};

render(<Root />, document.getElementById('root'));
