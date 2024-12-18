import { type YMap } from 'ymaps3';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Window {
        ymaps3?: typeof ymaps3;
    }
}

declare let map: YMap;
