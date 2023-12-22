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

const {width, height} = Dimensions.get('window');

const SearchScreen = ({navigation}: any) => {
  const [searchList, setSearchList] = useState<any>(undefined);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <InputHeader />
      <FlatList
        data={searchList}
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
    padding: SPACING.space_24,
  },
});
