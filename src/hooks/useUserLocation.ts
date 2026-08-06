import { useCallback, useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import type { LatLng } from '../functions/map/distance';

export type UserLocationStatus = 'loading' | 'granted' | 'denied';

let cachedLocation: LatLng | null = null;

async function requestAndroidPermission(): Promise<boolean> {
    if (Platform.OS !== 'android') {
        return true;
    }
    const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: 'Location access',
            message: 'Your location is used to show the distance to restaurants near you.',
            buttonPositive: 'Allow',
            buttonNegative: 'Deny',
        },
    );
    return result === PermissionsAndroid.RESULTS.GRANTED;
}

function getCurrentLocation(): Promise<LatLng | null> {
    return new Promise(resolve => {
        Geolocation.getCurrentPosition(
            position => {
                cachedLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                resolve(cachedLocation);
            },
            () => resolve(null),
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
        );
    });
}

export const useUserLocation = () => {
    const [userLocation, setUserLocation] = useState<LatLng | null>(cachedLocation);
    const [status, setStatus] = useState<UserLocationStatus>(
        cachedLocation ? 'granted' : 'loading',
    );

    const refresh = useCallback(async () => {
        if (cachedLocation) {
            setUserLocation(cachedLocation);
            setStatus('granted');
            return;
        }
        setStatus('loading');
        const granted = await requestAndroidPermission();
        if (!granted) {
            setStatus('denied');
            return;
        }
        const location = await getCurrentLocation();
        setUserLocation(location);
        setStatus(location ? 'granted' : 'denied');
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { userLocation, status, refresh };
};
