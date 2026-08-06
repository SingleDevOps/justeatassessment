import { makeThemedStyles } from '../makeThemedStyles';

export const localLegendsCarouselStyles = makeThemedStyles((t) => ({
    container: {
        marginTop: t.spacing.a,
        marginBottom: t.spacing.a,
    },
    title: {
        fontFamily: t.fontFamily.bold,
        fontSize: t.fontSize.size16,
        color: t.color.contentDefault,
        paddingHorizontal: t.spacing.d,
        marginBottom: t.spacing.b,
    },
    card: {
        width: 132,
        marginHorizontal: t.spacing.aSmall,
        padding: t.spacing.b,
        borderRadius: t.radius.roundedC,
        backgroundColor: t.color.containerDefault,
        borderWidth: 0.5,
        borderColor: t.color.borderDefault,
        alignItems: 'center',
    },
    logo: {
        width: t.spacing.h,
        height: t.spacing.h,
        borderRadius: t.radius.roundedE,
        backgroundColor: t.color.containerStrong,
        marginBottom: t.spacing.b,
    },
    name: {
        fontFamily: t.fontFamily.semibold,
        fontSize: t.fontSize.size12,
        color: t.color.contentDefault,
        textAlign: 'center',
    },
    rating: {
        fontFamily: t.fontFamily.primary,
        fontSize: t.fontSize.size12,
        color: t.color.contentBrand,
        marginTop: t.spacing.a,
    },
}));
