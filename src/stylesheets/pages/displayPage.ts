import { makeThemedStyles } from '../makeThemedStyles';

export const displayPageStyles = makeThemedStyles((t) => ({
    fullview: {
        flex: 1,
        backgroundColor: t.color.backgroundDefault,
    },
    countBar: {
        paddingHorizontal: t.spacing.d,
        paddingTop: t.spacing.c,
        paddingBottom: t.spacing.a,
    },
    areaText: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size16,
        color: t.color.contentDefault,
        marginBottom: t.spacing.aSmall,
    },
    countText: {
        fontFamily: t.fontFamily.primary,
        fontSize: t.fontSize.size12,
        color: t.color.contentSubdued,
    },
    container: {
        paddingHorizontal: t.spacing.d,
    },
    listfooterComponent: {
        height: t.spacing.g,
    },

    emptyStateContainer: {
        paddingTop: t.spacing.f,
        paddingBottom: t.spacing.g,
    },
}));
