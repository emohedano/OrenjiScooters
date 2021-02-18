/**
 * VehicleBanner
 *
 * @format
 */

import React from 'react';
import {Image, Text, StyleSheet} from 'react-native';
import {Banner} from 'react-native-paper';
import {IScooterGeo, ScooterStatus} from '../api/models/Scooter';
import scooterImage from '../images/orange_scooter.png';

const styles = StyleSheet.create({
    image: {
        borderRadius: 10,
        backgroundColor: 'white',
    },
    statusLabel: {
        fontSize: 18,
    },
    statusValue: {
        fontWeight: 'bold',
    },
});

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

    const bannerContent = ((
        <Text style={styles.statusLabel}>
            Status:
            <Text style={styles.statusValue}>{getStatusLabel(status)}</Text>
        </Text>
    ) as unknown) as string;

    return (
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
                    source={scooterImage}
                    style={{
                        ...styles.image,
                        width: size * 2,
                        height: size * 2,
                    }}
                />
            )}
            accessibilityTraits="button"
            accessibilityComponentType="button">
            {bannerContent}
        </Banner>
    );
};

export default VehicleBanner;
