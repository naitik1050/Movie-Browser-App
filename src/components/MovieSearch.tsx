import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Colors} from '../helper/colors';

interface Props {
  setSearchQuery: (query: string) => void;
}

const MovieSearch: React.FC<Props> = ({setSearchQuery}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 5,
    padding: 10,
  },
});

export default MovieSearch;
