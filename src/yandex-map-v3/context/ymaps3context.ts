import { createContext } from 'react';
import type tileLoader from '@yandex/ymaps3-entity-tile-loader';
import type controlsModule from '@yandex/ymaps3-types/packages/controls';
import { type ReactifiedModule, type Reactify } from '@yandex/ymaps3-types/reactify';

export type YMaps3Type = {
    ymaps: typeof ymaps3;
    reactify: Reactify;
    controlsModule?: ReactifiedModule<typeof controlsModule>;
    tileLoaderModule?: ReactifiedModule<typeof tileLoader>;
};

export const YMaps3Context = createContext<Partial<YMaps3Type>>({});
