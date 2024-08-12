import React, { FC } from 'react';
import { Button, View } from 'react-native';

import { useAuth } from '@/context/authContext';

const Home: FC = () => {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <View className={'bg-white flex-1'}>
            <Button onPress={handleLogout} title={'Logout'} />
        </View>
    );
};

export default Home;
