import { makeThemedStyles } from '../makeThemedStyles';

export const filterChipsBarStyles = makeThemedStyles((t) => ({
    chipsBar: {
        flexGrow: 0,
    },
    chipsContent: {
        paddingHorizontal: t.spacing.d,
        paddingVertical: t.spacing.b,
        gap: t.spacing.b,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: t.spacing.c,
        paddingVertical: t.spacing.aSmall,
        borderRadius: t.radius.roundedD,
        backgroundColor: t.color.containerDefault,
        borderWidth: 1,
        borderColor: t.color.borderDefault,
        minHeight: 44,
        justifyContent: 'center',
    },
    selectedChip: {
        backgroundColor: t.color.interactiveBrand,
        borderColor: t.color.interactiveBrand,
    },
    chipText: {
        fontFamily: t.fontFamily.semibold,
        fontSize: t.fontSize.size12,
        color: t.color.contentDefault,
    },
    selectedChipText: {
        color: t.color.contentInverseSolid,
    },
    chipCount: {
        fontFamily: t.fontFamily.primary,
        fontSize: t.fontSize.size12,
        color: t.color.contentSubdued,
        marginLeft: t.spacing.aSmall,
    },
    selectedChipCount: {
        color: t.color.contentInverseSolid,
    },
}));
