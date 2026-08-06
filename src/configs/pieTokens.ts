/**
 * PIE Design Tokens
 * -----------------
 *
 * Official values from the PIE design system monorepo
 * (`packages/tools/pie-design-tokens/pie-design-tokens.jsonc`), Just Eat
 * Takeaway's single source of truth for colours, spacing, typography,
 * radius, motion and elevation.
 *
 * Token names mirror the PIE alias tokens. Consumers MUST NOT invent new
 * token names; if a value is missing, update the PIE source of truth.
 *
 * Known divergences (documented in the README "PIE Alignment" section):
 * - `family-primary` is PIE's proprietary JetSansDigital; this app keeps
 *   its bundled OpenSans faces instead.
 * - Light/dark themes are the PIE "Jet" theme alias values compiled for
 *   Android/iOS (`android.jsonc` weights).
 */

export type PieThemeName = 'light' | 'dark';

/* ------------------------------------------------------------------ */
/* Global design tokens (theme-independent)                            */
/* ------------------------------------------------------------------ */

/** PIE spacing scale (alias: none, a-small, a–j). */
export const spacing = {
    none: 0,    // spacing-00
    aSmall: 2,  // spacing-02
    a: 4,       // spacing-04
    b: 8,       // spacing-08
    c: 12,      // spacing-12
    d: 16,      // spacing-16
    e: 24,      // spacing-24
    f: 32,      // spacing-32
    g: 40,      // spacing-40
    h: 56,      // spacing-56
    i: 64,      // spacing-64
    j: 80,      // spacing-80
} as const;

/** PIE radius scale (alias: rounded-none, rounded-a–g). */
export const radius = {
    roundedNone: 0, // radius-00
    roundedA: 4,    // radius-04
    roundedB: 8,    // radius-08
    roundedC: 12,   // radius-12
    roundedD: 16,   // radius-16
    roundedE: 50,   // radius-round (pill shaped elements)
    roundedF: 20,   // radius-20
    roundedG: 24,   // radius-24
} as const;

/** PIE typography scale (font-size / line-height tokens). */
export const fontSize = {
    size12: 12,
    size14: 14,
    size16: 16,
    size20: 20,
    size24: 24,
    size28: 28,
    size32: 32,
    size48: 48,
} as const;

export const lineHeight = {
    lh16: 16,
    lh20: 20,
    lh24: 24,
    lh28: 28,
    lh32: 32,
    lh36: 36,
    lh52: 52,
} as const;

/**
 * PIE font weights (`platform/android.jsonc`). The PIE primary family is
 * JetSansDigital (proprietary); the app uses bundled OpenSans faces.
 */
export const fontFamily = {
    primary: 'OpenSans-Regular',
    semibold: 'OpenSans-Semibold',
    bold: 'OpenSans-Bold',
    lightItalic: 'OpenSans-LightItalic',
} as const;

/** PIE motion tokens (timing-100 → timing-350, in ms). */
export const motion = {
    timing100: 100,
    timing150: 150,
    timing200: 200,
    timing250: 250,
    timing300: 300,
    timing350: 350,
} as const;

/** PIE elevation tokens (box-shadow-a → f) as RN shadow props. */
export const elevation = {
    shadowA: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.03,
        elevation: 1,
    },
    shadowB: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        shadowOpacity: 0.04,
        elevation: 3,
    },
    shadowD: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.08,
        elevation: 4,
    },
} as const;

/* ------------------------------------------------------------------ */
/* Theme alias tokens (Jet theme, light & dark)                        */
/* ------------------------------------------------------------------ */

export type PieColorTokens = {
    // Elementary
    backgroundDefault: string;
    backgroundSubtle: string;
    backgroundDark: string;
    containerDefault: string;
    containerSubtle: string;
    containerStrong: string;
    containerInverse: string;
    borderDefault: string;
    borderSubtle: string;
    borderStrong: string;
    borderForm: string;
    borderSelected: string;
    borderSelectedBrand: string;
    dividerDefault: string;
    dividerInverse: string;
    interactiveBrand: string;
    interactivePrimary: string;
    interactiveSecondary: string;
    interactiveInverse: string;
    interactiveError: string;
    overlay: string;

    // Supportive
    supportError: string;
    supportErrorTonal: string;
    supportWarning: string;
    supportWarningTonal: string;
    supportPositive: string;
    supportPositiveTonal: string;
    supportInfo: string;
    supportInfoTonal: string;
    supportBrand01: string;
    supportBrandTonal: string;
    supportBrand03: string;
    supportBrand06: string;
    supportBrand06Subtle: string;

    // Content
    contentDefault: string;
    contentSubdued: string;
    contentInverse: string;
    contentLight: string;
    contentDark: string;
    contentBrand: string;
    contentLink: string;
    contentError: string;
    contentPositive: string;
    contentPlaceholder: string;
    contentDisabled: string;
    contentDefaultSolid: string;
    contentInverseSolid: string;
    contentBrandSolid: string;

    // Reactive
    hover01: string;
    active01: string;
    disabled01: string;
    skeleton01: string;
    focusInner: string;
    focusOuter: string;
};

export type PieTokens = {
    name: PieThemeName;
    color: PieColorTokens;
    spacing: typeof spacing;
    radius: typeof radius;
    fontSize: typeof fontSize;
    lineHeight: typeof lineHeight;
    fontFamily: typeof fontFamily;
    motion: typeof motion;
    elevation: typeof elevation;
};

const light: PieTokens = {
    name: 'light',
    color: {
        // Elementary
        backgroundDefault: '#fdfdfb', // truffle-5
        backgroundSubtle: '#f6f3ef', // truffle-10
        backgroundDark: '#1c1a17', // truffle-100
        containerDefault: '#ffffff',
        containerSubtle: '#f6f3ef', // truffle-10
        containerStrong: '#f0ece6', // truffle-20
        containerInverse: '#2b2a28', // truffle-90
        borderDefault: '#f0ece6', // truffle-20
        borderSubtle: '#f6f3ef', // truffle-10
        borderStrong: '#e7e2da', // truffle-30
        borderForm: '#8c867e', // truffle-65
        borderSelected: '#4c4843', // truffle-75
        borderSelectedBrand: '#f36805', // orange
        dividerDefault: 'rgba(0, 0, 0, 0.08)',
        dividerInverse: 'rgba(255, 255, 255, 0.20)',
        interactiveBrand: '#f36805', // orange
        interactivePrimary: '#2b2a28', // truffle-90
        interactiveSecondary: '#f6f3ef', // truffle-10
        interactiveInverse: '#ffffff',
        interactiveError: '#cc0300', // red
        overlay: 'rgba(0, 0, 0, 0.55)',

        // Supportive
        supportError: '#cc0300', // red
        supportErrorTonal: '#ffd2d1', // red-5
        supportWarning: '#ffd600', // yellow
        supportWarningTonal: '#fff8d6', // yellow-10
        supportPositive: '#2b7836', // green
        supportPositiveTonal: '#ceeed3', // green-5
        supportInfo: '#3147ad', // blue
        supportInfoTonal: '#e4e9fb', // blue-5
        supportBrand01: '#ff8000', // orange-30
        supportBrandTonal: '#fddfc3', // orange-10
        supportBrand03: '#c1dade', // cupcake-30
        supportBrand06: '#5b3d5b', // aubergine-70
        supportBrand06Subtle: '#e3cfe3', // aubergine-10

        // Content
        contentDefault: 'rgba(0, 0, 0, 0.76)',
        contentSubdued: 'rgba(0, 0, 0, 0.64)',
        contentInverse: 'rgba(255, 255, 255, 0.9)',
        contentLight: 'rgba(255, 255, 255, 0.9)',
        contentDark: 'rgba(0, 0, 0, 0.76)',
        contentBrand: '#f36805', // orange
        contentLink: '#242e30', // charcoal-80
        contentError: '#cc0300', // red
        contentPositive: '#2b7836', // green
        contentPlaceholder: 'rgba(0, 0, 0, 0.55)',
        contentDisabled: 'rgba(0, 0, 0, 0.30)',
        contentDefaultSolid: '#242e30', // charcoal-80
        contentInverseSolid: '#ffffff',
        contentBrandSolid: '#f36805', // orange

        // Reactive
        hover01: 'rgba(0, 0, 0, 0.04)',
        active01: 'rgba(0, 0, 0, 0.12)',
        disabled01: '#f0ece6', // truffle-20
        skeleton01: '#f6f3ef', // truffle-10
        focusInner: '#ffffff',
        focusOuter: '#2b3e97', // blue-75
    },
    spacing,
    radius,
    fontSize,
    lineHeight,
    fontFamily,
    motion,
    elevation,
};

const dark: PieTokens = {
    name: 'dark',
    color: {
        // Elementary
        backgroundDefault: '#1c1a17', // truffle-100
        backgroundSubtle: '#3f3d39', // truffle-80
        backgroundDark: '#fdfdfb', // truffle-5
        containerDefault: '#2b2a28', // truffle-90
        containerSubtle: '#3f3d39', // truffle-80
        containerStrong: '#59564f', // truffle-70
        containerInverse: '#ffffff',
        borderDefault: '#59564f', // truffle-70
        borderSubtle: '#4c4843', // truffle-75
        borderStrong: '#8c867e', // truffle-65
        borderForm: '#beb7ac', // truffle-55
        borderSelected: '#e7e2da', // truffle-30
        borderSelectedBrand: '#f36805', // orange
        dividerDefault: 'rgba(255, 255, 255, 0.20)',
        dividerInverse: 'rgba(0, 0, 0, 0.08)',
        interactiveBrand: '#f36805', // orange
        interactivePrimary: '#ffffff',
        interactiveSecondary: '#4c4843', // truffle-75
        interactiveInverse: '#2b2a28', // truffle-90
        interactiveError: '#d60e0a', // red-50
        overlay: 'rgba(0, 0, 0, 0.55)',

        // Supportive
        supportError: '#d60e0a', // red-50
        supportErrorTonal: '#47121b', // red-100
        supportWarning: '#ffde33', // yellow-40
        supportWarningTonal: '#574a00', // yellow-90
        supportPositive: '#68ca77', // green-30
        supportPositiveTonal: '#023d1c', // green-90
        supportInfo: '#9eaef0', // blue-30
        supportInfoTonal: '#17214f', // blue-90
        supportBrand01: '#ff8000', // orange-30
        supportBrandTonal: '#613105', // orange-90
        supportBrand03: '#c1dade', // cupcake-30
        supportBrand06: '#5b3d5b', // aubergine-70
        supportBrand06Subtle: '#322932', // aubergine-90

        // Content
        contentDefault: 'rgba(255, 255, 255, 0.9)',
        contentSubdued: 'rgba(255, 255, 255, 0.86)',
        contentInverse: 'rgba(0, 0, 0, 0.76)',
        contentLight: 'rgba(255, 255, 255, 0.9)',
        contentDark: 'rgba(0, 0, 0, 0.76)',
        contentBrand: '#ff8000', // orange-30
        contentLink: '#ffffff',
        contentError: '#d60e0a', // red-50
        contentPositive: '#68ca77', // green-30
        contentPlaceholder: 'rgba(255, 255, 255, 0.55)',
        contentDisabled: 'rgba(255, 255, 255, 0.30)',
        contentDefaultSolid: '#ffffff',
        contentInverseSolid: '#3c4c4f', // charcoal-70
        contentBrandSolid: '#ff8000', // orange-30

        // Reactive
        hover01: 'rgba(255, 255, 255, 0.08)',
        active01: 'rgba(255, 255, 255, 0.20)',
        disabled01: '#3f3d39', // truffle-80
        skeleton01: '#3f3d39', // truffle-80
        focusInner: '#1c1a17', // truffle-100
        focusOuter: '#9eaef0', // blue-30
    },
    spacing,
    radius,
    fontSize,
    lineHeight,
    fontFamily,
    motion,
    elevation,
};

/** The official PIE Jet theme, light and dark variants. */
export const pieTokens: Record<PieThemeName, PieTokens> = { light, dark };
