import React, { FC } from 'react';
import { Stack } from 'expo-router';

import { HomeHeader } from '@/components';

const MainLayout: FC = () => {
    return (
        <Stack>
            <Stack.Screen name={'home'} options={{ header: () => <HomeHeader /> }} />
            <Stack.Screen name={'chatRoom'} />
        </Stack>
    );
};

export default MainLayout;
