import React, { useEffect, useState, useMemo } from 'react';
import { useColorScheme, View, Text, Image, ScrollView, Pressable } from 'react-native';
import { detailPageStyles } from '../stylesheets/pages/restaurantDetailPage';
import type { DetailPageProps } from '../types/navigation';
import type {  DealType, AvailabilitySlotType } from '../types/restaurant';

const formatDate = (dateStr?: string): string => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return d.toLocaleString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const formatEta = (eta?: { rangeLower?: number; rangeUpper?: number; approximate?: number }): string => {
    if (!eta) return 'N/A';
    if (eta.approximate !== undefined) return `~${eta.approximate} min`;
    if (eta.rangeLower !== undefined && eta.rangeUpper !== undefined) {
        return `${eta.rangeLower}-${eta.rangeUpper} min`;
    }
    return 'N/A';
};


const DEALS_INITIAL_LIMIT = 5;

function deduplicateDeals(deals: DealType[]): DealType[] {
    const seen = new Set<string>();
    return deals.filter(deal => {
        if (deal.offerType === 'StampCard' && (!deal.description || deal.description.trim() === '')) {
            return false;
        }
        const key = deal.offerType + '::' + deal.description;
        if (seen.has(key)) { return false; }
        seen.add(key);
        return true;
    });
}

const InfoRow = ({ label, value, isDarkMode }: { label: string; value: string; isDarkMode: boolean }) => (
    <View style={[detailPageStyles.infoRow, isDarkMode && detailPageStyles.darkinfoRow]}>
        <Text style={[detailPageStyles.infoLabel, isDarkMode && detailPageStyles.darkinfoLabel]}>{label}</Text>
        <Text style={[detailPageStyles.infoValue, isDarkMode && detailPageStyles.darkinfoValue]}>{value}</Text>
    </View>
);

const AvailabilitySection = ({ title, data, isDarkMode }: { title: string; data: AvailabilitySlotType; isDarkMode: boolean }) => (
    <View style={[detailPageStyles.availabilityCard, isDarkMode && detailPageStyles.darkavailabilityCard]}>
        <Text style={[detailPageStyles.availabilityTitle, isDarkMode && detailPageStyles.darkavailabilityTitle]}>{title}</Text>
        <View style={detailPageStyles.availabilityRow}>
            <Text style={[detailPageStyles.availabilityLabel, isDarkMode && detailPageStyles.darkavailabilityLabel]}>Open</Text>
            <Text style={[detailPageStyles.availabilityValue, isDarkMode && detailPageStyles.darkavailabilityValue]}>{data.isOpen ? 'Yes' : 'No'}</Text>
        </View>
        <View style={detailPageStyles.availabilityRow}>
            <Text style={[detailPageStyles.availabilityLabel, isDarkMode && detailPageStyles.darkavailabilityLabel]}>Can Pre-Order</Text>
            <Text style={[detailPageStyles.availabilityValue, isDarkMode && detailPageStyles.darkavailabilityValue]}>{data.canPreOrder ? 'Yes' : 'No'}</Text>
        </View>
        <View style={detailPageStyles.availabilityRow}>
            <Text style={[detailPageStyles.availabilityLabel, isDarkMode && detailPageStyles.darkavailabilityLabel]}>Temporarily Offline</Text>
            <Text style={[detailPageStyles.availabilityValue, isDarkMode && detailPageStyles.darkavailabilityValue]}>{data.isTemporarilyOffline ? 'Yes' : 'No'}</Text>
        </View>
        {data.nextAvailability?.from && (
            <View style={detailPageStyles.availabilityRow}>
                <Text style={[detailPageStyles.availabilityLabel, isDarkMode && detailPageStyles.darkavailabilityLabel]}>Next Available</Text>
                <Text style={[detailPageStyles.availabilityValue, isDarkMode && detailPageStyles.darkavailabilityValue]}>{formatDate(data.nextAvailability.from)}</Text>
            </View>
        )}
        <View style={detailPageStyles.availabilityRow}>
            <Text style={[detailPageStyles.availabilityLabel, isDarkMode && detailPageStyles.darkavailabilityLabel]}>ETA</Text>
            <Text style={[detailPageStyles.availabilityValue, isDarkMode && detailPageStyles.darkavailabilityValue]}>{formatEta(data.etaMinutes)}</Text>
        </View>
    </View>
);

const RestaurantDetailPage = ({ navigation, route }: DetailPageProps) => {
    const { restaurant } = route.params;
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const [dealsExpanded, setDealsExpanded] = useState(false);

    const uniqueDeals = useMemo(() => deduplicateDeals(restaurant.deals ?? []), [restaurant.deals]);

    useEffect(() => {
        navigation.setOptions({
            title: restaurant.name,
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: isDarkMode ? '#1A1A18' : '#F8F9FA',
            },
            headerTintColor: '#FF8000',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18,
                color: '#FF8000',
            },
        });
    }, [navigation, restaurant.name, isDarkMode]);

    return (
        <View style={[detailPageStyles.fullview, isDarkMode && detailPageStyles.darkfullview]}>
            <ScrollView
                style={detailPageStyles.scrollView}
                contentContainerStyle={detailPageStyles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={detailPageStyles.headerSection}>
                    <Image source={{ uri: restaurant.logoUrl }} style={detailPageStyles.logo} />
                    <Text style={[detailPageStyles.restaurantName, isDarkMode && detailPageStyles.darkrestaurantName]}>{restaurant.name}</Text>
                    {restaurant.uniqueName && (
                        <Text style={detailPageStyles.uniqueName}>{restaurant.uniqueName}</Text>
                    )}
                    <View style={detailPageStyles.badgesRow}>
                        {restaurant.isNew && (
                            <View style={[detailPageStyles.badge, detailPageStyles.blueBadge]}>
                                <Text style={detailPageStyles.badgeText}>NEW</Text>
                            </View>
                        )}
                        {restaurant.isPremier && (
                            <View style={[detailPageStyles.badge, detailPageStyles.purpleBadge]}>
                                <Text style={detailPageStyles.badgeText}>PREMIER</Text>
                            </View>
                        )}
                        {restaurant.isTemporarilyOffline && (
                            <View style={[detailPageStyles.badge, detailPageStyles.redBadge]}>
                                <Text style={detailPageStyles.badgeText}>OFFLINE</Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={[detailPageStyles.section, isDarkMode && detailPageStyles.darksection]}>
                    <Text style={[detailPageStyles.sectionTitle, isDarkMode && detailPageStyles.darksectionTitle]}>Rating</Text>
                    <View style={detailPageStyles.ratingContainer}>
                        <Image source={require('../images/Just-Eat-Star.png')} style={detailPageStyles.starImage} />
                        <Text style={detailPageStyles.ratingValue}>{restaurant.rating.starRating}</Text>
                        <Text style={[detailPageStyles.ratingCount, isDarkMode && detailPageStyles.darkratingCount]}>({restaurant.rating.count} reviews)</Text>
                    </View>
                </View>

                <View style={[detailPageStyles.section, isDarkMode && detailPageStyles.darksection]}>
                    <Text style={[detailPageStyles.sectionTitle, isDarkMode && detailPageStyles.darksectionTitle]}>Cuisines</Text>
                    <View style={detailPageStyles.cuisinesWrap}>
                        {restaurant.cuisines.map((c, i) => (
                            <View key={i} style={[detailPageStyles.cuisineChip, isDarkMode && detailPageStyles.darkcuisineChip]}>
                                <Text style={detailPageStyles.cuisineChipText}>{c.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={[detailPageStyles.section, isDarkMode && detailPageStyles.darksection]}>
                    <Text style={[detailPageStyles.sectionTitle, isDarkMode && detailPageStyles.darksectionTitle]}>Address</Text>
                    <Text style={[detailPageStyles.locationText, isDarkMode && detailPageStyles.darklocationText]}>{restaurant.address.firstLine}</Text>
                    <Text style={[detailPageStyles.locationText, isDarkMode && detailPageStyles.darklocationText]}>{restaurant.address.city}</Text>
                    <Text style={[detailPageStyles.locationText, isDarkMode && detailPageStyles.darklocationText]}>{restaurant.address.postalCode}</Text>
                    {restaurant.address.location?.coordinates && (
                        <Text style={[detailPageStyles.locationText, isDarkMode && detailPageStyles.darklocationText, { marginTop: 6 }]}>
                            Coordinates: {restaurant.address.location.coordinates[1].toFixed(6)}, {restaurant.address.location.coordinates[0].toFixed(6)}
                        </Text>
                    )}
                </View>

                <View style={[detailPageStyles.section, isDarkMode && detailPageStyles.darksection]}>
                    <Text style={[detailPageStyles.sectionTitle, isDarkMode && detailPageStyles.darksectionTitle]}>Delivery & Collection</Text>
                    <InfoRow label="Delivery" value={restaurant.isDelivery ? 'Available' : 'Unavailable'} isDarkMode={isDarkMode} />
                    <InfoRow label="Collection" value={restaurant.isCollection ? 'Available' : 'Unavailable'} isDarkMode={isDarkMode} />
                    <InfoRow label="Open for Delivery" value={restaurant.isOpenNowForDelivery ? 'Yes' : 'No'} isDarkMode={isDarkMode} />
                    <InfoRow label="Open for Collection" value={restaurant.isOpenNowForCollection ? 'Yes' : 'No'} isDarkMode={isDarkMode} />
                    <InfoRow label="Open for Preorder" value={restaurant.isOpenNowForPreorder ? 'Yes' : 'No'} isDarkMode={isDarkMode} />
                    {restaurant.deliveryCost !== undefined && (
                        <InfoRow label="Delivery Cost" value={`£${restaurant.deliveryCost.toFixed(2)}`} isDarkMode={isDarkMode} />
                    )}
                    {restaurant.minimumDeliveryValue !== undefined && (
                        <InfoRow label="Min Delivery Value" value={restaurant.minimumDeliveryValue === 0 ? 'None' : `£${restaurant.minimumDeliveryValue.toFixed(2)}`} isDarkMode={isDarkMode} />
                    )}
                    <InfoRow label="Delivery ETA" value={formatEta(restaurant.deliveryEtaMinutes)} isDarkMode={isDarkMode} />
                    {restaurant.driveDistanceMeters !== undefined && (
                        <InfoRow label="Distance" value={`${(restaurant.driveDistanceMeters / 1000).toFixed(1)} km`} isDarkMode={isDarkMode} />
                    )}
                </View>

                <View style={[detailPageStyles.section, isDarkMode && detailPageStyles.darksection]}>
                    <Text style={[detailPageStyles.sectionTitle, isDarkMode && detailPageStyles.darksectionTitle]}>Availability</Text>
                    {restaurant.availability?.delivery && (
                        <AvailabilitySection title="Delivery" data={restaurant.availability.delivery} isDarkMode={isDarkMode} />
                    )}
                    {restaurant.availability?.collection && (
                        <AvailabilitySection title="Collection" data={restaurant.availability.collection} isDarkMode={isDarkMode} />
                    )}
                    {!restaurant.availability?.delivery && !restaurant.availability?.collection && (
                        <Text style={[detailPageStyles.locationText, isDarkMode && detailPageStyles.darklocationText]}>No availability data</Text>
                    )}
                </View>

                <View style={[detailPageStyles.section, isDarkMode && detailPageStyles.darksection]}>
                    <Text style={[detailPageStyles.sectionTitle, isDarkMode && detailPageStyles.darksectionTitle]}>Opening Times</Text>
                    <InfoRow label="Opens At" value={formatDate(restaurant.openingTimeLocal)} isDarkMode={isDarkMode} />
                    <InfoRow label="Delivery Opens" value={formatDate(restaurant.deliveryOpeningTimeLocal)} isDarkMode={isDarkMode} />
                </View>

                {uniqueDeals.length > 0 && (
                    <View style={[detailPageStyles.section, isDarkMode && detailPageStyles.darksection]}>
                        <Text style={[detailPageStyles.sectionTitle, isDarkMode && detailPageStyles.darksectionTitle]}>Deals ({uniqueDeals.length})</Text>
                        {(dealsExpanded ? uniqueDeals : uniqueDeals.slice(0, DEALS_INITIAL_LIMIT)).map((deal: DealType, i: number) => (
                            <View key={i} style={[detailPageStyles.dealCard, isDarkMode && detailPageStyles.darkdealCard]}>
                                <Text style={[detailPageStyles.dealDescription, isDarkMode && detailPageStyles.darkdealDescription]}>{deal.description}</Text>
                                <Text style={detailPageStyles.dealType}>{deal.offerType}</Text>
                            </View>
                        ))}
                        {uniqueDeals.length > DEALS_INITIAL_LIMIT && (
                            <Pressable
                                onPress={() => setDealsExpanded(prev => !prev)}
                                style={[detailPageStyles.showMoreButton, isDarkMode && detailPageStyles.darkshowMoreButton]}
                            >
                                <Text style={detailPageStyles.showMoreText}>
                                    {dealsExpanded ? 'Show less' : `Show ${uniqueDeals.length - DEALS_INITIAL_LIMIT} more deals`}
                                </Text>
                            </Pressable>
                        )}
                    </View>
                )}

                {restaurant.tags && restaurant.tags.length > 0 && (
                    <View style={[detailPageStyles.section, isDarkMode && detailPageStyles.darksection]}>
                        <Text style={[detailPageStyles.sectionTitle, isDarkMode && detailPageStyles.darksectionTitle]}>Tags</Text>
                        <View style={detailPageStyles.tagsWrap}>
                            {restaurant.tags.map((tag: string, i: number) => (
                                <View key={i} style={[detailPageStyles.tagChip, isDarkMode && detailPageStyles.darktagChip]}>
                                    <Text style={[detailPageStyles.tagText, isDarkMode && detailPageStyles.darktagText]}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                <View style={[detailPageStyles.section, isDarkMode && detailPageStyles.darksection]}>
                    <Text style={[detailPageStyles.sectionTitle, isDarkMode && detailPageStyles.darksectionTitle]}>Flags & Metadata</Text>
                    <InfoRow label="ID" value={String(restaurant.id)} isDarkMode={isDarkMode} />
                    {restaurant.defaultDisplayRank !== undefined && (
                        <InfoRow label="Display Rank" value={String(restaurant.defaultDisplayRank)} isDarkMode={isDarkMode} />
                    )}
                    <InfoRow label="Premier" value={restaurant.isPremier ? 'Yes' : 'No'} isDarkMode={isDarkMode} />
                    <InfoRow label="Temporary Boost" value={restaurant.isTemporaryBoost ? 'Yes' : 'No'} isDarkMode={isDarkMode} />
                    <InfoRow label="Test Restaurant" value={restaurant.isTestRestaurant ? 'Yes' : 'No'} isDarkMode={isDarkMode} />
                    <InfoRow label="Temporarily Offline" value={restaurant.isTemporarilyOffline ? 'Yes' : 'No'} isDarkMode={isDarkMode} />
                </View>
            </ScrollView>
        </View>
    );
};

export default RestaurantDetailPage;
