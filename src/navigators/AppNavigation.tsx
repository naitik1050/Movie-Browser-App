import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NowPlaying, Popular, TopRated, Upcoming} from '../components/tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {ListingDetails} from '../screens';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const MovieTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 11, fontWeight: 'bold'},
      }}>
      <Tab.Screen name="Now Playing" component={NowPlaying} />
      <Tab.Screen name="Popular" component={Popular} />
      <Tab.Screen name="Top Rated" component={TopRated} />
      <Tab.Screen name="Upcoming" component={Upcoming} />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={MovieTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="listingDetails"
        component={ListingDetails}
        options={{title: 'Movie Details'}}
      />
    </Stack.Navigator>
  );
};

export {AppNavigation};
