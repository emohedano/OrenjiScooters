/**
 * VehicleBanner
 *
 * @format
 */

import React from 'react';
import {Image, Text, StyleSheet} from 'react-native';
import {Banner} from 'react-native-paper';
import {Scooter, ScooterStatus} from '../api/models/Scooter';
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
    vehicle: Scooter | null;
    onClose: () => void;
};

const VehicleBanner: React.FC<VehicleBannerProps> = ({visible, vehicle, onClose}) => {
    const status = vehicle === null ? '' : ` ${ScooterStatus[vehicle.status]}`;

    // Since the Banner component only accepts text we neet to trick TS to accept it
    const bannerContent = ((
        <Text style={styles.statusLabel}>
            Status:
            <Text testID="vehicle-banner__status-value" style={styles.statusValue}>
                {status}
            </Text>
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
