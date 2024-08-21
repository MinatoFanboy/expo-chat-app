import React, { FC, forwardRef, memo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Timestamp } from 'firebase/firestore';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface IMessage {
    createdAt: Timestamp;
    profileUrl: string;
    senderName: string;
    text: string;
    userId: string;
}

interface IUser {
    username: string;
    profileUrl: string;
    userId: string;
}

const MessageItem: FC<{ currentUser: IUser | null; message: IMessage }> = ({ currentUser, message }) => (
    <>
        {currentUser?.userId === message?.userId ? (
            <View className={'flex-row justify-end mb-3 mr-3'}>
                <View style={{ width: wp(80) }}>
                    <View className={'bg-white border border-neutral-200 p-3 rounded-2xl self-end'}>
                        <Text style={{ fontSize: hp(1.9) }}>{message.text}</Text>
                    </View>
                </View>
            </View>
        ) : (
            <View className={'mb-3 mb-3'} style={{ width: wp(80) }}>
                <View className={'bg-indigo-100 border border-indigo-200 p-3 px-4 rounded-2xl self-start'}>
                    <Text style={{ fontSize: hp(1.9) }}>{message.text}</Text>
                </View>
            </View>
        )}
    </>
);

const MessageList = forwardRef<ScrollView, { currentUser: IUser | null; messages: IMessage[] }>(
    ({ currentUser, messages }, ref) => {
        return (
            <ScrollView contentContainerStyle={{ paddingTop: 10 }} ref={ref} showsVerticalScrollIndicator={false}>
                {messages.map((message, index) => (
                    <MessageItem currentUser={currentUser} key={`Message-${index}`} message={message} />
                ))}
            </ScrollView>
        );
    },
);

export default memo(MessageList);
