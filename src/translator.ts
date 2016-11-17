import * as _ from "lodash";
import { Observable, Subject } from "rx";

type Translation = string;
type TranslationKey = string;
type Language = "en" | "fi" | "se";
type TranslationList = { [id: string]: Translation };
type Translations = [Language, TranslationList];
type TranslationStream = Observable<Translation>;

interface ITranslator {
    addTranslations: (Translations) => void;
    selectLanguage: (Language) => void;
    translate: (key: string) => Translation;
    translateAsync: (key: string) => TranslationStream;
}

// ------------------

class Translator implements ITranslator {
    private translations: Translations[] = [];
    private lang: Language;
    private lang$ = new Subject<Language>();

    public addTranslations(data: Translations): void {
        this.translations.push(data);
    }

    public selectLanguage(lang: Language): void {
        this.lang = lang;
        this.lang$.onNext(lang);
    }

    public translate(key: string): Translation {
        const translations = _.find(this.translations, (translations) => translations[0] === this.lang);
        const translationList = translations[1];

        if (!translationList || !translationList[key]) {
            return key;
        }

        return translationList[key];
    }

    public translateAsync(key: string): TranslationStream {
        return this.lang$.asObservable()
            .merge(Observable.of(this.lang))
            .map(lang => this.translate(key));
    }

}

const finnishTranslations: TranslationList = {
    'Hello': 'Moi',
    'Angular': 'Kulmikas',
    'Finland': 'Suomi'
};

const swedishTranslations: TranslationList = {
    'Hello': 'Hejsan',
    'Angular': 'Kantig',
    'Finland': 'Finland'
};

const translator = new Translator();
translator.addTranslations(['fi', finnishTranslations]);
translator.addTranslations(['se', swedishTranslations]);
translator.selectLanguage('fi');

console.log(
    'Hello:',
    translator.translate('Hello')
);

console.log(
    'Foo:',
    translator.translate('Foo')
);

translator.translateAsync('Angular')
    .subscribe(translation => console.log('Angular:', translation));

setTimeout(() => translator.selectLanguage('se'), 1500);
