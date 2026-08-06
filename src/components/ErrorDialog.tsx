import React from 'react';
import { Modal, View, Pressable, StyleSheet } from 'react-native';
import { ErrorStateView } from './icons/ErrorStateView';
import { errorDialogStyles } from '../stylesheets/props/errorDialog';
import type { PieIllustrationKey } from '../assets/svg/pieIllustrations';
import type { PieTokens } from '../configs/pieTokens';
import type { SearchErrorType } from '../viewmodels/useMainPageViewModel';

const ERROR_MESSAGES: Record<SearchErrorType, { title: string; message: string }> = {
    no_connection: {
        title: 'No Internet Connection',
        message: 'Please check your internet.',
    },
    api_error: {
        title: 'Error fetching restaurant data',
        message: 'The Just Eat API Endpoint is down, or your IP address is not European.',
    },
    invalid_postcode: {
        title: 'Invalid Postcode',
        message: 'You may have entered the wrong postal code, or it has been terminated.',
    },
};

const ERROR_ILLUSTRATIONS: Record<SearchErrorType, PieIllustrationKey> = {
    no_connection: 'noConnection',
    api_error: 'apiError',
    invalid_postcode: 'invalidPostcode',
};

type ErrorDialogProps = {
    visible: boolean;
    errorType: SearchErrorType | null;
    onDismiss: () => void;
    onRetry: () => void;
    theme: PieTokens;
};

/**
 * Popup dialog shown over the MainPage when a postcode search fails.
 * Keeps the search screen layout fixed while the error is displayed.
 */
export const ErrorDialog = ({ visible, errorType, onDismiss, onRetry, theme }: ErrorDialogProps) => {
    const styles = errorDialogStyles(theme);

    if (!errorType) {
        return null;
    }

    return (
        <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onDismiss}>
            <View style={styles.overlay}>
                <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss} accessibilityLabel="Dismiss error" accessibilityRole="button" />
                <View style={styles.dialogCard}>
                    <ErrorStateView
                        illustration={ERROR_ILLUSTRATIONS[errorType]}
                        title={ERROR_MESSAGES[errorType].title}
                        message={ERROR_MESSAGES[errorType].message}
                        theme={theme}
                        primaryActionLabel={errorType === 'invalid_postcode' ? undefined : 'Try again'}
                        onPrimaryAction={errorType === 'invalid_postcode' ? undefined : onRetry}
                        secondaryActionLabel="Dismiss"
                        onSecondaryAction={onDismiss}
                    />
                </View>
            </View>
        </Modal>
    );
};
