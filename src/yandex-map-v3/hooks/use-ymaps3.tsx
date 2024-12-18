import { useContext } from 'react';

import { YMaps3Context } from '../context/ymaps3context';

export const useYmaps3 = () => {
    const { reactify, ymaps, controlsModule, tileLoaderModule } = useContext(YMaps3Context);

    if (!reactify || !ymaps || !controlsModule || !tileLoaderModule) {
        const {
            YMap,
            YMapControls,
            YMapDefaultSchemeLayer,
            YMapDefaultFeaturesLayer,
            YMapMarker,
            YMapControl,
            YMapControlButton,
            YMapScaleControl,
            YMapFeature,
        } = reactify?.module(ymaps3) || {};

        const { YMapGeolocationControl, YMapZoomControl } = controlsModule || {};
        const { YMapEntityTileLoader } = tileLoaderModule || {};

        return {
            loading: true as const,
            YMap,
            YMapControls,
            YMapDefaultSchemeLayer,
            YMapDefaultFeaturesLayer,
            YMapMarker,
            YMapControl,
            YMapControlButton,
            YMapScaleControl,
            YMapGeolocationControl,
            YMapZoomControl,
            YMapEntityTileLoader,
            YMapFeature
        };
    }

    const {
        YMap,
        YMapControls,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapMarker,
        YMapControlButton,
        YMapScaleControl,
        YMapControl,
        YMapFeature,
    } = reactify.module(ymaps3);

    const { YMapGeolocationControl, YMapZoomControl } = controlsModule;
    const { YMapEntityTileLoader } = tileLoaderModule;

    return {
        loading: false as const,
        YMap,
        YMapControls,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapMarker,
        YMapControlButton,
        YMapScaleControl,
        YMapControl,
        YMapGeolocationControl,
        YMapZoomControl,
        YMapEntityTileLoader,
        YMapFeature,
    };
};
