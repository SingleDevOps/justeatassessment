import { View, Text, Image, TouchableHighlight } from 'react-native';
import { restaurantCardStyles } from '../stylesheets/props/restaurantCard';
import { RestaurantCardPropType } from '../types/restaurantCard';
import { formatDistance } from '../functions/map/distance';
import { StarIcon } from './icons/StarIcon';
import { LocationPinIcon } from './icons/LocationPinIcon';

export const RestaurantCard = ({ item, theme, cuisines, navigation, distanceMeters, distanceIsFromUser, isPromoted, isBoosted, freeDeliveryLabel }: RestaurantCardPropType) => {
    const isOffline = item.isTemporarilyOffline === true;
    const isOpenNow = item.isOpenNowForDelivery || item.isOpenNowForCollection;
    const showNewBadge = item.isNew === true;
    const styles = restaurantCardStyles(theme);

    return (
        <TouchableHighlight
            testID={`restaurant-card-${item.id}`}
            underlayColor={theme.color.backgroundSubtle}
            onPress={() => navigation.navigate('RestaurantDetailPage', { restaurant: item })}
            style={styles.touchableHighlight}
            accessibilityRole="button"
            accessibilityLabel={`${item.name}, rating ${item.rating.starRating} out of 5`}
        >
            {/********************* The card has two parts: upperPart & lowerPart ********************/}
            <View style={styles.card}>
                <View style={styles.upperPart}>
                    <Image //******************    The Restaurant Logo   **********************/
                        source={{ uri: item.logoUrl }}
                        style={[styles.image, isOffline && styles.offlineImage]}
                    />
                    <View style={styles.textContainer}>
                        <View style={styles.nameRow}>
                            <Text testID="restaurant-name" style={styles.name}>{item.name}</Text>
                            <View style={styles.badgeRow}>
                                {showNewBadge && (
                                    <View style={[styles.badge, styles.newBadge]}>
                                        <Text style={styles.newBadgeText}>NEW</Text>
                                    </View>
                                )}
                                {isPromoted && (
                                    <View style={[styles.badge, styles.promotedBadge]}>
                                        <Text style={styles.promotedBadgeText}>Promoted</Text>
                                    </View>
                                )}
                                {isBoosted && (
                                    <View style={[styles.badge, styles.boostedBadge]}>
                                        <Text style={styles.boostedBadgeText}>Boosted</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                        <View style={styles.ratingContainer}>
                            <StarIcon color={theme.color.contentBrand} size={theme.spacing.b} style={styles.starIcon} />
                            <Text testID="restaurant-rating" style={styles.rating}>{item.rating.starRating}</Text>
                            <Text style={styles.ratingNumbers}> ({item.rating.count})</Text>
                            {!isOffline && isOpenNow && (
                                <View style={styles.openDot} testID="open-now-dot">
                                    <Text style={styles.openDotText}>Open now</Text>
                                </View>
                            )}
                            {isOffline && (
                                <View style={[styles.openDot, styles.offlineDot]}>
                                    <Text style={styles.offlineDotText}>Offline</Text>
                                </View>
                            )}
                        </View>
                        {freeDeliveryLabel && (
                            <Text style={styles.freeDeliveryText}>
                                {freeDeliveryLabel}
                            </Text>
                        )}
                    </View>
                </View>
                {/*********** upperPart Ends ***********/}

                <View style={styles.separator} />

                {/*********** lowerPart Starts *********/}
                <View style={styles.lowerPart}>
                    <Text testID="restaurant-cuisine" style={styles.cuisine}>{cuisines}</Text>
                    {/* The address container, with pin icon and address text */}
                    <View style={styles.addressContainer}>
                        <LocationPinIcon color={theme.color.contentSubdued} size={14} style={styles.pinIcon} />
                        <View style={styles.addressTextContainer}>
                            <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={styles.address}>{item.address.firstLine}, {item.address.city}</Text>
                        </View>
                    </View>
                    {distanceMeters !== undefined && distanceMeters !== null && (
                        <Text testID="restaurant-distance" style={styles.distanceText}>
                            {formatDistance(distanceMeters)}{distanceIsFromUser ? ' from you' : ' away'}
                        </Text>
                    )}
                </View>
            </View>
        </TouchableHighlight>
    );
};
