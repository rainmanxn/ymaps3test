import React from 'react';
import ReactDOM from 'react-dom';
// import tileLoader from '@yandex/ymaps3-entity-tile-loader';
// const tileLoader = await import('@yandex/ymaps3-entity-tile-loader/dist/esm/index');

// const {YMapEntityTileLoader} = await ymaps3.import('@yandex/ymaps3-entity-tile-loader');

import { type YMaps3Type } from './context/ymaps3context';

const createNewScript = (src: string) => {
    const script = document.createElement('script');

    script.async = true;
    script.src = src;
    script.type = 'text/javascript';

    document.body.appendChild(script);

    return script;
};

export const initYamaps3 = async (key?: string): Promise<YMaps3Type> =>
    new Promise((resolve, reject) => {
        try {
            if (window.ymaps3) {
                console.log('AAA_1');
                const ymaps = window.ymaps3;

                ymaps.ready.then(() => {
                    ymaps
                        .import('@yandex/ymaps3-reactify')
                        .then((reactifyThen) => {
                            const reactify = reactifyThen.reactify.bindTo(React, ReactDOM);
                            // const controls = await ymaps.import('@yandex/ymaps3-controls@0.0.1');
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            // const { YMap } = reactify.module(ymaps);

                            resolve({
                                ymaps,
                                reactify,
                            });
                        });
                });
            } else {
                const src = `https://api-maps.yandex.ru/v3/?apikey=${key}&lang=ru_RU`;
                const script =
                    document.querySelector<HTMLScriptElement>(`script[src="${src}"]`) ||
                    createNewScript(src);

                script.onload = async () => {
                    if (window.ymaps3) {
                        const ymaps: typeof ymaps3 = window.ymaps3;

                        await ymaps.ready;
                        const ymaps3Reactify = await ymaps.import('@yandex/ymaps3-reactify');
                        const controls = await ymaps.import('@yandex/ymaps3-controls@0.0.1');
                        const tileLoader = await import('@yandex/ymaps3-entity-tile-loader');
                        const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM);
                        const controlsModule = reactify.module(controls);
                        const tileLoaderModule = reactify.module(tileLoader);

                        resolve({
                            ymaps,
                            reactify,
                            controlsModule,
                            tileLoaderModule,
                        });
                    }
                };

                script.onerror = reject;
            }
        } catch (e) {
            // console.log({ e });
        }
    });
