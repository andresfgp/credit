import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import CreditItem from './CreditItem';
import TextIn from '../global/input/TextIn';
import CurrencyIn from '../global/input/CurrencyIn';
import Colors from 'credit/src/res/colors';

class CreditScreen extends Component {
  state = {
    creditName: '',
    creditValue: 0,
    monthlyRate: 0,
    loading: false,
  };

  handlePress = coin => {
    this.props.navigation.navigate('CoinDetail', {coin});
  };

  handleInput = (input, state) => {
    this.setState({[state]: input});
  };

  render() {
    const {creditValue, loading} = this.state;

    const credit = [];

    return (
      <View style={styles.container}>
        <Text style={styles.inputText}>Nombre de Credito</Text>
        <TextIn
          state="creditName"
          placeholder="Ingresar nombre"
          onChange={this.handleInput}
        />
        <Text style={styles.inputText}>Valor de crédito</Text>
        <CurrencyIn
          state="creditValue"
          prefix="$"
          placeholder="Ingresar valor"
          onChange={this.handleInput}
        />
        <Text style={styles.inputText}>Tasa de intéres mensual</Text>
        <CurrencyIn
          state="monthlyRate"
          prefix="%"
          placeholder="Ingresar valor"
          onChange={this.handleInput}
        />

        {loading ? (
          <ActivityIndicator style={styles.loader} color="#fff" size="large" />
        ) : null}

        <FlatList
          data={credit}
          renderItem={({item}) => (
            <CreditItem item={item} onPress={() => this.handlePress(item)} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
  },
  inputText: {
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});

export default CreditScreen;
