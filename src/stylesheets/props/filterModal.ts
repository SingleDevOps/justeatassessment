import { Dimensions } from 'react-native';
import { makeThemedStyles } from '../makeThemedStyles';

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

export const filterModalStyles = makeThemedStyles((t) => ({
    overlay: {
        flex: 1,
        backgroundColor: t.color.overlay,
        justifyContent: 'flex-end',
    },
    modalContainer: {
        height: SCREEN_HEIGHT * 0.92,
        backgroundColor: t.color.containerDefault,
        borderTopLeftRadius: t.radius.roundedF,
        borderTopRightRadius: t.radius.roundedF,
        paddingBottom: t.spacing.e + t.spacing.aSmall,
        width: '100%',
    },
    handle: {
        width: t.spacing.g,
        height: t.spacing.aSmall,
        borderRadius: t.radius.roundedA,
        backgroundColor: t.color.borderStrong,
        alignSelf: 'center',
        marginTop: t.spacing.b,
        marginBottom: t.spacing.aSmall,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: t.spacing.d,
        paddingVertical: t.spacing.c,
        borderBottomWidth: 1,
        borderBottomColor: t.color.dividerDefault,
    },
    headerTitle: {
        fontSize: t.fontSize.size16,
        fontFamily: t.fontFamily.bold,
        color: t.color.contentDefault,
    },
    headerButton: {
        fontSize: t.fontSize.size14,
        fontFamily: t.fontFamily.semibold,
        color: t.color.interactiveBrand,
        paddingHorizontal: t.spacing.b,
        paddingVertical: t.spacing.a,
        minHeight: 44,
    },
    disabledButton: {
        color: t.color.contentDisabled,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: t.spacing.d,
    },
    section: {
        marginTop: t.spacing.d,
    },
    sectionTitle: {
        fontSize: t.fontSize.size14,
        fontFamily: t.fontFamily.bold,
        color: t.color.contentDefault,
        marginBottom: t.spacing.c,
    },
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: t.spacing.b,
        borderBottomWidth: 1,
        borderBottomColor: t.color.dividerDefault,
    },
    toggleLabel: {
        fontSize: t.fontSize.size14,
        fontFamily: t.fontFamily.primary,
        color: t.color.contentDefault,
    },
    optionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: t.spacing.b,
    },
    optionPill: {
        paddingHorizontal: t.spacing.d,
        paddingVertical: t.spacing.b,
        borderRadius: t.radius.roundedE,
        borderWidth: 1,
        borderColor: t.color.borderDefault,
        backgroundColor: t.color.containerDefault,
        minHeight: 44,
        justifyContent: 'center',
    },
    selectedOptionPill: {
        backgroundColor: t.color.interactiveBrand,
        borderColor: t.color.interactiveBrand,
    },
    optionPillText: {
        fontSize: t.fontSize.size14,
        fontFamily: t.fontFamily.primary,
        color: t.color.contentDefault,
    },
    selectedOptionPillText: {
        color: t.color.contentInverseSolid,
        fontFamily: t.fontFamily.bold,
    },
    cuisineGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: t.spacing.b,
    },
    cuisineChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: t.spacing.c,
        paddingVertical: t.spacing.b,
        borderRadius: t.radius.roundedE,
        borderWidth: 1,
        borderColor: t.color.borderDefault,
        backgroundColor: t.color.containerDefault,
        minHeight: 44,
    },
    selectedCuisineChip: {
        backgroundColor: t.color.interactiveBrand,
        borderColor: t.color.interactiveBrand,
    },
    cuisineEmoji: {
        fontSize: t.fontSize.size14,
        marginRight: t.spacing.aSmall,
    },
    cuisineText: {
        fontSize: t.fontSize.size12,
        fontFamily: t.fontFamily.primary,
        color: t.color.contentDefault,
    },
    selectedCuisineText: {
        color: t.color.contentInverseSolid,
        fontFamily: t.fontFamily.bold,
    },
    footer: {
        paddingHorizontal: t.spacing.d,
        paddingTop: t.spacing.c,
        paddingBottom: t.spacing.b,
        borderTopWidth: 1,
        borderTopColor: t.color.dividerDefault,
    },
    applyButton: {
        backgroundColor: t.color.interactiveBrand,
        borderRadius: t.radius.roundedC,
        paddingVertical: t.spacing.c,
        alignItems: 'center',
        minHeight: 44,
        justifyContent: 'center',
    },
    applyButtonText: {
        fontSize: t.fontSize.size16,
        fontFamily: t.fontFamily.bold,
        color: t.color.contentInverseSolid,
    },
    activeFilterBadge: {
        position: 'absolute',
        top: -t.spacing.a,
        right: -t.spacing.a,
        backgroundColor: t.color.interactiveBrand,
        borderRadius: t.radius.roundedB,
        minWidth: t.spacing.d,
        height: t.spacing.d,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: t.spacing.a,
    },
    activeFilterBadgeText: {
        fontSize: t.fontSize.size12,
        fontFamily: t.fontFamily.bold,
        color: t.color.contentInverseSolid,
    },
}));
