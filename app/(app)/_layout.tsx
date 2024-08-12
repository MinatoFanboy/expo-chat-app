import React, { FC } from 'react';
import { Stack } from 'expo-router';

const MainLayout: FC = () => {
    return (
        <Stack>
            <Stack.Screen name={'home'} />
        </Stack>
    );
};

export default MainLayout;
