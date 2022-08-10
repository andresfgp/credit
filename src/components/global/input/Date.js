import React from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {LogBox} from 'react-native';

function GlobalInputDate(props) {
  const {error} = props;

  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));

  React.useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <DatePicker
          style={styles.datePickerStyle}
          date={date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="DD-MM-YYYY"
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
            dateInput: error
              ? {
                  marginLeft: 36,
                  height: 46,
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderWidth: 2,
                  borderColor: 'red',
                  borderRadius: 8,
                }
              : {
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
            props.onChange(date);
          }}
        />
        {error && <Text style={styles.error}>This is required.</Text>}
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
  error: {
    paddingTop: 12,
    paddingLeft: 16,
    color: 'red',
  },
});

export default GlobalInputDate;
