import React, { FC, PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const CustomKeyboard: FC<PropsWithChildren<{ inChat?: boolean }>> = ({ children, inChat }) => {
    let kavConfig = {};
    let scrollViewConfig = {};

    if (inChat) {
        kavConfig = { keyboardVerticalOffset: 90 };
        scrollViewConfig = { contentContainerStyle: { flex: 1 } };
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ backgroundColor: 'white', flex: 1 }}
            {...kavConfig}
        >
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{ flex: 1 }} {...scrollViewConfig}>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CustomKeyboard;
