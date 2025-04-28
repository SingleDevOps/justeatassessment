import { View, Text, Image, TouchableHighlight } from 'react-native';

type RestaurantCardProp = {
    style:any;
    item:any;
    isDarkMode:boolean;
    cuisines:string;
}


export const RestaurantCard = ({style, item, isDarkMode, cuisines}:RestaurantCardProp) => {
    return (
        <TouchableHighlight
                        underlayColor={isDarkMode ? '#1A1A18' : '#F8F9FA'}
                        onPress={() => { }}
                        style={style.touchableHighlight}
                      >
                        {/********************* The card has two parts: upperPart & lowerPart ********************/}
                        <View style={[style.card, isDarkMode && style.darkcard]}>
                          <View style={style.upperPart}>
                            <Image //******************    The Restaurant Logo   **********************/
                              source={{ uri: item.logoUrl }}
                              style={style.image}
                            />
                            <View style={style.textContainer}>
                              <Text style={[style.name, isDarkMode && style.darkname]}>{item.name}</Text>
                              <View style={style.ratingContainer}>
                                <Image style={style.ratingImage} source={require('../images/Just-Eat-Star.png')} />
                                <Text style={style.rating}>{item.rating.starRating}</Text>
                                <Text style={[style.ratingNumbers, isDarkMode && style.darkratingNumbers]}> ({item.rating.count})</Text>
                              </View>
                            </View>
                          </View>
                          {/*********** upperPart Ends ***********/}

                          <View style={style.separator} />

                          {/*********** lowerPart Starts *********/}
                          <View style={style.lowerPart}>
                            <Text style={[style.cuisine, isDarkMode && style.darkcuisine]}>{cuisines}</Text>
                            <View style={style.addressContainer}> {/* The address container, with pin icon and address text */}
                              <Text style={[style.pinIcon]}>{'📍'}</Text>
                              <View style={style.addressTextContainer}>
                                <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={[style.address, isDarkMode && style.darkaddress]}>{item.address.firstLine}, {item.address.city}</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableHighlight>
    );
};
