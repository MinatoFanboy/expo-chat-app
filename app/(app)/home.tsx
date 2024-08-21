import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getDocs, query, where } from 'firebase/firestore';

import { ChatList, Loading } from '@/components';
import { useAuth } from '@/context/authContext';
import { usersRef } from '@/firebaseConfig';

const Home: FC = () => {
    const { user } = useAuth();

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const q = query(usersRef, where('userId', '!=', user?.userId));

        const querySnapshot = await getDocs(q);
        let data: any = [];

        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data() });
        });

        setUsers(data);
    };

    useEffect(() => {
        if (user?.userId) {
            getUsers();
        }
    }, [user]);

    return (
        <View className={'bg-white flex-1'}>
            <StatusBar style={'light'} />

            {users.length > 0 ? (
                <ChatList currentUser={user} users={users} />
            ) : (
                <View className={'flex items-center'} style={{ top: hp(30) }}>
                    <Loading size={hp(10)} />
                </View>
            )}
        </View>
    );
};

export default Home;
