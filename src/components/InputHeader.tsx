import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  BORDERADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

const InputHeader = (props: any) => {
  const [searchText, setSearchText] = useState<string>('');
  return (
    <View style={styles.InputBox}>
      <TextInput
        style={styles.textInput}
        onChangeText={textInput => setSearchText(textInput)}
        value={searchText}
        placeholder="Search your Movies..."
        placeholderTextColor={COLORS.whiteRGBA32}
      />
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={async () => await props.searchFunction(searchText)}>
        <CustomIcon
          name="search"
          color={COLORS.Orange}
          size={FONTSIZE.size_20}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  InputBox: {
    display: 'flex',
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_24,
    borderWidth: 2,
    borderColor: COLORS.whiteRGBA15,
    borderRadius: BORDERADIUS.radius_25,
    flexDirection: 'row',
  },
  textInput: {
    fontFamily: FONTFAMILY.poppins_regular,
    width: '90%',
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_10,
  },
});
export default InputHeader;
