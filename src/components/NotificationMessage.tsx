/**
 * NotificationMessage
 *
 * @format
 */

import React from 'react';
import {View} from 'react-native';
import {Snackbar} from 'react-native-paper';

type NotificationMessageProps = {
    visible: boolean;
    message: string;
    onClose: () => void;
};

const NotificationMessage: React.FC<NotificationMessageProps> = ({visible, message, onClose}) => {
    return (
        <View>
            <Snackbar
                visible={visible}
                onDismiss={() => {}}
                action={{
                    label: 'Close',
                    onPress: onClose,
                }}>
                {message}
            </Snackbar>
        </View>
    );
};

export default NotificationMessage;
