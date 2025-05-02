import { View, Text, Image, TouchableHighlight } from 'react-native';
import { restaurantCardStyles } from '../stylesheets/Props/restaurantCard_StyleSheet';
import { RestaurantCardPropType } from '../types/restaurantCard_type_d';


export const RestaurantCard = ({ item, isDarkMode, cuisines }: RestaurantCardPropType) => {
  return (
    <TouchableHighlight
      testID={`restaurant-card-${item.id}`}
      underlayColor={isDarkMode ? '#1A1A18' : '#F8F9FA'}
      onPress={() => { }}
      style={restaurantCardStyles.touchableHighlight}
    >
      {/********************* The card has two parts: upperPart & lowerPart ********************/}
      <View style={[restaurantCardStyles.card, isDarkMode && restaurantCardStyles.darkcard]}>
        <View style={restaurantCardStyles.upperPart}>
          <Image //******************    The Restaurant Logo   **********************/
            source={{ uri: item.logoUrl }}
            style={restaurantCardStyles.image}
          />
          <View style={restaurantCardStyles.textContainer}>
            <Text testID="restaurant-name" style={[restaurantCardStyles.name, isDarkMode && restaurantCardStyles.darkname]}>{item.name}</Text>
            <View style={restaurantCardStyles.ratingContainer}>
              <Image style={restaurantCardStyles.ratingImage} source={require('../images/Just-Eat-Star.png')} />
              <Text testID="restaurant-rating" style={restaurantCardStyles.rating}>{item.rating.starRating}</Text>
              <Text style={[restaurantCardStyles.ratingNumbers, isDarkMode && restaurantCardStyles.darkratingNumbers]}> ({item.rating.count})</Text>
            </View>
          </View>
        </View>
        {/*********** upperPart Ends ***********/}

        <View style={restaurantCardStyles.separator} />

        {/*********** lowerPart Starts *********/}
        <View style={restaurantCardStyles.lowerPart}>
          <Text testID="restaurant-cuisine" style={[restaurantCardStyles.cuisine, isDarkMode && restaurantCardStyles.darkcuisine]}>{cuisines}</Text>
          <View style={restaurantCardStyles.addressContainer}> {/* The address container, with pin icon and address text */}
            <Text style={restaurantCardStyles.pinIcon}>📍</Text>
            <View style={restaurantCardStyles.addressTextContainer}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={[restaurantCardStyles.address, isDarkMode && restaurantCardStyles.darkaddress]}>{item.address.firstLine}, {item.address.city}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};
