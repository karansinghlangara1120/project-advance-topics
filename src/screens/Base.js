import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Screens from './index';

const Base = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {textTransform: 'none'},
      }}>
      <Tab.Screen name="Movies" component={Screens.Movies} />
      <Tab.Screen name="Search Result" component={Screens.SearchResults} />
      <Tab.Screen name="TV Shows" component={Screens.TvShows} />
    </Tab.Navigator>
  );
};

export default Base;
