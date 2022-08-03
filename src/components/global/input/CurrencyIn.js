import React from 'react';
import {Platform, View, StyleSheet} from 'react-native';
import Colors from 'credit/src/res/colors';
import CurrencyInput from 'react-native-currency-input';

function CurrencyIn(props) {
  const {placeholder, state, prefix} = props;
  const [value, setValue] = React.useState(0); // can also be null

  const handleText = input => {
    if (props.onChange) {
      props.onChange(input, state);
    }
  };

  return (
    <View>
      <CurrencyInput
        // eslint-disable-next-line no-sparse-arrays
        style={[
          styles.textInput,
          Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid,
          ,
        ]}
        value={value}
        onChangeValue={setValue}
        prefix={prefix}
        delimiter=","
        separator="."
        precision={2}
        placeholder={placeholder}
        placeholderTextColor="#fff"
        onChangeText={handleText}
      />
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
});

export default CurrencyIn;
