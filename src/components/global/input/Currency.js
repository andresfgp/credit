import React from 'react';
import {Platform, View, StyleSheet, Text} from 'react-native';
import Colors from 'credit/src/res/colors';
import CurrencyInput from 'react-native-currency-input';

function GlobalInputCurrency(props) {
  const {placeholder, prefix, precision, delimiter, maxValue, error} = props;
  const [value, setValue] = React.useState(null); // can also be null

  const handleText = input => {
    if (props.onChange) {
      props.onChange(input);
    }
  };

  return (
    <View>
      <CurrencyInput
        // eslint-disable-next-line no-sparse-arrays
        style={[
          error ? styles.errorInput : styles.textInput,
          Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid,
          ,
        ]}
        value={value}
        onChangeValue={setValue}
        prefix={prefix}
        delimiter={delimiter}
        maxValue={maxValue}
        separator="."
        precision={precision}
        placeholder={placeholder}
        placeholderTextColor="#fff"
        onChangeText={handleText}
      />
      {error && <Text style={styles.error}>This is required.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingLeft: 16,
    color: '#fff',
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
  error: {
    paddingLeft: 16,
    color: 'red',
  },
  errorInput: {
    height: 46,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingLeft: 16,
    color: '#fff',
    borderColor: 'red',
    borderWidth: 2,
  },
});

export default GlobalInputCurrency;
