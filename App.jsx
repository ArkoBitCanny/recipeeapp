import React from 'react';
import Home from './Components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupComponent from './Components/SignupComponent';


const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name='Home' component={Home} /> */}
        <Stack.Screen name="Sign In Form" component={SignupComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
