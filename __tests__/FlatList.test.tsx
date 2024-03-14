import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Flatlist} from '../src/components/FlatList';
import * as RootNavigation from '../src/navigators/RootNavigation';

// Mock navigationRef
const navigationRef = {
  current: {
    navigate: jest.fn(),
  },
};

const mockNavigate = jest.fn();
navigationRef.current = {navigate: mockNavigate};

// Spy on createRef to return the mock navigationRef
jest.spyOn(React, 'createRef').mockReturnValue(navigationRef);
jest.spyOn(RootNavigation, 'dispatch').mockReturnValue(undefined);
jest.spyOn(RootNavigation, 'getRootState').mockReturnValue(undefined);

describe('<Flatlist />', () => {
  const mockData = [
    {
      id: 1,
      title: 'Movie 1',
      release_date: '2023-01-01',
      vote_average: 8.5,
      poster_path: 'example_path.jpg',
    },
    // Add more mock data as needed
  ];

  it('renders loading indicator when loading is true', () => {
    const {getByTestId} = render(
      <Flatlist data={[]} loading={true} error={null} />,
    );
    expect(getByTestId('loading')).toBeTruthy();
  });

  it('renders error message when error is present', () => {
    const errorMessage = 'An error occurred';
    const {getByText} = render(
      <Flatlist data={[]} loading={false} error={{message: errorMessage}} />,
    );
    expect(getByText(`Error: ${errorMessage}`)).toBeTruthy();
  });

  it('renders list of movies correctly', () => {
    const {getByText, getByTestId} = render(
      <Flatlist data={mockData} loading={false} error={null} />,
    );
    expect(getByTestId('flatlist')).toBeTruthy();
    expect(getByText('Movie 1')).toBeTruthy(); // Ensure first movie is rendered
  });

  it('navigates to movie details on item press', () => {
    const {getByTestId} = render(
      <Flatlist data={mockData} loading={false} error={null} />,
    );
    fireEvent.press(getByTestId('movieItem'));
    expect(mockNavigate).toBeDefined();
  });
});
