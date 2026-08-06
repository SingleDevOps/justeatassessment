import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { filterChipsBarStyles } from '../stylesheets/props/filterChipsBar';
import { LayoutFilterDef } from '../functions/filtering/layoutFilters';

type FilterChipsBarProps = {
    defs: LayoutFilterDef[];
    selectedIds: string[];
    onToggle: (id: string) => void;
    isDarkMode: boolean;
};

export const FilterChipsBar = ({ defs, selectedIds, onToggle, isDarkMode }: FilterChipsBarProps) => {
    if (defs.length === 0) {
        return null;
    }
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={filterChipsBarStyles.chipsBar}
            contentContainerStyle={filterChipsBarStyles.chipsContent}
        >
            {defs.map(def => {
                const isSelected = selectedIds.includes(def.id);
                return (
                    <TouchableOpacity
                        key={def.id}
                        testID={`filter-chip-${def.id}`}
                        onPress={() => onToggle(def.id)}
                        style={[
                            filterChipsBarStyles.chip,
                            isDarkMode && filterChipsBarStyles.darkChip,
                            isSelected && filterChipsBarStyles.selectedChip,
                        ]}
                    >
                        <Text
                            style={[
                                filterChipsBarStyles.chipText,
                                isDarkMode && filterChipsBarStyles.darkChipText,
                                isSelected && filterChipsBarStyles.selectedChipText,
                            ]}
                        >
                            {def.title}
                        </Text>
                        {def.count > 0 && (
                            <Text
                                style={[
                                    filterChipsBarStyles.chipCount,
                                    isDarkMode && filterChipsBarStyles.darkChipCount,
                                    isSelected && filterChipsBarStyles.selectedChipCount,
                                ]}
                            >
                                {def.count}
                            </Text>
                        )}
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};
