import React, { FC, useRef, useState } from 'react';
import { Alert, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { CustomKeyboard, Loading } from '@/components';
import { useAuth } from '@/context/authContext';

const SignUp: FC = () => {
    const { register } = useAuth();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const emailRef = useRef<string>('');
    const passwordRef = useRef<string>('');
    const usernameRef = useRef<string>('');
    const profileUrlRef = useRef<string>('');

    const handleRegister = async () => {
        if (!emailRef.current && !passwordRef.current && !usernameRef.current && !profileUrlRef.current) {
            Alert.alert('Sign In', 'Please fill all the fields!');
            return;
        }

        /** Process register */
        setLoading(true);
        let response: any = await register(
            emailRef.current,
            passwordRef.current,
            usernameRef.current,
            profileUrlRef.current,
        );
        setLoading(false);

        if (!response.success) {
            Alert.alert('Sign Up', response.msg);
        }
    };

    return (
        <CustomKeyboard>
            <StatusBar style={'dark'} />

            <View className={'flex-1 space-y-12'} style={{ paddingHorizontal: wp(5), paddingTop: hp(7) }}>
                {/** SignIn Image */}
                <View className={'items-center'}>
                    <View style={{ backgroundColor: '#FFF9F2', height: hp(25), width: hp(25) }} />
                </View>

                <View className={'space-y-10'}>
                    <Text
                        className={'font-bold text-center text-neutral-800 tracking-wider'}
                        style={{ fontSize: hp(4) }}
                    >
                        {'Sign Up'}
                    </Text>

                    {/** Inputs */}
                    <View className={'space-y-4'}>
                        <View
                            className={'bg-neutral-100 flex-row space-x-4 items-center px-4 rounded-2xl'}
                            style={{ height: hp(7) }}
                        >
                            <Feather color={'gray'} name={'user'} size={hp(2.7)} />

                            <TextInput
                                className={'flex-1 font-semibold text-neutral-700'}
                                onChangeText={(value) => (usernameRef.current = value)}
                                placeholder={'Username'}
                                placeholderTextColor={'gray'}
                                style={{ fontSize: hp(2) }}
                            />
                        </View>

                        <View
                            className={'bg-neutral-100 flex-row space-x-4 items-center px-4 rounded-2xl'}
                            style={{ height: hp(7) }}
                        >
                            <Octicons color={'gray'} name={'mail'} size={hp(2.7)} />

                            <TextInput
                                autoCapitalize={'none'}
                                autoComplete={'email'}
                                className={'flex-1 font-semibold text-neutral-700'}
                                keyboardType={'email-address'}
                                onChangeText={(value) => (emailRef.current = value)}
                                placeholder={'Email address'}
                                placeholderTextColor={'gray'}
                                style={{ fontSize: hp(2) }}
                            />
                        </View>

                        <View
                            className={'bg-neutral-100 flex-row space-x-4 items-center px-4 rounded-2xl'}
                            style={{ height: hp(7) }}
                        >
                            <Octicons color={'gray'} name={'lock'} size={hp(2.7)} />

                            <TextInput
                                className={'flex-1 font-semibold text-neutral-700'}
                                onChangeText={(value) => (passwordRef.current = value)}
                                placeholder={'Password'}
                                placeholderTextColor={'gray'}
                                secureTextEntry
                                style={{ fontSize: hp(2) }}
                            />
                        </View>

                        <View
                            className={'bg-neutral-100 flex-row space-x-4 items-center px-4 rounded-2xl'}
                            style={{ height: hp(7) }}
                        >
                            <Feather color={'gray'} name={'image'} size={hp(2.7)} />

                            <TextInput
                                className={'flex-1 font-semibold text-neutral-700'}
                                onChangeText={(value) => (profileUrlRef.current = value)}
                                placeholder={'Profile Url'}
                                placeholderTextColor={'gray'}
                                style={{ fontSize: hp(2) }}
                            />
                        </View>
                    </View>

                    {/** Submit button */}
                    <View>
                        {loading ? (
                            <View style={{ alignItems: 'center' }}>
                                <Loading size={hp(6.5)} />
                            </View>
                        ) : (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                className={'bg-indigo-500 items-center justify-center rounded-xl'}
                                onPress={handleRegister}
                                style={{ height: hp(6.5) }}
                            >
                                <Text className={'font-bold text-white tracking-wider'} style={{ fontSize: hp(2.7) }}>
                                    {'Sign Up'}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/** Already have an account? */}
                    <View className={'flex-row justify-center'}>
                        <Text className={'font-semibold text-neutral-500'} style={{ fontSize: hp(1.8) }}>
                            {'Already have an account?'}
                        </Text>
                        <Pressable onPress={() => router.back()}>
                            <Text className={'font-bold text-indigo-500'} style={{ fontSize: hp(1.8) }}>
                                {' Sign In'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </CustomKeyboard>
    );
};

export default SignUp;
