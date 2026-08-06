import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Modal, View, Text, Pressable, ScrollView, Switch, Animated, PanResponder, Dimensions, StyleSheet } from 'react-native';
import { filterModalStyles } from '../stylesheets/props/filterModal';
import { RATING_OPTIONS, DELIVERY_COST_OPTIONS, TOP_CUISINES } from '../configs/filterDefaults';
import { SORT_OPTIONS } from '../configs/sortingOptions';
import { useFilterModalViewModel } from '../viewmodels/useFilterModalViewModel';
import type { FilterState } from '../types/filterOptions';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DISMISS_THRESHOLD = SCREEN_HEIGHT * 0.2;

type FilterModalProps = {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: FilterState, sortOption: string) => void;
    currentFilters: FilterState;
    currentSortOption: string;
    isDarkMode: boolean;
};

export const FilterModal = ({ visible, onClose, onApply, currentFilters, currentSortOption, isDarkMode }: FilterModalProps) => {
    const vm = useFilterModalViewModel({ visible, currentFilters, currentSortOption, onApply, onClose });
    const [modalMounted, setModalMounted] = useState(false);
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const isClosingRef = useRef(false);

    const animateIn = useCallback(() => {
        translateY.setValue(SCREEN_HEIGHT);
        setModalMounted(true);
        Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [translateY]);

    const animateOut = useCallback((callback?: () => void) => {
        isClosingRef.current = true;
        Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            setModalMounted(false);
            isClosingRef.current = false;
            callback?.();
        });
    }, [translateY]);

    useEffect(() => {
        if (visible && !isClosingRef.current) {
            animateIn();
        }
    }, [visible, animateIn]);

    const handleClose = useCallback(() => {
        if (isClosingRef.current) return;
        animateOut(onClose);
    }, [animateOut, onClose]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 5,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    translateY.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > DISMISS_THRESHOLD || gestureState.vy > 0.5) {
                    isClosingRef.current = true;
                    Animated.timing(translateY, {
                        toValue: SCREEN_HEIGHT,
                        duration: 250,
                        useNativeDriver: true,
                    }).start(() => {
                        setModalMounted(false);
                        isClosingRef.current = false;
                        onClose();
                    });
                } else {
                    Animated.spring(translateY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    const handleApply = () => {
        animateOut(() => {
            vm.commit();
        });
    };

    if (!modalMounted) return null;

    return (
        <Modal visible animationType="none" transparent onRequestClose={handleClose}>
            <View style={filterModalStyles.overlay}>
                <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
                <Animated.View
                    style={[
                        filterModalStyles.modalContainer,
                        isDarkMode && filterModalStyles.darkModalContainer,
                        { transform: [{ translateY }] },
                    ]}
                >
                    <View {...panResponder.panHandlers}>
                        <View style={[filterModalStyles.handle, isDarkMode && filterModalStyles.darkHandle]} />

                        <View style={[filterModalStyles.header, isDarkMode && filterModalStyles.darkHeader]}>
                            <Pressable onPress={vm.reset}>
                                <Text style={[filterModalStyles.headerButton, !vm.hasChanges && filterModalStyles.disabledButton]}>
                                    Reset
                                </Text>
                            </Pressable>
                            <Text style={[filterModalStyles.headerTitle, isDarkMode && filterModalStyles.darkHeaderTitle]}>
                                Filters
                            </Text>
                            <Pressable onPress={handleApply}>
                                <Text style={filterModalStyles.headerButton}>Apply</Text>
                            </Pressable>
                        </View>
                    </View>

                    <ScrollView style={filterModalStyles.scrollView} showsVerticalScrollIndicator={false}>
                        <View style={filterModalStyles.section}>
                            <Text style={[filterModalStyles.sectionTitle, isDarkMode && filterModalStyles.darkSectionTitle]}>
                                Sort By
                            </Text>
                            <View style={filterModalStyles.optionsRow}>
                                {SORT_OPTIONS.map(option => {
                                    const isSelected = vm.localSortOption === option.value;
                                    return (
                                        <Pressable
                                            key={option.key}
                                            style={[
                                                filterModalStyles.optionPill,
                                                isDarkMode && filterModalStyles.darkOptionPill,
                                                isSelected && filterModalStyles.selectedOptionPill,
                                                isSelected && isDarkMode && filterModalStyles.darkSelectedOptionPill,
                                            ]}
                                            onPress={() => vm.setSortOption(option.value)}
                                        >
                                            <Text
                                                style={[
                                                    filterModalStyles.optionPillText,
                                                    isDarkMode && filterModalStyles.darkOptionPillText,
                                                    isSelected && filterModalStyles.selectedOptionPillText,
                                                ]}
                                            >
                                                {option.value}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>

                        <View style={filterModalStyles.section}>
                            <Text style={[filterModalStyles.sectionTitle, isDarkMode && filterModalStyles.darkSectionTitle]}>
                                Quick Filters
                            </Text>
                            <View style={[filterModalStyles.toggleRow, isDarkMode && filterModalStyles.darkToggleRow]}>
                                <Text style={[filterModalStyles.toggleLabel, isDarkMode && filterModalStyles.darkToggleLabel]}>
                                    Open Now
                                </Text>
                                <Switch
                                    value={vm.localFilters.openNow}
                                    onValueChange={() => vm.toggleBoolean('openNow')}
                                    trackColor={{ false: '#E0E0E0', true: '#FF8000' }}
                                    thumbColor={vm.localFilters.openNow ? '#FFFFFF' : '#F4F3F4'}
                                />
                            </View>
                            <View style={[filterModalStyles.toggleRow, isDarkMode && filterModalStyles.darkToggleRow]}>
                                <Text style={[filterModalStyles.toggleLabel, isDarkMode && filterModalStyles.darkToggleLabel]}>
                                    Delivery
                                </Text>
                                <Switch
                                    value={vm.localFilters.delivery}
                                    onValueChange={() => vm.toggleBoolean('delivery')}
                                    trackColor={{ false: '#E0E0E0', true: '#FF8000' }}
                                    thumbColor={vm.localFilters.delivery ? '#FFFFFF' : '#F4F3F4'}
                                />
                            </View>
                            <View style={[filterModalStyles.toggleRow, isDarkMode && filterModalStyles.darkToggleRow]}>
                                <Text style={[filterModalStyles.toggleLabel, isDarkMode && filterModalStyles.darkToggleLabel]}>
                                    Collection
                                </Text>
                                <Switch
                                    value={vm.localFilters.collection}
                                    onValueChange={() => vm.toggleBoolean('collection')}
                                    trackColor={{ false: '#E0E0E0', true: '#FF8000' }}
                                    thumbColor={vm.localFilters.collection ? '#FFFFFF' : '#F4F3F4'}
                                />
                            </View>
                            <View style={[filterModalStyles.toggleRow, isDarkMode && filterModalStyles.darkToggleRow]}>
                                <Text style={[filterModalStyles.toggleLabel, isDarkMode && filterModalStyles.darkToggleLabel]}>
                                    Has Deals
                                </Text>
                                <Switch
                                    value={vm.localFilters.hasDeals}
                                    onValueChange={() => vm.toggleBoolean('hasDeals')}
                                    trackColor={{ false: '#E0E0E0', true: '#FF8000' }}
                                    thumbColor={vm.localFilters.hasDeals ? '#FFFFFF' : '#F4F3F4'}
                                />
                            </View>
                        </View>

                        <View style={filterModalStyles.section}>
                            <Text style={[filterModalStyles.sectionTitle, isDarkMode && filterModalStyles.darkSectionTitle]}>
                                Minimum Rating
                            </Text>
                            <View style={filterModalStyles.optionsRow}>
                                {RATING_OPTIONS.map(option => {
                                    const isSelected = vm.localFilters.minRating === option.value;
                                    return (
                                        <Pressable
                                            key={option.label}
                                            style={[
                                                filterModalStyles.optionPill,
                                                isDarkMode && filterModalStyles.darkOptionPill,
                                                isSelected && filterModalStyles.selectedOptionPill,
                                                isSelected && isDarkMode && filterModalStyles.darkSelectedOptionPill,
                                            ]}
                                            onPress={() => vm.setMinRating(option.value)}
                                        >
                                            <Text
                                                style={[
                                                    filterModalStyles.optionPillText,
                                                    isDarkMode && filterModalStyles.darkOptionPillText,
                                                    isSelected && filterModalStyles.selectedOptionPillText,
                                                ]}
                                            >
                                                {option.label === 'Any' ? 'Any' : `⭐ ${option.label}`}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>

                        <View style={filterModalStyles.section}>
                            <Text style={[filterModalStyles.sectionTitle, isDarkMode && filterModalStyles.darkSectionTitle]}>
                                Max Delivery Cost
                            </Text>
                            <View style={filterModalStyles.optionsRow}>
                                {DELIVERY_COST_OPTIONS.map(option => {
                                    const isSelected = vm.localFilters.maxDeliveryCost === option.value;
                                    return (
                                        <Pressable
                                            key={option.label}
                                            style={[
                                                filterModalStyles.optionPill,
                                                isDarkMode && filterModalStyles.darkOptionPill,
                                                isSelected && filterModalStyles.selectedOptionPill,
                                                isSelected && isDarkMode && filterModalStyles.darkSelectedOptionPill,
                                            ]}
                                            onPress={() => vm.setMaxDeliveryCost(option.value)}
                                        >
                                            <Text
                                                style={[
                                                    filterModalStyles.optionPillText,
                                                    isDarkMode && filterModalStyles.darkOptionPillText,
                                                    isSelected && filterModalStyles.selectedOptionPillText,
                                                ]}
                                            >
                                                {option.label}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>

                        <View style={filterModalStyles.section}>
                            <Text style={[filterModalStyles.sectionTitle, isDarkMode && filterModalStyles.darkSectionTitle]}>
                                Cuisines
                            </Text>
                            <View style={filterModalStyles.cuisineGrid}>
                                {TOP_CUISINES.map(cuisine => {
                                    const isSelected = vm.localFilters.selectedCuisines.includes(cuisine.uniqueName);
                                    return (
                                        <Pressable
                                            key={cuisine.uniqueName}
                                            style={[
                                                filterModalStyles.cuisineChip,
                                                isDarkMode && filterModalStyles.darkCuisineChip,
                                                isSelected && filterModalStyles.selectedCuisineChip,
                                                isSelected && isDarkMode && filterModalStyles.darkSelectedCuisineChip,
                                            ]}
                                            onPress={() => vm.toggleCuisine(cuisine.uniqueName)}
                                        >
                                            <Text style={filterModalStyles.cuisineEmoji}>{cuisine.emoji}</Text>
                                            <Text
                                                style={[
                                                    filterModalStyles.cuisineText,
                                                    isDarkMode && filterModalStyles.darkCuisineText,
                                                    isSelected && filterModalStyles.selectedCuisineText,
                                                ]}
                                            >
                                                {cuisine.name}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>
                    </ScrollView>

                    <View style={[filterModalStyles.footer, isDarkMode && filterModalStyles.darkFooter]}>
                        <Pressable style={filterModalStyles.applyButton} onPress={handleApply}>
                            <Text style={filterModalStyles.applyButtonText}>Apply Filters</Text>
                        </Pressable>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};
