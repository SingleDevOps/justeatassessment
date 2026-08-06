import { makeThemedStyles } from '../makeThemedStyles';

export const errorDialogStyles = makeThemedStyles((t) => ({
    overlay: {
        flex: 1,
        backgroundColor: t.color.overlay,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: t.spacing.d,
    },
    dialogCard: {
        width: '100%',
        maxWidth: 480,
        backgroundColor: t.color.containerDefault,
        borderRadius: t.radius.roundedF,
        paddingVertical: t.spacing.f,
        ...t.elevation.shadowB,
    },
}));
