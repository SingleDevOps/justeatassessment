import { View, Text, Image, TouchableHighlight } from 'react-native';
import { restaurantCardStyles } from '../stylesheets/props/restaurantCard';
import { RestaurantCardPropType } from '../types/restaurantCard';
import { formatDistance } from '../functions/map/distance';

export const RestaurantCard = ({ item, isDarkMode, cuisines, navigation, distanceMeters, distanceIsFromUser, isPromoted, isBoosted, freeDeliveryLabel }: RestaurantCardPropType) => {
    const isOffline = item.isTemporarilyOffline === true;
    const isOpenNow = item.isOpenNowForDelivery || item.isOpenNowForCollection;
    const showNewBadge = item.isNew === true;

    return (
        <TouchableHighlight
            testID={`restaurant-card-${item.id}`}
            underlayColor={isDarkMode ? '#1A1A18' : '#F8F9FA'}
            onPress={() => navigation.navigate('RestaurantDetailPage', { restaurant: item })}
            style={restaurantCardStyles.touchableHighlight}
        >
            {/********************* The card has two parts: upperPart & lowerPart ********************/}
            <View style={[restaurantCardStyles.card, isDarkMode && restaurantCardStyles.darkcard]}>
                <View style={restaurantCardStyles.upperPart}>
                    <Image //******************    The Restaurant Logo   **********************/
                        source={{ uri: item.logoUrl }}
                        style={[restaurantCardStyles.image, isOffline && restaurantCardStyles.offlineImage]}
                    />
                    <View style={restaurantCardStyles.textContainer}>
                        <View style={restaurantCardStyles.nameRow}>
                            <Text testID="restaurant-name" style={[restaurantCardStyles.name, isDarkMode && restaurantCardStyles.darkname]}>{item.name}</Text>
                            <View style={restaurantCardStyles.badgeRow}>
                                {showNewBadge && (
                                    <View style={[restaurantCardStyles.badge, restaurantCardStyles.newBadge]}>
                                        <Text style={restaurantCardStyles.newBadgeText}>NEW</Text>
                                    </View>
                                )}
                                {isPromoted && (
                                    <View style={[restaurantCardStyles.badge, restaurantCardStyles.promotedBadge]}>
                                        <Text style={restaurantCardStyles.promotedBadgeText}>Promoted</Text>
                                    </View>
                                )}
                                {isBoosted && (
                                    <View style={[restaurantCardStyles.badge, restaurantCardStyles.boostedBadge]}>
                                        <Text style={restaurantCardStyles.boostedBadgeText}>Boosted</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                        <View style={restaurantCardStyles.ratingContainer}>
                            <Image style={restaurantCardStyles.ratingImage} source={require('../images/Just-Eat-Star.png')} />
                            <Text testID="restaurant-rating" style={restaurantCardStyles.rating}>{item.rating.starRating}</Text>
                            <Text style={[restaurantCardStyles.ratingNumbers, isDarkMode && restaurantCardStyles.darkratingNumbers]}> ({item.rating.count})</Text>
                            {!isOffline && isOpenNow && (
                                <View style={restaurantCardStyles.openDot} testID="open-now-dot">
                                    <Text style={restaurantCardStyles.openDotText}>Open now</Text>
                                </View>
                            )}
                            {isOffline && (
                                <View style={[restaurantCardStyles.openDot, restaurantCardStyles.offlineDot]}>
                                    <Text style={restaurantCardStyles.offlineDotText}>Offline</Text>
                                </View>
                            )}
                        </View>
                        {freeDeliveryLabel && (
                            <Text style={[restaurantCardStyles.freeDeliveryText, isDarkMode && restaurantCardStyles.darkFreeDeliveryText]}>
                                {freeDeliveryLabel}
                            </Text>
                        )}
                    </View>
                </View>
                {/*********** upperPart Ends ***********/}

                <View style={restaurantCardStyles.separator} />

                {/*********** lowerPart Starts *********/}
                <View style={restaurantCardStyles.lowerPart}>
                    <Text testID="restaurant-cuisine" style={[restaurantCardStyles.cuisine, isDarkMode && restaurantCardStyles.darkcuisine]}>{cuisines}</Text>
                    {/* The address container, with pin icon and address text */}
                    <View style={restaurantCardStyles.addressContainer}>
                        <Text style={restaurantCardStyles.pinIcon}>📍</Text>
                        <View style={restaurantCardStyles.addressTextContainer}>
                            <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={[restaurantCardStyles.address, isDarkMode && restaurantCardStyles.darkaddress]}>{item.address.firstLine}, {item.address.city}</Text>
                        </View>
                    </View>
                    {distanceMeters !== undefined && distanceMeters !== null && (
                        <Text testID="restaurant-distance" style={[restaurantCardStyles.distanceText, isDarkMode && restaurantCardStyles.darkdistanceText]}>
                            {formatDistance(distanceMeters)}{distanceIsFromUser ? ' from you' : ' away'}
                        </Text>
                    )}
                </View>
            </View>
        </TouchableHighlight>
    );
};
