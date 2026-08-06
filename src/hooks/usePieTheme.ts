import { useColorScheme } from 'react-native';
import { pieTokens, type PieThemeName, type PieTokens } from '../configs/pieTokens';

export type UsePieThemeResult = {
    /** The active PIE token theme (light or dark). */
    theme: PieTokens;
    /** True when the device colour scheme is dark. */
    isDarkMode: boolean;
    themeName: PieThemeName;
};

/**
 * Returns the PIE tokens for the active device colour scheme.
 *
 * Components and stylesheets receive `theme` and never branch on
 * hard-coded colours or parallel "dark" style twins — dark mode is a
 * token swap, per the PIE design system.
 */
export const usePieTheme = (): UsePieThemeResult => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    return {
        theme: isDarkMode ? pieTokens.dark : pieTokens.light,
        isDarkMode,
        themeName: isDarkMode ? 'dark' : 'light',
    };
};
