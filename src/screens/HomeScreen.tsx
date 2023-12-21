import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SPACING} from '../theme/theme';
import {
  upComingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImagePath,
} from '../api/apicalls';
import {ScrollView} from 'react-native';
import InputHeader from '../components/InputHeader';
import CategroryHeader from '../components/CategroryHeader';
import SubMovieCard from '../components/SubMovieCard';

const {width, height} = Dimensions.get('window');
const getNowPlayingMovieList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.log(
      'Something went wrong in getNowPlayingMovieList Function',
      error,
    );
  }
};

const getUpComingMovieList = async () => {
  try {
    let response = await fetch(upComingMovies);
    let json = await response.json();

    return json;
  } catch (error) {
    console.log('Something went wrong in getUpComingMovieList Function', error);
  }
};

const getPopularMovieList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();

    return json;
  } catch (error) {
    console.log('Something went wrong in getPopularMovieList Function', error);
  }
};

const HomeScreen = ({navigation}: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] =
    useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upComingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);

  console.log(upComingMovies);

  useEffect(() => {
    (async () => {
      let tempNowPlaying = await getNowPlayingMovieList();
      setNowPlayingMoviesList(tempNowPlaying.results);

      let tempPopularMovies = await getPopularMovieList();
      setPopularMoviesList(tempPopularMovies.results);

      let tempUpcomingMovies = await getUpComingMovieList();

      setUpcomingMoviesList(tempUpcomingMovies.results);
    })();
  }, []);
  const searchMoviesFunc = () => {
    navigation.navigate('Search');
  };

  if (
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upComingMoviesList == undefined &&
    upComingMoviesList == undefined
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />
        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunc} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar hidden />
      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunc} />
      </View>
      <CategroryHeader title="Now Playing" />
      <FlatList
        data={nowPlayingMoviesList}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieId: item.id});
            }}
            shouldMarginatedAround={true}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == nowPlayingMoviesList?.length - 1 ? true : false}
            key={index}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
      <CategroryHeader title="Popular" />
      <FlatList
        data={popularMoviesList}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieId: item.id});
            }}
            shouldMarginatedAround={true}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == popularMoviesList?.length - 1 ? true : false}
            key={index}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
      <CategroryHeader title="Upcoming" />
      <FlatList
        data={upComingMoviesList}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieId: item.id});
            }}
            shouldMarginatedAround={true}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upComingMoviesList?.length - 1 ? true : false}
            key={index}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: '100%',
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_15,
  },
});
