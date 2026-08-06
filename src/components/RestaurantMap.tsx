import { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { restaurantMapStyles } from '../stylesheets/props/restaurantMap';
import type { RestaurantType } from '../types/restaurant';

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

export const FullScreenMapModal = ({ visible, restaurant, onClose }: {
    visible: boolean;
    restaurant: RestaurantType;
    onClose: () => void;
}) => {
    const coordinate = getRestaurantLatLng(restaurant);
    if (!coordinate) {
        return null;
    }

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <View style={restaurantMapStyles.modalOverlay}>
                <MapView
                    style={restaurantMapStyles.modalMap}
                    initialRegion={{
                        ...coordinate,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}
                    showsUserLocation
                >
                    <Marker coordinate={coordinate} title={restaurant.name} />
                </MapView>
                <View style={restaurantMapStyles.modalHeader}>
                    <Pressable
                        testID="close-fullscreen-map"
                        onPress={onClose}
                        style={restaurantMapStyles.closeButton}
                    >
                        <Text style={restaurantMapStyles.closeButtonText}>✕ Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export const RestaurantMap = ({ restaurant }: { restaurant: RestaurantType }) => {
    const [fullScreenVisible, setFullScreenVisible] = useState(false);
    const coordinate = getRestaurantLatLng(restaurant);

    if (!coordinate) {
        return null;
    }

    return (
        <View style={restaurantMapStyles.container}>
            <MapView
                testID="restaurant-map"
                style={restaurantMapStyles.map}
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
                style={restaurantMapStyles.expandButton}
            >
                <Text style={restaurantMapStyles.expandButtonText}>Full screen</Text>
            </Pressable>
            <FullScreenMapModal
                visible={fullScreenVisible}
                restaurant={restaurant}
                onClose={() => setFullScreenVisible(false)}
            />
        </View>
    );
};
