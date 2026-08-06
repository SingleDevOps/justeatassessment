import { makeThemedStyles } from '../makeThemedStyles';

export const restaurantMapStyles = makeThemedStyles((t) => ({
    container: {
        overflow: 'hidden',
        borderRadius: t.radius.roundedC,
    },
    map: {
        width: '100%',
        height: 200,
    },
    expandButton: {
        position: 'absolute',
        right: t.spacing.c,
        bottom: t.spacing.c,
        backgroundColor: t.color.interactiveBrand,
        paddingHorizontal: t.spacing.c,
        paddingVertical: t.spacing.b,
        borderRadius: t.radius.roundedE,
        minHeight: 44,
        justifyContent: 'center',
        ...t.elevation.shadowD,
    },
    expandButtonText: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size12,
        color: t.color.contentInverseSolid,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: t.color.backgroundDark,
    },
    modalMap: {
        flex: 1,
    },
    modalHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: t.spacing.g,
        paddingHorizontal: t.spacing.d,
    },
    closeButton: {
        backgroundColor: t.color.overlay,
        paddingHorizontal: t.spacing.d,
        paddingVertical: t.spacing.b,
        borderRadius: t.radius.roundedE,
        minHeight: 44,
        justifyContent: 'center',
    },
    closeButtonText: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size14,
        color: t.color.contentInverseSolid,
    },
}));
