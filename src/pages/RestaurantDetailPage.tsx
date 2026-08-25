import React, { useEffect, useMemo } from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { detailPageStyles } from '../stylesheets/pages/restaurantDetailPage';
import { useRestaurantDetailViewModel, formatDate, formatEta, getDealOfferTypeLabel, DEALS_INITIAL_LIMIT } from '../viewmodels/useRestaurantDetailViewModel';
import { RestaurantMap, getRestaurantLatLng } from '../components/RestaurantMap';
import { useUserLocation } from '../hooks/useUserLocation';
import { usePieTheme } from '../hooks/usePieTheme';
import { haversineDistanceMeters, formatDistance } from '../functions/map/distance';
import { formatPounds } from '../functions/filtering/deliveryFees';
import { ErrorStateView } from '../components/icons/ErrorStateView';
import { StarIcon } from '../components/icons/StarIcon';
import type { DetailPageProps } from '../types/navigation';
import type { DealType, AvailabilitySlotType } from '../types/restaurant';
import type { PieTokens } from '../configs/pieTokens';

const InfoRow = ({ label, value, theme }: { label: string; value: string; theme: PieTokens }) => {
    const styles = detailPageStyles(theme);
    return (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
};

const AvailabilitySection = ({ title, data, theme }: { title: string; data: AvailabilitySlotType; theme: PieTokens }) => {
    const styles = detailPageStyles(theme);
    return (
        <View style={styles.availabilityCard}>
            <Text style={styles.availabilityTitle}>{title}</Text>
            <View style={styles.availabilityRow}>
                <Text style={styles.availabilityLabel}>Open</Text>
                <Text style={styles.availabilityValue}>{data.isOpen ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.availabilityRow}>
                <Text style={styles.availabilityLabel}>Can Pre-Order</Text>
                <Text style={styles.availabilityValue}>{data.canPreOrder ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.availabilityRow}>
                <Text style={styles.availabilityLabel}>Temporarily Offline</Text>
                <Text style={styles.availabilityValue}>{data.isTemporarilyOffline ? 'Yes' : 'No'}</Text>
            </View>
            {data.nextAvailability?.from && (
                <View style={styles.availabilityRow}>
                    <Text style={styles.availabilityLabel}>Next Available</Text>
                    <Text style={styles.availabilityValue}>{formatDate(data.nextAvailability.from)}</Text>
                </View>
            )}
            <View style={styles.availabilityRow}>
                <Text style={styles.availabilityLabel}>ETA</Text>
                <Text style={styles.availabilityValue}>{formatEta(data.etaMinutes)}</Text>
            </View>
        </View>
    );
};

const RestaurantDetailPage = ({ navigation, route }: DetailPageProps) => {
    const { restaurant, deliveryFees } = route.params ?? {};
    const { theme, isDarkMode } = usePieTheme();
    const { uniqueDeals, dealsExpanded, toggleDealsExpanded, userRating, feeBands, freeDeliveryLabel, minimumOrderValue } =
        useRestaurantDetailViewModel(restaurant, deliveryFees);
    const { userLocation } = useUserLocation();
    const styles = detailPageStyles(theme);

    const distanceFromUser = useMemo(() => {
        const coordinate = getRestaurantLatLng(restaurant);
        if (!userLocation || !coordinate) {
            return null;
        }
        return haversineDistanceMeters(userLocation, coordinate);
    }, [userLocation, restaurant]);

    useEffect(() => {
        navigation.setOptions({
            title: restaurant?.name ?? 'Restaurant',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: theme.color.backgroundDefault,
            },
            headerTintColor: theme.color.interactiveBrand,
            headerBackButtonDisplayMode: 'minimal',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: theme.fontSize.size16,
                color: theme.color.interactiveBrand,
            },
        });
    }, [navigation, restaurant?.name, isDarkMode, theme]);

    if (!restaurant) {
        return (
            <View style={[styles.fullview, styles.missingState]}>
                <ErrorStateView
                    illustration="apiError"
                    title="Restaurant unavailable"
                    message="We couldn't load this restaurant. Go back and try again."
                    theme={theme}
                />
            </View>
        );
    }

    return (
        <View style={styles.fullview}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerSection}>
                    <Image source={{ uri: restaurant.logoUrl }} style={styles.logo} />
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <View style={styles.badgesRow}>
                        {restaurant.isNew && (
                            <View style={[styles.badge, styles.blueBadge]}>
                                <Text style={styles.badgeText}>NEW</Text>
                            </View>
                        )}
                        {restaurant.isPremier && (
                            <View style={[styles.badge, styles.purpleBadge]}>
                                <Text style={styles.badgeText}>PREMIER</Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Rating</Text>
                    <View style={styles.ratingContainer}>
                        <StarIcon color={theme.color.contentBrand} size={theme.spacing.d} style={styles.starImage} />
                        <Text style={styles.ratingValue}>{restaurant.rating.starRating}</Text>
                        <Text style={styles.ratingCount}>({restaurant.rating.count} reviews)</Text>
                    </View>
                    {userRating !== null && userRating !== undefined && (
                        <InfoRow label="Your Rating" value={`⭐ ${userRating}`} theme={theme} />
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cuisines</Text>
                    <View style={styles.cuisinesWrap}>
                        {restaurant.cuisines.map((c, i) => (
                            <View key={i} style={styles.cuisineChip}>
                                <Text style={styles.cuisineChipText}>{c.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Address</Text>
                    <Text style={styles.locationText}>{restaurant.address.firstLine}</Text>
                    <Text style={styles.locationText}>{restaurant.address.city}</Text>
                    <Text style={styles.locationText}>{restaurant.address.postalCode}</Text>
                    {distanceFromUser !== null && (
                        <View style={styles.mapDistanceRow}>
                            <Text style={styles.mapDistanceText}>
                                📍 {formatDistance(distanceFromUser)} from your location
                            </Text>
                        </View>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Map</Text>
                    <RestaurantMap restaurant={restaurant} theme={theme} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Delivery & Collection</Text>
                    <InfoRow label="Delivery" value={restaurant.isDelivery ? 'Available' : 'Unavailable'} theme={theme} />
                    <InfoRow label="Collection" value={restaurant.isCollection ? 'Available' : 'Unavailable'} theme={theme} />
                    <InfoRow label="Open for Delivery" value={restaurant.isOpenNowForDelivery ? 'Yes' : 'No'} theme={theme} />
                    <InfoRow label="Open for Collection" value={restaurant.isOpenNowForCollection ? 'Yes' : 'No'} theme={theme} />
                    <InfoRow label="Open for Preorder" value={restaurant.isOpenNowForPreorder ? 'Yes' : 'No'} theme={theme} />
                    {restaurant.deliveryCost !== undefined && (
                        <InfoRow label="Delivery Cost" value={formatPounds(restaurant.deliveryCost)} theme={theme} />
                    )}
                    {minimumOrderValue !== null && minimumOrderValue > 0 && (
                        <InfoRow label="Minimum Order" value={`£${(minimumOrderValue / 100).toFixed(2)}`} theme={theme} />
                    )}
                    {freeDeliveryLabel && (
                        <InfoRow label="Free Delivery" value={freeDeliveryLabel} theme={theme} />
                    )}
                    {feeBands.length > 0 && feeBands.map((band, i) => (
                        <InfoRow key={i} label={band.label} value={band.fee} theme={theme} />
                    ))}
                    {restaurant.minimumDeliveryValue !== undefined && (
                        <InfoRow label="Min Delivery Value" value={restaurant.minimumDeliveryValue === 0 ? 'None' : formatPounds(restaurant.minimumDeliveryValue)} theme={theme} />
                    )}
                    <InfoRow label="Delivery ETA" value={formatEta(restaurant.deliveryEtaMinutes)} theme={theme} />
                    {restaurant.driveDistanceMeters !== undefined && (
                        <InfoRow label="Distance" value={`${(restaurant.driveDistanceMeters / 1000).toFixed(1)} km`} theme={theme} />
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Availability</Text>
                    {restaurant.availability?.delivery && (
                        <AvailabilitySection title="Delivery" data={restaurant.availability.delivery} theme={theme} />
                    )}
                    {restaurant.availability?.collection && (
                        <AvailabilitySection title="Collection" data={restaurant.availability.collection} theme={theme} />
                    )}
                    {!restaurant.availability?.delivery && !restaurant.availability?.collection && (
                        <Text style={styles.locationText}>No availability data</Text>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Opening Times</Text>
                    <InfoRow label="Opens At" value={formatDate(restaurant.openingTimeLocal)} theme={theme} />
                    <InfoRow label="Delivery Opens" value={formatDate(restaurant.deliveryOpeningTimeLocal)} theme={theme} />
                </View>

                {uniqueDeals.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Deals ({uniqueDeals.length})</Text>
                        {(dealsExpanded ? uniqueDeals : uniqueDeals.slice(0, DEALS_INITIAL_LIMIT)).map((deal: DealType, i: number) => (
                            <View key={i} style={styles.dealCard}>
                                <Text style={styles.dealDescription}>{deal.description}</Text>
                                <View style={styles.dealTypeBadge}>
                                    <Text style={styles.dealTypeBadgeText}>{getDealOfferTypeLabel(deal.offerType)}</Text>
                                </View>
                            </View>
                        ))}
                        {uniqueDeals.length > DEALS_INITIAL_LIMIT && (
                            <Pressable
                                onPress={toggleDealsExpanded}
                                style={styles.showMoreButton}
                                accessibilityRole="button"
                                accessibilityState={{ expanded: dealsExpanded }}
                                accessibilityLabel={dealsExpanded ? 'Show fewer deals' : `Show ${uniqueDeals.length - DEALS_INITIAL_LIMIT} more deals`}
                            >
                                <Text style={styles.showMoreText}>
                                    {dealsExpanded ? 'Show less' : `Show ${uniqueDeals.length - DEALS_INITIAL_LIMIT} more deals`}
                                </Text>
                            </Pressable>
                        )}
                    </View>
                )}

            </ScrollView>
        </View>
    );
};

export default RestaurantDetailPage;
