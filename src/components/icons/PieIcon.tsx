import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { pieIcons, type PieIconName } from '../../assets/svg/pieIcons';
import type { StyleProp, ViewStyle } from 'react-native';

export type PieIconProps = {
    /** Which official PIE icon (pie-iconography) to render. */
    name: PieIconName;
    /** Theme colour to fill the icon with (PIE tokens). */
    color: string;
    /** Width and height in points. */
    size: number;
    style?: StyleProp<ViewStyle>;
};

/**
 * Renders an official PIE icon from its path data, filled with a theme
 * token colour at runtime (single-colour icons have no baked-in colour).
 */
export const PieIcon = ({ name, color, size, style }: PieIconProps) => {
    const icon = pieIcons[name];
    return (
        <Svg width={size} height={size} viewBox={icon.viewBox} style={style}>
            {icon.paths.map((d, index) => (
                <Path key={index} d={d} fill={color} />
            ))}
        </Svg>
    );
};
