import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { pieIllustrations, type PieIllustrationKey } from '../../assets/svg/pieIllustrations';
import { errorStateViewStyles } from '../../stylesheets/props/errorStateView';
import type { PieTokens } from '../../configs/pieTokens';

export type ErrorStateViewProps = {
    /** Which official PIE illustration to show above the copy. */
    illustration: PieIllustrationKey;
    title: string;
    message: string;
    theme: PieTokens;
    primaryActionLabel?: string;
    onPrimaryAction?: () => void;
    secondaryActionLabel?: string;
    onSecondaryAction?: () => void;
};

/**
 * Themed empty / error state: an official PIE illustration with title,
 * message and optional actions. Used for MainPage errors and the
 * DisplayPage "no results" state.
 */
export const ErrorStateView = ({
    illustration,
    title,
    message,
    theme,
    primaryActionLabel,
    onPrimaryAction,
    secondaryActionLabel,
    onSecondaryAction,
}: ErrorStateViewProps) => {
    const styles = errorStateViewStyles(theme);

    return (
        <View style={styles.container} accessibilityRole="alert">
            <SvgXml xml={pieIllustrations[illustration]} width={200} height={200} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            {primaryActionLabel && (
                <Pressable
                    onPress={onPrimaryAction}
                    style={styles.primaryButton}
                    accessibilityRole="button"
                    accessibilityLabel={primaryActionLabel}
                >
                    <Text style={styles.primaryButtonText}>{primaryActionLabel}</Text>
                </Pressable>
            )}
            {secondaryActionLabel && (
                <Pressable
                    onPress={onSecondaryAction}
                    style={styles.secondaryButton}
                    accessibilityRole="button"
                    accessibilityLabel={secondaryActionLabel}
                >
                    <Text style={styles.secondaryButtonText}>{secondaryActionLabel}</Text>
                </Pressable>
            )}
        </View>
    );
};
