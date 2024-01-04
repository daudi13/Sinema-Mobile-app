import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import CustomIcon from '../components/CustomIcon';

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
        <TouchableOpacity style={styles.optionsBox}>
          <CustomIcon name="user" style={styles.iconStyle} />
          <View style={styles.desc}>
            <Text style={styles.title}>Account</Text>
            <Text style={styles.subTitle}>Edit Profile</Text>
            <Text style={styles.subTitle}>Change Password</Text>
          </View>
          <CustomIcon name="arrow-right" style={styles.iconStyleLast} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionsBox}>
          <CustomIcon name="setting" style={styles.iconStyle} />
          <View style={styles.desc}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subTitle}>Themes</Text>
            <Text style={styles.subTitle}>Permissions</Text>
          </View>
          <CustomIcon name="arrow-right" style={styles.iconStyleLast} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionsBox}>
          <CustomIcon name="dollar" style={styles.iconStyle} />
          <View style={styles.desc}>
            <Text style={styles.title}>Offers & Referrals</Text>
            <Text style={styles.subTitle}>Offers</Text>
            <Text style={styles.subTitle}>Referrals</Text>
          </View>
          <CustomIcon name="arrow-right" style={styles.iconStyleLast} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionsBox}>
          <CustomIcon name="info" style={styles.iconStyle} />
          <View style={styles.desc}>
            <Text style={styles.title}>About</Text>
            <Text style={styles.subTitle}>About Movies</Text>
            <Text style={styles.subTitle}>More</Text>
          </View>
          <CustomIcon name="arrow-right" style={styles.iconStyleLast} />
        </TouchableOpacity>
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
