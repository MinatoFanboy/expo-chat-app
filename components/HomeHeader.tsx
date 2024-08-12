import React, { FC, memo } from 'react';
import { Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Image } from 'expo-image';
import { AntDesign, Feather } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { MenuItem } from './CustomMenuItems';
import { useAuth } from '@/context/authContext';
import { blurhash } from '@/utils/common';

const Divider = () => <View className={'bg-neutral-200 p-[1px] w-full'} />;

const HomeHeader: FC = () => {
    const { top } = useSafeAreaInsets();
    const router = useRouter();
    const { logout, user } = useAuth();

    const handleProfile = () => {};

    const handleLogout = async () => {
        await logout();
    };

    return (
        <View
            className={'bg-indigo-400 flex-row justify-between pb-6 px-5 rounded-b-3xl shadow'}
            style={{ paddingTop: Platform.OS === 'ios' ? top : top + 10 }}
        >
            <View>
                <Text className={'font-medium text-white'} style={{ fontSize: hp(3) }}>
                    {'Chats'}
                </Text>
            </View>

            <View>
                <Menu>
                    <MenuTrigger>
                        <Image
                            placeholder={{ blurhash }}
                            source={user?.profileUrl}
                            style={{ aspectRatio: 1, borderRadius: 100, height: hp(4.3) }}
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions
                        customStyles={{
                            optionsWrapper: {
                                backgroundColor: 'white',
                                borderCurve: 'continuous',
                                borderRadius: 10,
                                marginLeft: -30,
                                marginTop: 40,
                                shadowOffset: { height: 0, width: 0 },
                                shadowOpacity: 0.2,
                                width: 160,
                            },
                        }}
                    >
                        <MenuItem
                            action={handleProfile}
                            icon={<Feather color={'#737373'} name={'user'} size={hp(2.5)} />}
                            text={'Profile'}
                            value={null}
                        />
                        <Divider />
                        <MenuItem
                            action={handleLogout}
                            icon={<AntDesign color={'#737373'} name={'logout'} size={hp(2.5)} />}
                            text={'Sign Out'}
                            value={null}
                        />
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    );
};

export default memo(HomeHeader);
