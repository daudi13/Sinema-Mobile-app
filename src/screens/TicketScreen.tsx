import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  BORDERADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import CustomIcon from '../components/CustomIcon';

const TicketScreen = ({navigation, route}: any) => {
  const [ticketData, setTicketData] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        const ticket = await EncryptedStorage.getItem('ticket');
        if (ticket !== undefined && ticket !== null) {
          setTicketData(JSON.parse(ticket));
        }
      } catch (error) {
        console.error('Something went wrong while getting Data', error);
      }
    })();
  }, []);

  if (ticketData == undefined || ticketData == null) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={'My Tickets'}
            action={() => navigation.goBack()}
          />
        </View>
        <Text>You don't have any Movies booked</Text>
      </View>
    );
  }

  console.log(ticketData);

  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close"
          header={'My Tickets'}
          action={() => navigation.goBack()}
        />
      </View>
      <View style={styles.ticketContainer}>
        <ImageBackground
          source={{uri: ticketData?.ticketImage}}
          style={styles.ticketImageStyle}>
          <LinearGradient
            colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
            style={styles.linearGradient}></LinearGradient>
        </ImageBackground>
        <View style={styles.line}></View>
        <View style={styles.ticketFooter}>
          <View style={styles.ticketDateWrapper}>
            <View style={styles.textWrapper}>
              <Text style={styles.dateTitle}>{ticketData?.date.date}</Text>
              <Text style={styles.dayTitle}>{ticketData?.date.day}</Text>
            </View>
            <View style={styles.textWrapper}>
              <CustomIcon name="clock" style={styles.clockIcon} />
              <Text style={styles.dayTitle}>{ticketData?.time}</Text>
            </View>
          </View>
          <View style={styles.ticketDateWrapper}>
            <View style={styles.subTitleContainer}>
              <Text style={styles.allocation}>Hall</Text>
              <Text style={styles.dayTitle}>02</Text>
            </View>
            <View style={styles.subTitleContainer}>
              <Text style={styles.allocation}>Row</Text>
              <Text style={styles.dayTitle}>04</Text>
            </View>
            <View style={styles.subTitleContainer}>
              <Text style={styles.allocation}>Seats</Text>
              <Text style={styles.dayTitle}>
                {ticketData?.seatArray.map(
                  (item: any, index: any, arr: any) => {
                    return item + (index == arr.length - 1 ? '' : ', ');
                  },
                )}
              </Text>
            </View>
          </View>
          <Image
            source={require('../assets/image/barcode.png')}
            style={styles.barcodeImage}
          />
        </View>
      </View>
      <View style={styles.circleLeft} />
      <View style={styles.circleRight} />
    </ScrollView>
  );
};

export default TicketScreen;

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
  ticketContainer: {
    flex: 1,
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'center',
  },
  ticketImageStyle: {
    alignSelf: 'center',
    width: 300,
    aspectRatio: 200 / 300,
    borderTopLeftRadius: BORDERADIUS.radius_25,
    borderTopRightRadius: BORDERADIUS.radius_25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    height: '70%',
  },
  line: {
    borderTopColor: COLORS.Black,
    borderTopWidth: 2,
    width: 300,
    alignSelf: 'center',
    backgroundColor: COLORS.Orange,
    borderStyle: 'dashed',
  },
  ticketFooter: {
    position: 'relative',
    backgroundColor: COLORS.Orange,
    width: 300,
    alignSelf: 'center',
    paddingBottom: SPACING.space_36,
    borderBottomLeftRadius: BORDERADIUS.radius_25,
    borderBottomRightRadius: BORDERADIUS.radius_25,
  },
  ticketDateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
    marginTop: SPACING.space_10,
  },
  textWrapper: {
    alignItems: 'center',
    gap: 10,
  },
  subTitleContainer: {
    alignItems: 'center',
  },
  clockIcon: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
    lineHeight: 40,
  },
  dateTitle: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
  },
  dayTitle: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
  barcodeImage: {
    alignSelf: 'center',
    marginTop: 10,
  },
  allocation: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
  },
  circleLeft: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: COLORS.Black,
    left: 24,
    borderRadius: 50,
    top: '64.5%',
  },
  circleRight: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: COLORS.Black,
    right: 24,
    top: '64.5%',
    borderRadius: 50,
  },
});
