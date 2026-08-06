import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { filterChipsBarStyles } from '../stylesheets/props/filterChipsBar';
import { LayoutFilterDef } from '../functions/filtering/layoutFilters';
import type { PieTokens } from '../configs/pieTokens';

type FilterChipsBarProps = {
    defs: LayoutFilterDef[];
    selectedIds: string[];
    onToggle: (id: string) => void;
    theme: PieTokens;
};

export const FilterChipsBar = ({ defs, selectedIds, onToggle, theme }: FilterChipsBarProps) => {
    if (defs.length === 0) {
        return null;
    }
    const styles = filterChipsBarStyles(theme);

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipsBar}
            contentContainerStyle={styles.chipsContent}
        >
            {defs.map(def => {
                const isSelected = selectedIds.includes(def.id);
                return (
                    <TouchableOpacity
                        key={def.id}
                        testID={`filter-chip-${def.id}`}
                        onPress={() => onToggle(def.id)}
                        style={[
                            styles.chip,
                            isSelected && styles.selectedChip,
                        ]}
                        accessibilityRole="button"
                        accessibilityState={{ selected: isSelected }}
                        accessibilityLabel={def.count > 0 ? `${def.title}, ${def.count} restaurants` : def.title}
                    >
                        <Text
                            style={[
                                styles.chipText,
                                isSelected && styles.selectedChipText,
                            ]}
                        >
                            {def.title}
                        </Text>
                        {def.count > 0 && (
                            <Text
                                style={[
                                    styles.chipCount,
                                    isSelected && styles.selectedChipCount,
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
