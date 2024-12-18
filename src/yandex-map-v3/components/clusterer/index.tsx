
import { type LngLat } from '@yandex/ymaps3-types/common/types';


import { useYmaps3 } from '../../hooks/use-ymaps3';

import styles from './index.module.css';


type Props = {
    lngLat: LngLat;
    count: number;
}

const CircleA = ({ count }: { count: number }) => (
    <div
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: 'black',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold',
      }}
    >
      <span className={styles.clusterNumber}>{count}</span>
    </div>
  );

export const ClusterNew = ({ lngLat, count }: Props) => {
    const { loading, YMapMarker } = useYmaps3();

    if (!loading) {
        return (
            <YMapMarker coordinates={lngLat}>
                <CircleA count={count} />
            </YMapMarker>
        );
    }

    return null;
};
