import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import {useState} from 'react';
import React from 'react';
import {COLORS, SPACING} from '../theme/theme';
import InputHeader from '../components/InputHeader';
import SubMovieCard from '../components/SubMovieCard';
import {searchMovies, baseImagePath} from '../api/apicalls';

const {width, height} = Dimensions.get('window');

const SearchScreen = ({navigation}: any) => {
  const [searchList, setSearchList] = useState([]);

  const searchFunction = async (name: string) => {
    try {
      let res = await fetch(searchMovies(name));
      let json = await res.json();
      setSearchList(json.results);
    } catch (error) {
      console.log('Something went wrong with searchMovie function', error);
    }
  };

  console.log(searchFunction('avengers'));
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View>
        <FlatList
          data={searchList}
          keyExtractor={(item: any) => item.id}
          numColumns={2}
          ListHeaderComponent={
            <View style={styles.InputHeaderContainer}>
              <InputHeader searchFunction={searchFunction} />
            </View>
          }
          contentContainerStyle={styles.centerContainer}
          renderItem={({item, index}) => (
            <SubMovieCard
              shouldMarginatedAtEnd={false}
              cardFunction={() => {
                navigation.push('MovieDetails', {movieId: item.id});
              }}
              shouldMarginatedAround={true}
              cardWidth={width / 2 - SPACING.space_12}
              key={index}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width: width,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
  },
  InputHeaderContainer: {
    display: 'flex',
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  centerContainer: {
    alignItems: 'center',
  },
});
