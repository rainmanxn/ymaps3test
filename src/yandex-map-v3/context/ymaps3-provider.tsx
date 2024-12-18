import React, { memo, useEffect, useState } from 'react';

import { initYamaps3 } from '../init-ymaps3';

import { YMaps3Context, type YMaps3Type } from './ymaps3context';

type Props = { apiKey: string };

const Ymaps3Provider = ({ apiKey, children }: React.PropsWithChildren<Props>) => {
    const [maps, setMaps] = useState<Partial<YMaps3Type>>({});

    useEffect(() => {
        initYamaps3(apiKey).then((result) => setMaps(result));
    }, [apiKey]);

    if (!maps) return null;

    return <YMaps3Context.Provider value={maps}>{children}</YMaps3Context.Provider>;
};

export default memo(Ymaps3Provider);
