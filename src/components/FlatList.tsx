import React from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Strings from '../helper/strings';
import MovieSearch from './MovieSearch';
import {Colors} from '../helper/colors';
import {Routes} from '../constants';
import {navigationRef} from '../navigators';
import commonStyles from '../helper/styles';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

interface Props {
  data: Movie[];
  loading: boolean;
  error: any;
  onEndReached?: () => void;
  onRefresh?: () => void;
}

export const Flatlist: React.FC<Props> = ({
  data,
  loading,
  error,
  onEndReached,
  onRefresh,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const renderLoader = () => {
    if (loading) {
      return (
        <View testID="loading" style={commonStyles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return null;
    }
  };
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const filteredData = data.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderMovieItem = (item: Movie) => {
    const {title, release_date, vote_average, poster_path} = item;
    const formatted_date = new Date(release_date).toDateString();
    const ratings = vote_average.toFixed(1) + '/10';
    return (
      <TouchableOpacity
        testID="movieItem"
        activeOpacity={0.8}
        onPress={() =>
          navigationRef?.current?.navigate(Routes.Listing_Details, {
            id: item.id,
          })
        }
        style={styles.movieItemContainer}>
        <Image
          source={{
            uri: `${Strings?.poster_base + poster_path}`,
          }}
          style={styles.image}
        />
        <View style={{flex: 0.65}}>
          <Text style={commonStyles.movieTitle}>{title}</Text>
          <Text style={commonStyles.movieInfo}>
            Release Date: {formatted_date}
          </Text>
          <Text style={commonStyles.movieInfo}>Rating: {ratings}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={commonStyles.container}>
      <MovieSearch setSearchQuery={setSearchQuery} />
      <FlatList
        testID="flatlist"
        data={filteredData}
        renderItem={({item}) => renderMovieItem(item)}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={searchQuery?.length === 0 ? onEndReached : undefined}
        onEndReachedThreshold={0.1}
        refreshing={false}
        onRefresh={onRefresh}
      />
      {renderLoader()}
    </View>
  );
};

const styles = StyleSheet.create({
  movieItemContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderColor: Colors.gray,
  },
  image: {
    width: '100%',
    height: 150,
    marginRight: 10,
    flex: 0.35,
  },
});
