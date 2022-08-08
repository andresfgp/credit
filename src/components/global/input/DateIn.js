import React from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import DatePicker from 'react-native-datepicker';

function DateIn(props) {
  const {placeholder, state, prefix} = props;
  const [date, setDate] = React.useState('09-10-2020');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <DatePicker
          style={styles.datePickerStyle}
          date={date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              // display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
              height: 46,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderWidth: 0,
              borderRadius: 8,
            },
            dateText: {
              color: '#fff',
            },
          }}
          onDateChange={date => {
            setDate(date);
            props.onChange(date, state);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  datePickerStyle: {
    width: '95%',
    paddingLeft: 16,
    paddingTop: 10,
  },
});

export default DateIn;
