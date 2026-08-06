import { makeThemedStyles } from '../makeThemedStyles';

export const mainpageStyles = makeThemedStyles((t) => ({

    // Main container style that wraps the entire screen
    // Uses flex to fill available space with the PIE background-default token
    overAll: {
        flex: 1, //Span the whole page
        backgroundColor: t.color.backgroundDefault,
    },

    // Container style for KeyboardAvoidingView
    // Ensures content adjusts when keyboard appears
    keyboardAvoidingView: {
        flex: 1,
    },

    // Primary content container with horizontal padding
    // Centers content vertically and provides spacing from edges
    container: {
        flex: 1, //Span the whole page
        backgroundColor: t.color.backgroundDefault,
        paddingHorizontal: t.spacing.d, //Padding for the search Bar
        justifyContent: 'center',
    },

    // Style for the Just Eat logo image
    // Official PIE logo mark (156:38 ratio), centered
    logo: {
        width: '77.5%',
        aspectRatio: 156 / 38,
        alignSelf: 'center',
        marginBottom: t.spacing.e,
    },

    // Container for search bar and title text
    // Positions search elements below logo with appropriate spacing
    searchContainer: {
        width: '100%',
        alignItems: 'center',
    },

    // Style for the "Near You" portion of title text
    // Defines appearance with italic subdued text that complements the brand text
    titleSecondpart: {
        fontSize: t.fontSize.size24,
        fontWeight: 'bold',
        color: t.color.contentSubdued,
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: t.spacing.aSmall,
    },

    // Container for two-part title text
    // Arranges "Find Restaurants" and "Near You" horizontally with centered alignment
    twoTexts: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '77.5%',
    },

    // Style for the "Find Restaurants" portion of title text
    // Uses the PIE interactive-brand colour with bold italic styling
    titleFirstpart: { //style of the text "Find Restaurants"
        fontSize: t.fontSize.size24,
        fontWeight: 'bold',
        color: t.color.interactiveBrand,
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: t.spacing.aSmall,
    },
}));
