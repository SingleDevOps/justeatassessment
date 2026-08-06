import { StyleSheet } from 'react-native';
import type { PieTokens } from '../configs/pieTokens';

/**
 * Creates a cached theme-aware style factory.
 *
 * PIE tokens drive every stylesheet in the app, so a stylesheet is a
 * function of the active theme. The factory caches the created style
 * objects per theme (only `light` and `dark` exist), so calling it on
 * every render is a cheap map lookup and never re-runs StyleSheet.create.
 */
export const makeThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
    factory: (theme: PieTokens) => T
): ((theme: PieTokens) => T) => {
    const cache = new Map<PieTokens, T>();
    return (theme: PieTokens): T => {
        let styles = cache.get(theme);
        if (!styles) {
            styles = StyleSheet.create(factory(theme));
            cache.set(theme, styles);
        }
        return styles;
    };
};
