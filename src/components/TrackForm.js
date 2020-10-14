import React, { useContext } from 'react';
import { Text, Button, Input } from 'react-native-elements';

import Spacer from '../components/Spacer';

import { Context as LocationContext } from '../context/LocationContext';

import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {
    const { state: { name, recording, locations }, 
        startRecording, 
        stopRecording, 
        changeName 
    } = useContext(LocationContext);
    const [saveTrack] = useSaveTrack();

    return (
        <>
                <Input value={name} onChangeText={changeName} placeholder="Enter name of Track" />
            <Spacer>
                {recording ? <Button title="Stop" onPress={stopRecording} />  
                : <Button title="Start Recording" onPress={startRecording} />
                }
            </Spacer>
            <Spacer>
                {
                    !recording && locations.length && name.length
                    ? <Button title="Save Recording" onPress={saveTrack} />
                    : <Text h3>Give your track a name!</Text>
                }
            </Spacer>
        </>
    );
};

export default TrackForm;