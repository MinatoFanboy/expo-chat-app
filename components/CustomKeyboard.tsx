import React, { FC, PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const CustomKeyboard: FC<PropsWithChildren> = ({ children }) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ backgroundColor: 'white', flex: 1 }}
        >
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CustomKeyboard;
