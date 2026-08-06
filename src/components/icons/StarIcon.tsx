import React from 'react';
import { PieIcon, type PieIconProps } from './PieIcon';

/**
 * Official PIE star icon (pie-iconography, All/Reaction/star-filled.svg).
 * Typically filled with the PIE content-brand colour next to rating text.
 */
export const StarIcon = (props: Omit<PieIconProps, 'name'>) => (
    <PieIcon name="star" {...props} />
);
