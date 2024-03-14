import React from 'react';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigation} from '../src/navigators';
import {NowPlaying} from '../src/components/tabs/NowPlaying';
import {Popular, TopRated, Upcoming} from '../src/components/tabs';


describe('AppNavigation', () => {
  it('should navigate to NowPlaying tab', async () => {
    render(
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>,
    );
    expect(NowPlaying).toBeTruthy();
  });

  it('should navigate to Popular tab', async () => {
    render(
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>,
    );
    expect(Popular).toBeTruthy();
  });

  it('should navigate to TopRated tab', async () => {
    render(
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>,
    );
    expect(TopRated).toBeTruthy();
  });

  it('should navigate to Upcoming tab', async () => {
    render(
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>,
    );
    expect(Upcoming).toBeTruthy();
  });
});
