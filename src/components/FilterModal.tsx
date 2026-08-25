import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Modal, View, Text, Pressable, ScrollView, Switch, Animated, PanResponder, Dimensions, StyleSheet, AccessibilityInfo } from 'react-native';
import { filterModalStyles } from '../stylesheets/props/filterModal';
import { RATING_OPTIONS, DELIVERY_COST_OPTIONS, TOP_CUISINES } from '../configs/filterDefaults';
import { SORT_OPTIONS } from '../configs/sortingOptions';
import { useFilterModalViewModel } from '../viewmodels/useFilterModalViewModel';
import type { FilterState } from '../types/filterOptions';
import type { PieTokens } from '../configs/pieTokens';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DISMISS_THRESHOLD = SCREEN_HEIGHT * 0.2;

type FilterModalProps = {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: FilterState, sortOption: string) => void;
    currentFilters: FilterState;
    currentSortOption: string;
    theme: PieTokens;
};

export const FilterModal = ({ visible, onClose, onApply, currentFilters, currentSortOption, theme }: FilterModalProps) => {
    const vm = useFilterModalViewModel({ visible, currentFilters, currentSortOption, onApply, onClose });
    const [modalMounted, setModalMounted] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const isClosingRef = useRef(false);
    const styles = filterModalStyles(theme);

    useEffect(() => {
        AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
        const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
        return () => subscription.remove();
    }, []);

    const animateIn = useCallback(() => {
        translateY.setValue(SCREEN_HEIGHT);
        setModalMounted(true);
        if (reduceMotion) {
            translateY.setValue(0);
            return;
        }
        Animated.timing(translateY, {
            toValue: 0,
            duration: theme.motion.timing300,
            useNativeDriver: true,
        }).start();
    }, [translateY, reduceMotion, theme.motion]);

    const animateOut = useCallback((callback?: () => void) => {
        isClosingRef.current = true;
        if (reduceMotion) {
            setModalMounted(false);
            isClosingRef.current = false;
            callback?.();
            return;
        }
        Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: theme.motion.timing250,
            useNativeDriver: true,
        }).start(() => {
            setModalMounted(false);
            isClosingRef.current = false;
            callback?.();
        });
    }, [translateY, reduceMotion, theme.motion]);

    useEffect(() => {
        if (visible && !isClosingRef.current) {
            animateIn();
        }
    }, [visible, animateIn]);

    const handleClose = useCallback(() => {
        if (isClosingRef.current) return;
        animateOut(onClose);
    }, [animateOut, onClose]);

    // The pan responder below is created once, so it reads the newest values
    // through this ref instead of closing over a stale render.
    const latest = useRef({ reduceMotion, dismissDuration: theme.motion.timing250, onClose });
    latest.current = { reduceMotion, dismissDuration: theme.motion.timing250, onClose };

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
                    if (latest.current.reduceMotion) {
                        setModalMounted(false);
                        isClosingRef.current = false;
                        latest.current.onClose();
                        return;
                    }
                    Animated.timing(translateY, {
                        toValue: SCREEN_HEIGHT,
                        duration: latest.current.dismissDuration,
                        useNativeDriver: true,
                    }).start(() => {
                        setModalMounted(false);
                        isClosingRef.current = false;
                        latest.current.onClose();
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

    const switchColors = {
        false: theme.color.borderStrong,
        true: theme.color.interactiveBrand,
    };

    return (
        <Modal visible animationType="none" transparent onRequestClose={handleClose}>
            <View style={styles.overlay}>
                <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} accessibilityLabel="Dismiss filters" accessibilityRole="button" />
                <Animated.View
                    style={[
                        styles.modalContainer,
                        { transform: [{ translateY }] },
                    ]}
                >
                    <View {...panResponder.panHandlers}>
                        <View style={styles.handle} />

                        <View style={styles.header}>
                            <Pressable onPress={vm.reset} accessibilityRole="button" accessibilityLabel="Reset filters" accessibilityState={{ disabled: !vm.hasActiveFilters }}>
                                <Text style={[styles.headerButton, !vm.hasActiveFilters && styles.disabledButton]}>
                                    Reset
                                </Text>
                            </Pressable>
                            <Text style={styles.headerTitle}>
                                Filters
                            </Text>
                            <Pressable onPress={handleApply} accessibilityRole="button" accessibilityLabel="Apply filters">
                                <Text style={styles.headerButton}>Apply</Text>
                            </Pressable>
                        </View>
                    </View>

                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                Sort By
                            </Text>
                            <View style={styles.optionsRow}>
                                {SORT_OPTIONS.map(option => {
                                    const isSelected = vm.localSortOption === option.value;
                                    return (
                                        <Pressable
                                            key={option.key}
                                            style={[
                                                styles.optionPill,
                                                isSelected && styles.selectedOptionPill,
                                            ]}
                                            onPress={() => vm.setSortOption(option.value)}
                                            accessibilityRole="button"
                                            accessibilityState={{ selected: isSelected }}
                                            accessibilityLabel={`Sort by ${option.value}`}
                                        >
                                            <Text
                                                style={[
                                                    styles.optionPillText,
                                                    isSelected && styles.selectedOptionPillText,
                                                ]}
                                            >
                                                {option.value}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                Quick Filters
                            </Text>
                            <View style={styles.toggleRow}>
                                <Text style={styles.toggleLabel}>
                                    Open Now
                                </Text>
                                <Switch
                                    value={vm.localFilters.openNow}
                                    onValueChange={() => vm.toggleBoolean('openNow')}
                                    trackColor={switchColors}
                                    thumbColor={vm.localFilters.openNow ? theme.color.contentInverseSolid : theme.color.containerStrong}
                                    accessibilityLabel="Open now filter"
                                />
                            </View>
                            <View style={styles.toggleRow}>
                                <Text style={styles.toggleLabel}>
                                    Delivery
                                </Text>
                                <Switch
                                    value={vm.localFilters.delivery}
                                    onValueChange={() => vm.toggleBoolean('delivery')}
                                    trackColor={switchColors}
                                    thumbColor={vm.localFilters.delivery ? theme.color.contentInverseSolid : theme.color.containerStrong}
                                    accessibilityLabel="Delivery filter"
                                />
                            </View>
                            <View style={styles.toggleRow}>
                                <Text style={styles.toggleLabel}>
                                    Collection
                                </Text>
                                <Switch
                                    value={vm.localFilters.collection}
                                    onValueChange={() => vm.toggleBoolean('collection')}
                                    trackColor={switchColors}
                                    thumbColor={vm.localFilters.collection ? theme.color.contentInverseSolid : theme.color.containerStrong}
                                    accessibilityLabel="Collection filter"
                                />
                            </View>
                            <View style={styles.toggleRow}>
                                <Text style={styles.toggleLabel}>
                                    Has Deals
                                </Text>
                                <Switch
                                    value={vm.localFilters.hasDeals}
                                    onValueChange={() => vm.toggleBoolean('hasDeals')}
                                    trackColor={switchColors}
                                    thumbColor={vm.localFilters.hasDeals ? theme.color.contentInverseSolid : theme.color.containerStrong}
                                    accessibilityLabel="Has deals filter"
                                />
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                Minimum Rating
                            </Text>
                            <View style={styles.optionsRow}>
                                {RATING_OPTIONS.map(option => {
                                    const isSelected = vm.localFilters.minRating === option.value;
                                    return (
                                        <Pressable
                                            key={option.label}
                                            style={[
                                                styles.optionPill,
                                                isSelected && styles.selectedOptionPill,
                                            ]}
                                            onPress={() => vm.setMinRating(option.value)}
                                            accessibilityRole="button"
                                            accessibilityState={{ selected: isSelected }}
                                            accessibilityLabel={`Minimum rating ${option.label}`}
                                        >
                                            <Text
                                                style={[
                                                    styles.optionPillText,
                                                    isSelected && styles.selectedOptionPillText,
                                                ]}
                                            >
                                                {option.label === 'Any' ? 'Any' : `⭐ ${option.label}`}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                Max Delivery Cost
                            </Text>
                            <View style={styles.optionsRow}>
                                {DELIVERY_COST_OPTIONS.map(option => {
                                    const isSelected = vm.localFilters.maxDeliveryCost === option.value;
                                    return (
                                        <Pressable
                                            key={option.label}
                                            style={[
                                                styles.optionPill,
                                                isSelected && styles.selectedOptionPill,
                                            ]}
                                            onPress={() => vm.setMaxDeliveryCost(option.value)}
                                            accessibilityRole="button"
                                            accessibilityState={{ selected: isSelected }}
                                            accessibilityLabel={`Max delivery cost ${option.label}`}
                                        >
                                            <Text
                                                style={[
                                                    styles.optionPillText,
                                                    isSelected && styles.selectedOptionPillText,
                                                ]}
                                            >
                                                {option.label}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                Cuisines
                            </Text>
                            <View style={styles.cuisineGrid}>
                                {TOP_CUISINES.map(cuisine => {
                                    const isSelected = vm.localFilters.selectedCuisines.includes(cuisine.uniqueName);
                                    return (
                                        <Pressable
                                            key={cuisine.uniqueName}
                                            style={[
                                                styles.cuisineChip,
                                                isSelected && styles.selectedCuisineChip,
                                            ]}
                                            onPress={() => vm.toggleCuisine(cuisine.uniqueName)}
                                            accessibilityRole="button"
                                            accessibilityState={{ selected: isSelected }}
                                            accessibilityLabel={`Cuisine ${cuisine.name}`}
                                        >
                                            <Text style={styles.cuisineEmoji}>{cuisine.emoji}</Text>
                                            <Text
                                                style={[
                                                    styles.cuisineText,
                                                    isSelected && styles.selectedCuisineText,
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

                    <View style={styles.footer}>
                        <Pressable style={styles.applyButton} onPress={handleApply} accessibilityRole="button" accessibilityLabel="Apply filters to restaurant list">
                            <Text style={styles.applyButtonText}>Apply Filters</Text>
                        </Pressable>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};
