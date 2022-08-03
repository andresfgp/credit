import React, {Component} from 'react';
import {TextInput, Platform, View, StyleSheet} from 'react-native';
import Colors from 'credit/src/res/colors';

class TextIn extends Component {
  state = {
    input: '',
  };

  handleText = input => {
    const {state} = this.props;
    this.setState({input});

    if (this.props.onChange) {
      this.props.onChange(input, state);
    }
  };

  render() {
    const {input} = this.state;
    const {placeholder} = this.props;

    return (
      <View>
        <TextInput
          // eslint-disable-next-line no-sparse-arrays
          style={[
            styles.textInput,
            Platform.OS === 'ios'
              ? styles.textInputIOS
              : styles.textInputAndroid,
            ,
          ]}
          onChangeText={this.handleText}
          value={input}
          placeholder={placeholder}
          placeholderTextColor="#fff"
        />
      </View>
    );
  }
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

export default TextIn;
