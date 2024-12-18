// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */
import React from 'react';

import { useYmaps3 } from '../../hooks/use-ymaps3';
import { type PlacemarkFeature } from '../../types';

import styles from './index.module.css';

export const Marker = ({ clickHandler, geometry: { coordinates }, ...data }: PlacemarkFeature) => {
    const { YMapMarker, loading } = useYmaps3();

    if (!loading) {
        return (
            <YMapMarker
                coordinates={coordinates}
                onClick={clickHandler}
                key={`pinAt${coordinates}_${coordinates}`}
            >
                {/* <img src={data?.iconUrl} alt='1' /> */}
                <img src='https://test-alfa-mobile.alfabank.ru/mobile/s3/static/partneroffers/gasstations/TebOil.svg' alt='g' />
                {/* <div className={styles.circle} /> */}
            </YMapMarker>
        );
    }

    return <div />;
};
