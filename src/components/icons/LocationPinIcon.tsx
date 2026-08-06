import React from 'react';
import { PieIcon, type PieIconProps } from './PieIcon';

/**
 * Official PIE location pin icon (pie-iconography, All/Location/location-pin.svg).
 * Replaces the emoji pin in restaurant addresses.
 */
export const LocationPinIcon = (props: Omit<PieIconProps, 'name'>) => (
    <PieIcon name="locationPin" {...props} />
);
