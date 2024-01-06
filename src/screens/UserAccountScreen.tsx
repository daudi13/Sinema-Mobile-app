import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
  optionsData,
} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import SettingsOption from '../components/settingsOption';

const UserAccountScreen = ({navigation}: any) => {
  return (
    <ScrollView bounces={false} style={styles.container}>
      <View style={styles.appHeaderContainer}>
        <AppHeader
          header={'My Profile'}
          name="close"
          action={() => navigation.goBack()}
        />
      </View>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={require('../assets/image/avatar.png')}
        />
        <Text style={styles.profileName}>David Ouma</Text>
      </View>
      <View style={styles.options}>
        {optionsData.map((item: any, index: any) => {
          return (
            <SettingsOption
              key={index}
              title={item.title}
              subOne={item.subOne}
              icon={item.icon}
              subTwo={item.subTwo}
              link={item.link}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default UserAccountScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_24,
    marginTop: SPACING.space_20 * 2,
  },
  profile: {
    marginVertical: SPACING.space_36 * 1.5,
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  profileName: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    marginTop: SPACING.space_12,
  },
  options: {
    flex: 1,
    marginHorizontal: 34,
    gap: 44,
  },
});
