import { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { restaurantMapStyles } from '../stylesheets/props/restaurantMap';
import type { RestaurantType } from '../types/restaurant';
import type { PieTokens } from '../configs/pieTokens';

export const getRestaurantLatLng = (restaurant: RestaurantType) => {
    const coordinates = restaurant.address.location?.coordinates;
    if (!coordinates || coordinates.length < 2) {
        return null;
    }
    return {
        latitude: coordinates[1],
        longitude: coordinates[0],
    };
};

export const FullScreenMapModal = ({ visible, restaurant, onClose, theme }: {
    visible: boolean;
    restaurant: RestaurantType;
    onClose: () => void;
    theme: PieTokens;
}) => {
    const coordinate = getRestaurantLatLng(restaurant);
    const styles = restaurantMapStyles(theme);
    if (!coordinate) {
        return null;
    }

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <MapView
                    style={styles.modalMap}
                    initialRegion={{
                        ...coordinate,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}
                    showsUserLocation
                >
                    <Marker coordinate={coordinate} title={restaurant.name} />
                </MapView>
                <View style={styles.modalHeader}>
                    <Pressable
                        testID="close-fullscreen-map"
                        onPress={onClose}
                        style={styles.closeButton}
                        accessibilityRole="button"
                        accessibilityLabel="Close full screen map"
                    >
                        <Text style={styles.closeButtonText}>✕ Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export const RestaurantMap = ({ restaurant, theme }: { restaurant: RestaurantType; theme: PieTokens }) => {
    const [fullScreenVisible, setFullScreenVisible] = useState(false);
    const coordinate = getRestaurantLatLng(restaurant);
    const styles = restaurantMapStyles(theme);

    if (!coordinate) {
        return null;
    }

    return (
        <View style={styles.container}>
            <MapView
                testID="restaurant-map"
                style={styles.map}
                initialRegion={{
                    ...coordinate,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
                showsUserLocation
                onPress={() => setFullScreenVisible(true)}
            >
                <Marker coordinate={coordinate} title={restaurant.name} />
            </MapView>
            <Pressable
                testID="expand-map-button"
                onPress={() => setFullScreenVisible(true)}
                style={styles.expandButton}
                accessibilityRole="button"
                accessibilityLabel="Open full screen map"
            >
                <Text style={styles.expandButtonText}>Full screen</Text>
            </Pressable>
            <FullScreenMapModal
                visible={fullScreenVisible}
                restaurant={restaurant}
                onClose={() => setFullScreenVisible(false)}
                theme={theme}
            />
        </View>
    );
};
