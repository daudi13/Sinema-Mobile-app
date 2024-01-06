import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomIcon from '../components/CustomIcon';
import {COLORS, FONTSIZE, FONTFAMILY} from '../theme/theme';

const SettingsOption = (props: any) => {
  return (
    <TouchableOpacity style={styles.optionsBox}>
      <CustomIcon name={props.icon} style={styles.iconStyle} />
      <View style={styles.desc}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subTitle}>{props.subOne}</Text>
        <Text style={styles.subTitle}>{props.subTwo}</Text>
      </View>
      <CustomIcon name="arrow-right" style={styles.iconStyleLast} />
    </TouchableOpacity>
  );
};

export default SettingsOption;

const styles = StyleSheet.create({
  optionsBox: {
    flexDirection: 'row',
    gap: 25,
  },
  iconStyle: {
    marginTop: 8,
    color: COLORS.White,
    fontSize: 25,
    fontWeight: 'bold',
  },
  iconStyleLast: {
    alignSelf: 'center',
    color: COLORS.White,
    fontSize: 25,
    fontWeight: 'bold',
  },
  desc: {
    flex: 1,
  },
  title: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  subTitle: {
    color: COLORS.whiteRGBA15,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
  },
});
