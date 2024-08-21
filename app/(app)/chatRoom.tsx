import React, { FC, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { ChatRoomHeader, CustomKeyboard, MessageList } from '@/components';

const ChatRoom: FC = () => {
    const router = useRouter();
    const item = useLocalSearchParams();
    const [messages, setMessages] = useState([]);

    const onBack = () => {
        router.back();
    };

    return (
        <CustomKeyboard inChat>
            <View className={'bg-white flex-1'}>
                <StatusBar style={'dark'} />

                <ChatRoomHeader onBack={onBack} user={item} />

                <View className={'border-b border-neutral-300 h3'} />

                <View className={'bg-neutral-100 flex-1 justify-between overflow-visible'}>
                    <View className={'flex-1'}>
                        <MessageList />
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
                                    placeholder={'Type message ...'}
                                    style={{ fontSize: hp(2), paddingVertical: 0 }}
                                />

                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    className={'bg-neutral-200 mr-[1px] p-2 rounded-full'}
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
