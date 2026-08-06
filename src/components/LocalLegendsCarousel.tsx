import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { localLegendsCarouselStyles } from '../stylesheets/props/localLegendsCarousel';
import type { RestaurantType } from '../types/restaurant';
import type { PieTokens } from '../configs/pieTokens';

type LocalLegendsCarouselProps = {
    restaurants: RestaurantType[];
    theme: PieTokens;
    onPress: (restaurant: RestaurantType) => void;
};

export const LocalLegendsCarousel = ({ restaurants, theme, onPress }: LocalLegendsCarouselProps) => {
    if (restaurants.length === 0) {
        return null;
    }
    const styles = localLegendsCarouselStyles(theme);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
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
                        style={styles.card}
                        accessibilityRole="button"
                        accessibilityLabel={`${item.name}, Local Legend`}
                    >
                        <Image source={{ uri: item.logoUrl }} style={styles.logo} />
                        <Text
                            numberOfLines={2}
                            style={styles.name}
                        >
                            {item.name}
                        </Text>
                        {item.rating.starRating > 0 && (
                            <Text style={styles.rating}>⭐ {item.rating.starRating}</Text>
                        )}
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};
