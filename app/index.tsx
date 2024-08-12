import React, { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';

const App: FC = () => {
    return (
        <View className={'flex-1 items-center justify-center'}>
            <ActivityIndicator color={'gray'} size={'large'} />
        </View>
    );
};

export default App;
