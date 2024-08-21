import React, { FC, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { Feather } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { ChatRoomHeader, CustomKeyboard, MessageList } from '@/components';
import { useAuth } from '@/context/authContext';
import { db } from '@/firebaseConfig';
import { getRoomId } from '@/utils/common';

interface IMessage {
    createdAt: Timestamp;
    profileUrl: string;
    senderName: string;
    text: string;
    userId: string;
}

const ChatRoom: FC = () => {
    const { user } = useAuth();
    const router = useRouter();
    const item = useLocalSearchParams();

    const inputRef = useRef<TextInput>(null);
    const scrollRef = useRef<ScrollView>(null);
    const textRef = useRef('');
    const [messages, setMessages] = useState<IMessage[]>([]);

    const onBack = () => {
        router.back();
    };

    const createRoomIfNotExists = async () => {
        let roomId = getRoomId(user?.userId, item?.userId);

        await setDoc(doc(db, 'rooms', roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date()),
        });
    };

    const handleSendMessage = async () => {
        let message = textRef.current.trim();

        if (!message) {
            return;
        }

        try {
            let roomId = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, 'rooms', roomId);

            const messagesRef = collection(docRef, 'messages');

            textRef.current = '';
            inputRef.current?.clear();

            await addDoc(messagesRef, {
                createdAt: Timestamp.fromDate(new Date()),
                profileUrl: user?.profileUrl,
                senderName: user?.username,
                text: message,
                userId: user?.userId,
            });
        } catch (error: any) {
            Alert.alert('Message', error.message);
        }
    };

    const updateScrollView = () => {
        setTimeout(() => {
            scrollRef?.current?.scrollToEnd({ animated: false });
        }, 100);
    };

    useEffect(() => {
        createRoomIfNotExists();

        let roomId = getRoomId(user?.userId, item?.userId);
        const docRef = doc(db, 'rooms', roomId);
        const messageRef = collection(docRef, 'messages');
        const q = query(messageRef, orderBy('createdAt', 'asc'));

        let unSub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map((doc) => {
                return doc.data();
            });

            setMessages([...allMessages] as IMessage[]);
        });

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', updateScrollView);

        return () => {
            unSub();
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        let timer = setTimeout(() => {
            scrollRef?.current?.scrollToEnd({ animated: false });
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <CustomKeyboard inChat>
            <View className={'bg-white flex-1'}>
                <StatusBar style={'dark'} />

                <ChatRoomHeader onBack={onBack} user={item} />

                <View className={'border-b border-neutral-300 h3'} />

                <View className={'bg-neutral-100 flex-1 justify-between overflow-visible'}>
                    <View className={'flex-1'}>
                        <MessageList currentUser={user} messages={messages} ref={scrollRef} />
                    </View>

                    <View className={'pt-2'} style={{ marginBottom: hp(1.7) }}>
                        <View className={'flex-row items-center justify-between mx-3'}>
                            <View
                                className={
                                    'bg-white border border-neutral-300 flex-1 flex-row justify-between p-2 rounded-full'
                                }
                            >
                                <TextInput
                                    className={'flex-1 mr-2'}
                                    onChangeText={(value) => (textRef.current = value)}
                                    placeholder={'Type message ...'}
                                    ref={inputRef}
                                    style={{ fontSize: hp(2), paddingVertical: 0 }}
                                />

                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    className={'bg-neutral-200 mr-[1px] p-2 rounded-full'}
                                    onPress={handleSendMessage}
                                >
                                    <Feather color={'#737373'} name={'send'} size={hp(2.7)} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboard>
    );
};

export default ChatRoom;
