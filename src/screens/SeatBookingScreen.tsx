import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

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

const generateSeats = (): void => {};

const SeatBookingScreen = () => {
  const [dateArr, setDateArr] = useState<{date: number; day: string}[]>(
    generateDate(),
  );
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);
  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();
  return (
    <View>
      <Text>SeatBookingScreen</Text>
    </View>
  );
};

export default SeatBookingScreen;

const styles = StyleSheet.create({});
