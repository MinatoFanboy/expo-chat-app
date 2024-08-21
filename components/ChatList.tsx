import React, { FC, useEffect, useMemo, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { db } from '@/firebaseConfig';
import { blurhash, formatDate, getRoomId } from '@/utils/common';

interface ChatListProps {
    currentUser: any;
    users: any[];
}

interface ChatItemProps {
    currentUser: any;
    item: any;
    noBorder?: boolean;
    openChatRoom?: (value: any) => void;
}

const ChatItem: FC<ChatItemProps> = ({ currentUser, item, noBorder, openChatRoom }) => {
    const [lastMessage, setLastMessage] = useState<any>();

    useEffect(() => {
        let roomId = getRoomId(currentUser?.userId, item?.userId);
        const docRef = doc(db, 'rooms', roomId);
        const messageRef = collection(docRef, 'messages');
        const q = query(messageRef, orderBy('createdAt', 'asc'));

        let unSub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map((doc) => {
                return doc.data();
            });
            setLastMessage(allMessages[0] ? allMessages[0] : null);
        });

        return unSub;
    }, []);

    const _renderLastMessage = useMemo(() => {
        if (typeof lastMessage === undefined) {
            return '...Loading';
        }
        if (lastMessage) {
            if (currentUser?.userId === lastMessage?.userId) {
                return `You: ${lastMessage?.text}`;
            }

            return lastMessage?.text;
        } else {
            return 'Say Hi 👋';
        }
    }, [lastMessage]);

    const _renderTime = useMemo(() => {
        if (lastMessage) {
            let date = lastMessage.createdAt;

            return formatDate(new Date(date?.seconds * 1000));
        }
        return '';
    }, [lastMessage]);

    return (
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
                        {_renderTime}
                    </Text>
                </View>
                <Text className={'font-medium text-neutral-500'} style={{ fontSize: hp(1.6) }}>
                    {_renderLastMessage}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const ChatList: FC<ChatListProps> = ({ currentUser, users }) => {
    const router = useRouter();

    const openChatRoom = (item: any) => {
        router.push({ pathname: '/(app)/chatRoom', params: item });
    };

    return (
        <View className={'flex-1'}>
            <FlatList
                contentContainerStyle={{ flex: 1, paddingTop: 25 }}
                data={users}
                keyExtractor={() => `${Math.random()}`}
                renderItem={({ index, item }) => (
                    <ChatItem
                        currentUser={currentUser}
                        item={item}
                        noBorder={index + 1 !== users.length}
                        openChatRoom={openChatRoom}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default ChatList;
