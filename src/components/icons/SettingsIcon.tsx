import React from 'react';
import { PieIcon, type PieIconProps } from './PieIcon';

/**
 * Official PIE settings icon (pie-iconography, All/Functionality/settings.svg).
 * Used for the filter button, replacing the gear emoji.
 */
export const SettingsIcon = (props: Omit<PieIconProps, 'name'>) => (
    <PieIcon name="settings" {...props} />
);
