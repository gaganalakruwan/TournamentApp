import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import AuthStackNavigator from './src/navigation/routes';
import Spinner from 'components/Spinner';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AuthStackNavigator />
          <Spinner/>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
