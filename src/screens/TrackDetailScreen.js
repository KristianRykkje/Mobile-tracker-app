import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import MapView, { Polyline } from 'react-native-maps';

import { Context as TrackContext } from '../context/TrackContext';

const TrackDetailScreen = ({ navigation }) => {
    const { state } = useContext(TrackContext);
    const _id = navigation.getParam('_id');

    const track = state.find(t => t._id === _id);
    const initialCoords = track.locations[0].coords;

    return (
        <>
            <Text h2>{track.name}</Text>
            <MapView
                initialRegion={{
                    longitudeDelta: 0.01,
                    latitudeDelta: 0.01,
                    ...initialCoords
                }}
                style={styles.map}
            >
                <Polyline 
                    coordinates={track.locations.map(loc => loc.coords)}
                />
            </MapView>
        </>
    );
};

TrackDetailScreen.navigationOptions = {
    title: 'Track Detail',
    headerStyle: {
      backgroundColor: '#1eb03b',
    },
  };

const styles = StyleSheet.create({
    map: {
        height: 300
    }
});

export default TrackDetailScreen;