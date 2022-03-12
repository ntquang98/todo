import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import MainScreen from './screens/main-screen';
import AboutScreen from './screens/about-screen';
import SideBar from './components/side-bar';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Drawer.Navigator 
      initialRouteName='Main' 
      drawerContent={props => <SideBar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000'
      }}
    >
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  )
}

export default App;