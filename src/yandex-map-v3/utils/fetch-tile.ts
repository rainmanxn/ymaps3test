import { GeojsonFeature } from "@yandex/ymaps3-entity-tile-loader";

const TEST_TILE_SERVER = 'http://0.0.0.0:3333';
const MODE = 'tile-clusterer';

const cache = new Map<string, GeojsonFeature[]>();
    
export const fetchTile = async (
    {tx, ty, tz, signal}: {
        tx: number;
        ty: number;
        tz: number;
        signal: AbortSignal;
    }): Promise<GeojsonFeature[]> => {
    const key = `${tx}-${ty}-${tz}`;
    console.log('cache', cache);
    if (cache.has(key)) {
        return cache.get(key) as GeojsonFeature[];
    }

    let features: GeojsonFeature[] = [];

    try {
        const data = await fetch(`${TEST_TILE_SERVER}/v1/${MODE}?x=${tx}&y=${ty}&z=${tz}`, {
            signal
        }).then((resp) => resp.json());

        signal.throwIfAborted();

        features = [...data.features];

        cache.set(key, features);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!e.message.includes('aborted')) {
            console.error(e);
        }
    }

    return features;
}