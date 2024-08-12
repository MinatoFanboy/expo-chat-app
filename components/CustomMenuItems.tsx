import React, { FC, ReactNode } from 'react';
import { Text, View } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface MenuItem {
    action: (param: any) => void;
    icon: ReactNode;
    text: string;
    value: null;
}

export const MenuItem: FC<MenuItem> = ({ action, icon, text, value }) => {
    return (
        <MenuOption onSelect={() => action(value)}>
            <View className={'flex-row items-center justify-center px-4 py-1'}>
                <Text className={'font-semibold text-neutral-600'} style={{ fontSize: hp(1.7) }}>
                    {text}
                </Text>
                <Text>{icon}</Text>
            </View>
        </MenuOption>
    );
};

export default MenuItem;
