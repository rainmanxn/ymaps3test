// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

import { ReactElement } from 'react';
import { Feature } from '@yandex/ymaps3-types/packages/clusterer';

export type Location = {
    /** id точки  */
    id: string;
    /** Название организации/точки  */
    name: string;
    /** Адрес  */
    address: string;
    /** Координаты точек для отрисовки на карте */
    coordinates: {
        latitude: number;
        longitude: number;
    };
    workingHours: WorkingHours[];
};

export type PlacemarkType = {
    /**
     * Компонент иконки
     */
    Component: ReactElement;
    /**
     * Координаты иконки на карте
     */
    coordinates: [number, number];
    /**
     * Смещение левого верхнего угла иконки относительно точки привязки
     */
    iconOffset: [number, number];
    /**
     * Фигура активной области https://yandex.ru/dev/maps/jsbox/2.1/placemark_shape/
     */
    iconShape: IconShape;
    /**
     * Пользовательский хинт
     */
    hint?: string;
    /**
     * Обработчик клика на иконку
     */
    clickHandler?: () => void;
};

type IconShape = {
    type: string;
    coordinates: GeoCoordinatesType[] | GeoCoordinatesType;
    /**
     * Если type = 'Circle'
     */
    radius?: number;
};

type GeoCoordinatesType = [number, number];

export type WidgetProps = {
    apiKeyV3: string;
    // apiKey2Gis: string;
    // placemarks?: PlacemarkFeature[];
    // location: { zoom: number; center: [number, number] };
};

export interface PlacemarkFeature extends Feature {
    clickHandler?: () => void;
    Component: ReactElement;
}

type TwoGisFeature = {
    coordinates: [number, number];
    type: string;
    html: string;
    anchor: number[];
    userData: Location;
};

type TwoGisPlacemarks = {
    partnerPlacemarks: TwoGisFeature[];
    userPlacemark: TwoGisFeature;
};
