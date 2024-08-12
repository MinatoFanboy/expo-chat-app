import 'react-native-reanimated';
import { FC, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack, router, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { AuthProvider, useAuth } from '@/context/authContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const MainLayout: FC = () => {
    const { isAuthenticated } = useAuth();
    const segment = useSegments();

    useEffect(() => {
        /** Check if user is authenticated or not */
        if (typeof isAuthenticated === 'undefined') {
            return;
        }

        const isApp = segment[0] === '(app)';

        if (isAuthenticated && !isApp) {
            router.replace('/(app)');
        } else if (isAuthenticated === false) {
            router.replace('/signIn');
        }
    }, [isAuthenticated]);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'index'} />
            <Stack.Screen name={'(app)'} />
            <Stack.Screen name={'signIn'} />
            <Stack.Screen name={'signUp'} />
        </Stack>
    );
};

const RootLayout: FC = () => {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AuthProvider>
            <MainLayout />
        </AuthProvider>
    );
};

export default RootLayout;
