import React, { FC } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { blurhash } from '@/utils/common';

interface ChatListProps {
    users: any[];
}

interface ChatItemProps {
    item: any;
    noBorder?: boolean;
    openChatRoom?: (value: any) => void;
}

const ChatItem: FC<ChatItemProps> = ({ item, noBorder, openChatRoom }) => (
    <TouchableOpacity
        activeOpacity={0.7}
        className={`${
            noBorder ? '' : 'border-b-neutral-200'
        } flex-row items-center justify-between mb-4 mx-4 pb-2 space-x-3`}
        onPress={() => openChatRoom?.(item)}
    >
        <Image
            placeholder={blurhash}
            source={{ uri: item?.profileUrl }}
            style={{ borderRadius: 100, height: hp(6), width: hp(6) }}
            transition={500}
        />

        {/** Name & Last Message */}
        <View className={'flex-1 space-y-1'}>
            <View className={'flex-row justify-between'}>
                <Text className={'font-semibold text-neutral-800'} style={{ fontSize: hp(1.8) }}>
                    {item.username}
                </Text>
                <Text className={'font-medium text-neutral-500'} style={{ fontSize: hp(1.6) }}>
                    {'Time'}
                </Text>
            </View>
            <Text className={'font-medium text-neutral-500'} style={{ fontSize: hp(1.6) }}>
                {'Last Message'}
            </Text>
        </View>
    </TouchableOpacity>
);

const ChatList: FC<ChatListProps> = ({ users }) => {
    const router = useRouter();

    const openChatRoom = (item: any) => {
        router.push({ pathname: '/chatRoom', params: item });
    };

    return (
        <View className={'flex-1'}>
            <FlatList
                contentContainerStyle={{ flex: 1, paddingHorizontal: 25 }}
                data={users}
                keyExtractor={() => `${Math.random()}`}
                renderItem={({ index, item }) => (
                    <ChatItem item={item} noBorder={index + 1 !== users.length} openChatRoom={openChatRoom} />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default ChatList;
