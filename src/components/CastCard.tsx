import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {baseImagePath} from '../api/apicalls';
import {
  FONTFAMILY,
  FONTSIZE,
  COLORS,
  BORDERADIUS,
  SPACING,
} from '../theme/theme';

const CastCard = (props: any) => {
  return (
    <View
      style={
        props.shouldMarginatedAtEnd
          ? props.isFirst
            ? {marginLeft: SPACING.space_24}
            : props.isLast
            ? {marginRight: SPACING.space_24}
            : {}
          : {}
      }>
      <Image
        source={{uri: baseImagePath('w342', props.item?.profile_path)}}
        style={styles.castImage}
      />
      <Text numberOfLines={1} style={styles.nameText}>
        {props.item.name}
      </Text>
    </View>
  );
};

export default CastCard;

const styles = StyleSheet.create({
  castImage: {
    width: 60,
    aspectRatio: 1920 / 2880,
    borderRadius: BORDERADIUS.radius_25 * 4,
  },
  nameText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_8,
    color: COLORS.White,
    width: 60,
    marginTop: SPACING.space_10,
  },
});
