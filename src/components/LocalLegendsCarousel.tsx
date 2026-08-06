import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { localLegendsCarouselStyles } from '../stylesheets/props/localLegendsCarousel';
import type { RestaurantType } from '../types/restaurant';

type LocalLegendsCarouselProps = {
    restaurants: RestaurantType[];
    isDarkMode: boolean;
    onPress: (restaurant: RestaurantType) => void;
};

export const LocalLegendsCarousel = ({ restaurants, isDarkMode, onPress }: LocalLegendsCarouselProps) => {
    if (restaurants.length === 0) {
        return null;
    }
    return (
        <View style={localLegendsCarouselStyles.container}>
            <Text style={[localLegendsCarouselStyles.title, isDarkMode && localLegendsCarouselStyles.darkTitle]}>
                Local Legends
            </Text>
            <FlatList
                testID="local-legends-carousel"
                horizontal
                showsHorizontalScrollIndicator={false}
                data={restaurants}
                keyExtractor={(item) => `legend-${item.id.toString()}`}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        testID={`local-legend-${item.id}`}
                        onPress={() => onPress(item)}
                        style={[
                            localLegendsCarouselStyles.card,
                            isDarkMode && localLegendsCarouselStyles.darkCard,
                        ]}
                    >
                        <Image source={{ uri: item.logoUrl }} style={localLegendsCarouselStyles.logo} />
                        <Text
                            numberOfLines={2}
                            style={[localLegendsCarouselStyles.name, isDarkMode && localLegendsCarouselStyles.darkName]}
                        >
                            {item.name}
                        </Text>
                        {item.rating.starRating > 0 && (
                            <Text style={localLegendsCarouselStyles.rating}>⭐ {item.rating.starRating}</Text>
                        )}
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};
