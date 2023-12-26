import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {baseImagePath, movieCastDetails, movieDetails} from '../api/apicalls';
import {
  BORDERADIUS,
  COLORS,
  FONTSIZE,
  SPACING,
  FONTFAMILY,
} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import {genreName} from '../extraFunc/extraFunc';
import CategroryHeader from '../components/CategroryHeader';
import CastCard from '../components/CastCard';

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
      setMovieCast(tempCastData.cast);
    })();
  }, []);

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
        <View style={styles.appHeaderContainer}>
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
          source={{uri: baseImagePath('w780', movieData?.backdrop_path)}}
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
        <View style={styles.imageBg}></View>
        <Image
          source={{uri: baseImagePath('w342', movieData?.poster_path)}}
          style={styles.cardImage}
        />
      </View>
      <View style={styles.movieRuntime}>
        <CustomIcon name="clock" style={styles.timeIcon} />
        <Text style={styles.timeText}>
          {Math.floor(movieData?.runtime / 60)}h {movieData?.runtime % 60}m
        </Text>
      </View>
      <Text numberOfLines={1} style={styles.textTitle}>
        {movieData?.title}
      </Text>
      <View style={styles.genreContainer}>
        {movieData?.genres.map((item: any) => (
          <Text style={styles.genreItem} key={item.id}>
            {item.name}
          </Text>
        ))}
      </View>
      <Text style={styles.tagline}>{movieData?.tagline}</Text>
      <View style={styles.metaData}>
        <View style={styles.rate}>
          <CustomIcon name="star" style={styles.rateIcon} />
          <Text style={styles.rateNumbers}>
            {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
          </Text>
        </View>
        <Text style={styles.releaseDate}>{movieData?.release_date}</Text>
      </View>
      <Text style={styles.overview}>{movieData?.overview}</Text>
      <View style={styles.topCastContainer}>
        <CategroryHeader title="Top Cast" />
        <FlatList
          data={movieCast?.slice(1, 12)}
          horizontal
          keyExtractor={item => item.id}
          contentContainerStyle={styles.containerGap20}
          renderItem={({item, index}) => (
            <CastCard
              key={item.id}
              item={item}
              shouldMarginatedAtEnd={true}
              isFirst={index == 0}
              isLast={index == movieCast.slice(1, 7).length - 1}
            />
          )}
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.selectSeatBtn}
            onPress={() => navigation.push('SeatBooking')}>
            <Text style={styles.btnColor}>Select Seat</Text>
          </TouchableOpacity>
        </View>
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
  cardImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    borderRadius: BORDERADIUS.radius_15,
  },
  movieRuntime: {
    marginTop: SPACING.space_10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_10,
    flex: 1,
    justifyContent: 'center',
  },
  timeIcon: {
    color: COLORS.whiteRGBA15,
    fontSize: FONTSIZE.size_18,
  },
  timeText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
  },
  textTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
    textAlign: 'center',
    paddingVertical: SPACING.space_10,
  },
  genreContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreItem: {
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_15,
    borderWidth: SPACING.space_2 - 1,
    borderColor: COLORS.whiteRGBA50,
    borderRadius: BORDERADIUS.radius_10,
    color: COLORS.whiteRGBA50,
    fontSize: FONTSIZE.size_10,
  },
  tagline: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.whiteRGBA32,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    marginTop: SPACING.space_10,
    marginBottom: SPACING.space_15,
  },
  metaData: {
    flex: 1,
    paddingHorizontal: SPACING.space_24 - 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rate: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'left',
  },
  rateIcon: {
    color: COLORS.Yellow,
  },
  rateNumbers: {
    color: COLORS.White,
  },
  releaseDate: {
    color: COLORS.White,
    width: '60%',
  },
  overview: {
    flex: 1,
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    marginVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_24 - 1,
    lineHeight: SPACING.space_20,
  },
  topCastContainer: {},
  containerGap20: {
    gap: SPACING.space_12 * 2.5,
  },
  btnContainer: {
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  selectSeatBtn: {
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_24 + 1,
    backgroundColor: COLORS.Orange,
    width: 125,
    textAlign: 'center',
    borderRadius: BORDERADIUS.radius_20 - 0.5,
  },
  btnColor: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
  },
});
