import * as React from 'react';
import {View, Text, ActivityIndicator, Image, StyleSheet} from 'react-native';
import useFetch from '../../hooks/useFetch';
import Strings from '../../helper/strings';
import commonStyles from '../../helper/styles';
import {Colors} from '../../helper/colors';

interface MovieData {
  poster_path: string;
  title: string;
  tagline: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export function ListingDetails({route}: any) {
  const {id} = route.params;
  const {fetchData, data, loading, error} = useFetch();

  React.useEffect(() => {
    fetchData(`movie/${id}`);
  }, [id]);

  const renderLoader = () => {
    if (loading) {
      return (
        <View style={commonStyles.loaderContainer}>
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

  const {poster_path, title, tagline, overview, release_date, vote_average} =
    data as unknown as MovieData;

  return (
    <View style={commonStyles.container}>
      <View style={styles.mainWrapper}>
        <Image
          source={{uri: Strings.poster_base + poster_path}}
          style={styles.poster}
        />
        <Text style={commonStyles.movieTitle}>
          {title} {'\n'}
          <Text style={commonStyles.movieInfo}>{tagline}</Text>
        </Text>
        <Text style={commonStyles.movieInfo}>{overview}</Text>
        <Text style={commonStyles.movieInfo}>Release Date: {release_date}</Text>
        <Text style={commonStyles.movieInfo}>Ratinvswswg: {vote_average?.toFixed(1) + '/10'}</Text>
      </View>
      {renderLoader()}
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    borderWidth: 1,
    borderColor: Colors.gray,
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  poster: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
});
