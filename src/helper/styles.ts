import {StyleSheet} from 'react-native';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },

  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 3,
  },
  movieInfo: {
    fontSize: 14,
    marginVertical: 3,
  },
});

export default commonStyles;
