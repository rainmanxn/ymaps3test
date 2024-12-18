import { useYmaps3 } from '../../hooks/use-ymaps3';
import { type PlacemarkFeature } from '../../types';
import { ClusterNew } from '../clusterer';
import { Marker } from '../marker';

import { placemarks } from './placemarks';

import styles from './index.module.css';
import { GeojsonFeature } from '@yandex/ymaps3-entity-tile-loader';
import { fetchTile } from '../../utils/fetch-tile';

const MOSCOW_CENTER: [number, number] = [37.6173, 55.755826];
const TILE_SIZE = 256;

const getFeatureId = (feature: GeojsonFeature) => feature.id;
// const fetchT = useMemo(() => fetchTile(cache.current), [])

const getEntity = (feature: GeojsonFeature) => {
    if (feature?.properties?.count && (feature.properties.count as number) > 1) {
        return (
            <ClusterNew
                lngLat={feature.geometry.coordinates as [number, number]}
                count={feature.properties.count as number}
            />

        )
    }

    return <Marker {...(feature as PlacemarkFeature)} clickHandler={() => { console.log('click') }} />
}


export const Map = () => {
    const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        loading,
        YMapControls,
        YMapZoomControl,
        YMapGeolocationControl,
        YMapEntityTileLoader,
    } = useYmaps3();
    const theme = 'light';

    if (loading || !placemarks) {
        return (
            <div className={styles.mapContainer}>
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className={styles.mapContainer}>
            <YMap location={{ zoom: 13, center: MOSCOW_CENTER }} theme={theme}>
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                <YMapControls orientation='vertical' position='bottom right'>
                    <YMapGeolocationControl />
                    <YMapZoomControl />
                </YMapControls>
                <YMapEntityTileLoader
                    renderDelay={500}
                    tileSize={TILE_SIZE}
                    getFeatureId={getFeatureId}
                    fetchTile={fetchTile}
                    entity={getEntity}
                    // entity={(feature) => <YMapFeature id={feature.id} geometry={feature.geometry} properties={feature.properties} />}
                    onFeatureAdd={() => {}}
                    onFeatureRemove={() => {}}
                />
            </YMap>
        </div>
    );
};
