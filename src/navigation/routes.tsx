import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StackParameterList} from './type';
import SignUp from 'screens/Home/Home';
const AuthStack = createStackNavigator<StackParameterList>();


const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
      initialRouteName={'HOME' as keyof StackParameterList}>
      <AuthStack.Screen
        name={'HOME' as keyof StackParameterList}
        component={SignUp}
      /> 
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
