import React from 'react';
import {View, StyleSheet, TextInput, Platform, Image} from 'react-native';
import Colors from 'credit/src/res/colors';

function GlobalInputDate(props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('credit/src/assets/calendar.png')}
      />
      <TextInput
        // eslint-disable-next-line no-sparse-arrays
        style={[
          styles.textInput,
          Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        editable={false}
        disabled={true}
        placeholder={new Date().toISOString().slice(0, 10)}
        placeholderTextColor="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 20,
    height: 20,
  },
  textInput: {
    height: 46,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingLeft: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
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

export default GlobalInputDate;
