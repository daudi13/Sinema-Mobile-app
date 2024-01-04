import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';
import {FONTSIZE, COLORS, FONTFAMILY, SPACING} from '../theme/theme';

const AppHeader = (props: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.IconBg} onPress={props.action}>
        <CustomIcon name={props.name} style={styles.iconStyles} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{props.header}</Text>
      <View style={styles.emptyContainer}></View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyles: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
  },
  headerText: {
    flex: 1,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
    textAlign: 'center',
    color: COLORS.White,
  },
  emptyContainer: {
    height: SPACING.space_20,
    width: SPACING.space_15,
  },
  IconBg: {
    width: SPACING.space_20 * 2,
    height: SPACING.space_20 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SPACING.space_20,
    backgroundColor: COLORS.Orange,
  },
});
