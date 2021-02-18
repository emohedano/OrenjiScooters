/**
 * NotificationMessage
 *
 * @format
 */

import React from 'react';
import {Snackbar} from 'react-native-paper';

type NotificationMessageProps = {
    visible: boolean;
    message: string;
    onClose: () => void;
};

const NotificationMessage: React.FC<NotificationMessageProps> = ({visible, message, onClose}) => {
    return (
        <Snackbar
            visible={visible}
            onDismiss={() => {}}
            action={{
                label: 'Retry',
                onPress: onClose,
            }}
            accessibilityTraits="button"
            accessibilityComponentType="button">
            {message}
        </Snackbar>
    );
};

export default NotificationMessage;
