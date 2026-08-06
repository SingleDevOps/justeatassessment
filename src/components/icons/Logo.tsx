import React from 'react';
import { SvgXml } from 'react-native-svg';
import { pieLogo } from '../../assets/svg/pieLogo';
import type { StyleProp, ViewStyle } from 'react-native';

export type LogoProps = {
    width?: number | string;
    height?: number | string;
    style?: StyleProp<ViewStyle>;
};

/**
 * Official Just Eat logo (pie-logos, Brand/Light/light-justeat-primary-horizontal.svg).
 * Monochrome orange brand mark, legible on both light and dark themes.
 */
export const Logo = ({ width, height, style }: LogoProps) => (
    <SvgXml xml={pieLogo} width={width} height={height} style={style} />
);
