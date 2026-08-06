import React from 'react';
import { PieIcon, type PieIconProps } from './PieIcon';

/**
 * Official PIE search icon (pie-iconography, All/Functionality/search.svg).
 * Coloured per placement (e.g. content-inverse on the brand search button).
 */
export const SearchIcon = (props: Omit<PieIconProps, 'name'>) => (
    <PieIcon name="search" {...props} />
);
