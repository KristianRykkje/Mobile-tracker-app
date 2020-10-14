import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

import { Context as AuthContext } from '../context/AuthContext';

import Spacer from '../components/Spacer';

const AccountScreen = () => {
    const { state, signout } = useContext(AuthContext);

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Spacer>
                <Text h3>Username: {state.username} </Text>
            </Spacer>
            <Spacer>
                <Button title="Sign Out" onPress={signout} />
            </Spacer>
        </SafeAreaView>
    );
};

AccountScreen.navigationOptions = {
    title: 'Account',
    headerStyle: {
        backgroundColor: '#1eb03b',
      },
}

const styles = StyleSheet.create({

});

export default AccountScreen;