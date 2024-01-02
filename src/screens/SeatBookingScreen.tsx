import {
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  BORDERADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import CustomIcon from '../components/CustomIcon';

const timeArray: string[] = [
  '10.30',
  '12.30',
  '14.30',
  '15.30',
  '19.30',
  '21.30',
];

const generateDate = (): {date: number; day: string}[] => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

const generateSeats = () => {
  let numRow = 8;
  let numColumn = 3;
  let rowArray = [];
  let start = 1;
  let reachNine = false;

  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let j = 0; j < numColumn; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObject);
      start++;
    }
    if (i === 3) {
      numColumn += 2;
    }
    if (numColumn < 9 && !reachNine) {
      numColumn += 2;
    } else {
      reachNine = true;
      numColumn -= 2;
    }

    rowArray.push(columnArray);
  }
  return rowArray;
};

const SeatBookingScreen = ({navigation, route}: any) => {
  const [dateArr, setDateArr] = useState<any[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);
  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();

  const selectedSeat = (index: number, subIndex: number, num: number) => {
    if (!twoDSeatArray[index][subIndex].taken) {
      let array: any = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subIndex].selected = !temp[index][subIndex].selected;

      if (!array.includes(num)) {
        array.push(num);
        setSelectedSeatArray(array);
      } else {
        const tempIndex = array.indexOf(num);
        if (tempIndex > -1) {
          array.splice(tempIndex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 5.0);
      setTwoDSeatArray(temp);
    }
  };

  console.log(JSON.stringify(twoDSeatArray, null, 2));
  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View>
        <ImageBackground
          source={{uri: route.params?.bgImage}}
          style={styles.ImageBg}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={''}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.screenText}>Screen this side</Text>
      </View>
      <View style={styles.seatContainer}>
        <View style={styles.containerGap20}>
          {twoDSeatArray?.map((item, index) => (
            <View key={index} style={styles.seatRow}>
              {item?.map((subItem, subIndex) => {
                return (
                  <TouchableOpacity
                    key={subItem.number}
                    onPress={() => {
                      selectedSeat(index, subIndex, subItem.number);
                    }}>
                    <CustomIcon
                      name="seat"
                      style={[
                        styles.seatIcon,
                        subItem.taken ? styles.seatTaken : {},
                        subItem.selected ? styles.seatSelected : {},
                      ]}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>
      <View style={styles.seatRadioContainer}>
        <View style={styles.radioContainer}>
          <CustomIcon
            name="radio"
            style={[styles.radioIcon, styles.radioIconWhite]}
          />
          <Text style={styles.radioIconText}>Available</Text>
        </View>
        <View style={styles.radioContainer}>
          <CustomIcon
            name="radio"
            style={[styles.radioIcon, styles.radioIconGrey]}
          />
          <Text style={styles.radioIconText}>Taken</Text>
        </View>
        <View style={styles.radioContainer}>
          <CustomIcon
            name="radio"
            style={[styles.radioIcon, styles.radioIconOrange]}
          />
          <Text style={styles.radioIconText}>Selected seat</Text>
        </View>
      </View>
      <View style={styles.datesWrapper}>
        <FlatList
          data={dateArr}
          keyExtractor={item => item.date}
          horizontal
          contentContainerStyle={styles.containerGap24}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
                <View
                  style={[
                    styles.dateContainer,
                    index == 0
                      ? {marginLeft: SPACING.space_24}
                      : index == dateArr.length - 1
                      ? {marginRight: SPACING.space_24}
                      : {},
                    index == selectedDateIndex
                      ? {backgroundColor: COLORS.Orange}
                      : {},
                  ]}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.dayText}>{item.day}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View>
        <FlatList
          data={timeArray}
          keyExtractor={item => item}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
                <View
                  style={[
                    styles.timeContainer,
                    index == 0
                      ? {marginLeft: SPACING.space_24}
                      : index == dateArr.length - 1
                      ? {marginRight: SPACING.space_24}
                      : {},
                    index == selectedTimeIndex
                      ? {backgroundColor: COLORS.Orange}
                      : {},
                  ]}>
                  <Text style={styles.timeText}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default SeatBookingScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  ImageBg: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_24,
    marginTop: SPACING.space_20 * 2,
  },
  screenText: {
    textAlign: 'center',
    color: COLORS.whiteRGBA15,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
  },
  seatContainer: {
    marginVertical: SPACING.space_15,
  },
  containerGap20: {
    gap: SPACING.space_15,
  },
  seatRow: {
    flexDirection: 'row',
    gap: SPACING.space_15,
    justifyContent: 'center',
  },
  seatIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  seatTaken: {
    color: COLORS.whiteRGBA15,
  },
  seatSelected: {
    color: COLORS.Orange,
  },
  seatRadioContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: SPACING.space_28,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_4,
    justifyContent: 'center',
  },
  radioIcon: {
    fontSize: FONTSIZE.size_18,
  },
  radioIconText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
  },
  radioIconWhite: {
    color: COLORS.White,
  },
  radioIconGrey: {
    color: COLORS.whiteRGBA15,
  },
  radioIconOrange: {
    color: COLORS.Orange,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  datesWrapper: {
    marginVertical: SPACING.space_32,
  },
  dateContainer: {
    width: SPACING.space_10 * 7,
    height: SPACING.space_10 * 10,
    borderRadius: BORDERADIUS.radius_10 * 10,
    backgroundColor: COLORS.Grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_30,
  },
  dayText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  timeContainer: {
    height: SPACING.space_32 + 5,
    width: SPACING.space_36 * 2 + 6,
    backgroundColor: COLORS.Grey,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.White,
    borderWidth: 1,
    borderRadius: BORDERADIUS.radius_25 + 6,
  },
  timeText: {
    color: COLORS.White,
  },
});
