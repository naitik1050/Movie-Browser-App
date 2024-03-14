// Mock stack navigator
jest.mock('@react-navigation/stack', () => ({
    createStackNavigator: jest.fn(() => ({
      Navigator: jest.fn(() => null),
      Screen: jest.fn(() => null),
    })),
  }));
  
  // Mocking NowPlaying, Popular, TopRated, and Upcoming components
  jest.mock('./src/components/tabs', () => ({
    NowPlaying: jest.fn(() => null),
    Popular: jest.fn(() => null),
    TopRated: jest.fn(() => null),
    Upcoming: jest.fn(() => null),
  }));
  
  // Mocking ListingDetails component
  jest.mock('./src/screens', () => ({
    ListingDetails: jest.fn(() => null),
  }));
  
  // Mocking material top tab navigator
  jest.mock('@react-navigation/material-top-tabs', () => ({
    createMaterialTopTabNavigator: jest.fn(() => ({
      Navigator: jest.fn(() => null),
      Screen: jest.fn(() => null),
    })),
  }));
  