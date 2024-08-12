import React, { FC } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

const Loading: FC<{ size: number }> = ({ size }) => {
    return (
        <View style={{ aspectRatio: 1, height: size }}>
            <LottieView autoPlay loop source={'@/assets/images/loading-animation.json'} style={{ flex: 1 }} />
        </View>
    );
};

export default Loading;
