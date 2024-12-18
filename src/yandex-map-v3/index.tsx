import { memo } from 'react';

import { Map } from './components/map';
import Ymaps3Provider from './context/ymaps3-provider';
import { type WidgetProps } from './types';

export const YandexMapV3 = memo((props: WidgetProps) => (
    <Ymaps3Provider apiKey={props.apiKeyV3}>
        <Map />
    </Ymaps3Provider>
));
