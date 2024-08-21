import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Stack } from 'expo-router';
import { Entypo, Ionicons } from '@expo/vector-icons';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';

interface ChatRoomHeaderProps {
    onBack?: () => void;
    user?: any;
}

const ChatRoomHeader: FC<ChatRoomHeaderProps> = ({ onBack, user }) => {
    return (
        <Stack.Screen
            options={{
                headerLeft: () => (
                    <View className={'flex-row items-center space-x-4'}>
                        <TouchableOpacity onPress={onBack}>
                            <Entypo color={'#737373'} name={'chevron-left'} size={hp(4)} />
                        </TouchableOpacity>
                        <View className={'flex-row items-center space-x-3'}>
                            <Image
                                source={user?.profileUrl}
                                style={{ aspectRatio: 1, borderRadius: 100, height: hp(4.3) }}
                            />
                            <Text className={'font-medium text-neutral-700'} style={{ fontSize: hp(2.5) }}>
                                {user?.username}
                            </Text>
                        </View>
                    </View>
                ),
                headerRight: () => (
                    <View className={'flex-row items-center space-x-8'}>
                        <Ionicons color={'#737373'} name={'call'} size={hp(2.8)} />
                        <Ionicons color={'#737373'} name={'videocam'} size={hp(2.8)} />
                    </View>
                ),
                headerShadowVisible: false,
                title: '',
            }}
        />
    );
};

export default ChatRoomHeader;
