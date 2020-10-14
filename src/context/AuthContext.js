import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../apis/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { errorMessage: '', token: action.payload[0], username: action.payload[1] };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        case 'signout':
            return { token: null, errorMessage: '', username: null };
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    const username = await AsyncStorage.getItem('username');
    if (token) {
        dispatch({ type: 'signin', payload: [token, username] });
        navigate('TrackList');
    } else {
        navigate('Signup');
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message'});
};

const signup = dispatch => async ({ username, email, password }) => {
    try {
        const response = await trackerApi.post('/signup', { username, email, password });
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('username', response.data.username);
        dispatch({ type: 'signin', payload: [response.data.token, response.data.username] });

        navigate('TrackList');
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' })
    }
};


const signin = dispatch => async ({ username, email, password }) => {
    try {
        const response = await trackerApi.post('/signin', { username, email, password });
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('username', response.data.username);
        dispatch({ type: 'signin', payload: [response.data.token, response.data.username] });

        navigate('TrackList');
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with sign in'
        });
    }
};

const signout = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    
    navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout, clearErrorMessage, tryLocalSignin },
    { token: null, username: '', errorMessage: '' }
);