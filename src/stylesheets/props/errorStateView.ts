import { makeThemedStyles } from '../makeThemedStyles';

export const errorStateViewStyles = makeThemedStyles((t) => ({
    container: {
        alignItems: 'center',
        paddingHorizontal: t.spacing.e,
        paddingVertical: t.spacing.f,
    },
    title: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size20,
        color: t.color.contentDefault,
        textAlign: 'center',
        marginTop: t.spacing.d,
    },
    message: {
        fontFamily: t.fontFamily.primary,
        fontSize: t.fontSize.size14,
        color: t.color.contentSubdued,
        textAlign: 'center',
        lineHeight: t.lineHeight.lh20,
        marginTop: t.spacing.b,
        marginBottom: t.spacing.d,
    },
    primaryButton: {
        backgroundColor: t.color.interactiveBrand,
        borderRadius: t.radius.roundedE,
        paddingVertical: t.spacing.c,
        paddingHorizontal: t.spacing.f,
        minWidth: 160,
        alignItems: 'center',
        marginTop: t.spacing.b,
    },
    primaryButtonText: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size16,
        color: t.color.contentInverseSolid,
    },
    secondaryButton: {
        paddingVertical: t.spacing.c,
        paddingHorizontal: t.spacing.f,
        minWidth: 160,
        alignItems: 'center',
        marginTop: t.spacing.a,
    },
    secondaryButtonText: {
        fontFamily: t.fontFamily.semibold,
        fontSize: t.fontSize.size14,
        color: t.color.contentDefault,
    },
}));
