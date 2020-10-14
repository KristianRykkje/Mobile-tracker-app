// import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';

import Map from '../components/Map';
import TrackForm from '../components/TrackForm';

import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';

const TrackCreateScreen = ({ isFocused }) => {
  const { state: { recording }, addLocation } = useContext(LocationContext);
  const callback = useCallback(location => {
    addLocation(location, recording);
  }, [recording]);
  const [err] = useLocation(isFocused || recording, callback);

  return (
    <>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </>
  );
};

TrackCreateScreen.navigationOptions = {
  title: 'Add Track',
  headerStyle: {
    backgroundColor: '#1eb03b',
  },
};

const styles = StyleSheet.create({

});

export default withNavigationFocus(TrackCreateScreen);