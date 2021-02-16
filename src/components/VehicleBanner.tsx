/**
 * VehicleBanner
 *
 * @format
 */

import React from 'react';
import {View, Image} from 'react-native';
import {Banner} from 'react-native-paper';
import {IScooterGeo, ScooterStatus} from '../api/models/Scooter';

type VehicleBannerProps = {
    visible: boolean;
    vehicle: IScooterGeo | null;
    onClose: () => void;
};

function getStatusLabel(status: keyof typeof ScooterStatus | null) {
    if (status !== null) {
        return ScooterStatus[status];
    }

    return '';
}

const VehicleBanner: React.FC<VehicleBannerProps> = ({visible, vehicle, onClose}) => {
    const status = vehicle === null ? null : vehicle.properties.status;

    return (
        <View>
            <Banner
                visible={visible}
                actions={[
                    {
                        label: 'Close',
                        onPress: onClose,
                    },
                ]}
                icon={({size}) => (
                    <Image
                        source={{
                            uri: 'https://www.proskatersplace.com/wp-content/uploads/2020/02/Havoc-Mini-Orange.jpg',
                        }}
                        style={{
                            width: size,
                            height: size,
                        }}
                    />
                )}>
                Status: {getStatusLabel(status)}
            </Banner>
        </View>
    );
};

export default VehicleBanner;
