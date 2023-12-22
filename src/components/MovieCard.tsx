import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {
  BORDERADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

const MovieCard = (props: any) => {
  const genreName = (genres: any) => {
    const genreArr = props.genreList;
    let arr = [];
    for (let i = 0; i < genres.length; i++) {
      for (let j = 0; j < genreArr?.length; j++) {
        if (genres[i] === genreArr[j].id) {
          arr.push(genreArr[j].name);
        }
      }
    }
    return arr;
  };

  genreName(props.genreId);
  return (
    <TouchableOpacity onPress={props.cardFunction}>
      <View
        style={[
          styles.container,
          props.shouldMarginatedAtEnd
            ? props.isFirst
              ? {marginLeft: SPACING.space_36}
              : props.isLast
              ? {marginRight: SPACING.space_36}
              : {}
            : {},
          props.shouldMarginatedAround ? {margin: SPACING.space_12} : {},
          {maxWidth: props.cardWidth},
        ]}>
        <Image
          style={[styles.cardImage, {width: props.cardWidth}]}
          source={{uri: props.imagePath}}
        />
        <View style={styles.rateContainer}>
          <CustomIcon name="star" style={styles.starIcon} />
          <Text style={styles.voteText}>
            {props.vote_average.toFixed(1)} ({props.vote_count})
          </Text>
        </View>
        <Text numberOfLines={1} style={styles.textTitle}>
          {props.title}
        </Text>
        <View style={styles.genreContainer}>
          {genreName(props.genreId)
            .slice(1, 4)
            .map((item: any, index: any) => (
              <Text style={styles.genreItem} key={index}>
                {item}
              </Text>
            ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: BORDERADIUS.radius_20,
  },
  textTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
    textAlign: 'center',
    paddingVertical: SPACING.space_10,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.space_20,
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },
  voteText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
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
});
