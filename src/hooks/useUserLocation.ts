import { useCallback, useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import type { LatLng } from '../functions/map/distance';

export type UserLocationStatus = 'loading' | 'granted' | 'denied' | 'unavailable';

const CACHE_TTL_MS = 60000;

let cachedLocation: { position: LatLng; timestamp: number } | null = null;

function getCachedPosition(): LatLng | null {
    if (!cachedLocation || Date.now() - cachedLocation.timestamp > CACHE_TTL_MS) {
        return null;
    }
    return cachedLocation.position;
}

async function requestPermission(): Promise<boolean> {
    if (Platform.OS === 'android') {
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
    return new Promise(resolve => {
        Geolocation.requestAuthorization(
            () => resolve(true),
            () => resolve(false),
        );
    });
}

function getCurrentLocation(): Promise<LatLng | null> {
    return new Promise(resolve => {
        Geolocation.getCurrentPosition(
            position => {
                cachedLocation = {
                    position: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    },
                    timestamp: position.timestamp || Date.now(),
                };
                resolve(cachedLocation.position);
            },
            () => resolve(null),
            { enableHighAccuracy: false, timeout: 10000, maximumAge: CACHE_TTL_MS },
        );
    });
}

export const useUserLocation = () => {
    const [userLocation, setUserLocation] = useState<LatLng | null>(cachedLocation?.position ?? null);
    const [status, setStatus] = useState<UserLocationStatus>(
        cachedLocation ? 'granted' : 'loading',
    );
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const refresh = useCallback(async () => {
        const cached = getCachedPosition();
        if (cached) {
            setUserLocation(cached);
            setStatus('granted');
            return;
        }
        setStatus('loading');
        const granted = await requestPermission();
        if (!mountedRef.current) {
            return;
        }
        if (!granted) {
            setStatus('denied');
            return;
        }
        const location = await getCurrentLocation();
        if (!mountedRef.current) {
            return;
        }
        setUserLocation(location);
        setStatus(location ? 'granted' : 'unavailable');
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { userLocation, status, refresh };
};
