import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {baseImagePath, movieCastDetails, movieDetails} from '../api/apicalls';
import {COLORS, SPACING} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';

const getMovieDetails = async (movieId: number) => {
  try {
    let res = await fetch(movieDetails(movieId));
    let json = await res.json();
    return json;
  } catch (error) {
    console.log('Something wrong with the function getMovieDetails', error);
  }
};

const getCastDetails = async (movieId: number) => {
  try {
    let res = await fetch(movieCastDetails(movieId));
    let json = await res.json();
    return json;
  } catch (error) {
    console.log('Something is wrong with the Function getCastDetails', error);
  }
};
const MovieDetailsScreen = ({navigation, route}: any) => {
  const [movieData, setMovieData] = useState<any>(undefined);
  const [movieCast, setMovieCast] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      let tempMovieData = await getMovieDetails(route.params.movieId);
      setMovieData(tempMovieData);
    })();
    (async () => {
      let tempCastData = await getCastDetails(route.params.movieId);
      setMovieCast(tempCastData);
    })();
  }, []);

  console.log(movieData.backdrop_path);

  if (
    movieData == undefined &&
    movieData == null &&
    movieCast == undefined &&
    movieCast == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <AppHeader name="close" header={'Movie Details'} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View>
        <ImageBackground
          source={{uri: baseImagePath('w780', movieData.backdrop_path)}}
          style={styles.imageBg}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={''}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  imageBg: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
});
