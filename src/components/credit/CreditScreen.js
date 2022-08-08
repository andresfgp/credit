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
import DateIn from '../global/input/DateIn';
import CurrencyIn from '../global/input/CurrencyIn';
import Colors from 'credit/src/res/colors';
import {Stack, Button} from '@react-native-material/core';
class CreditScreen extends Component {
  state = {
    creditName: '',
    creditValue: 0,
    monthlyRate: 0,
    creditTerm: 0,
    startDateCredit: '',
    loading: false,
  };

  handlePress = coin => {
    this.props.navigation.navigate('CoinDetail', {coin});
  };

  handleInput = (input, state) => {
    this.setState({[state]: input});
  };

  save = () => {
    console.log('state', this.state);
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
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.inputText}>Valor de crédito</Text>
            <CurrencyIn
              state="creditValue"
              prefix="$"
              precision={2}
              maxValue={1000000000}
              delimiter=","
              placeholder="Ingresar valor"
              onChange={this.handleInput}
            />
          </View>
          <View style={styles.col}>
            <Text style={styles.inputText}>Tasa de intéres mensual</Text>
            <CurrencyIn
              state="monthlyRate"
              prefix="%"
              precision={1}
              maxValue={100}
              delimiter=","
              placeholder="Ingresar valor"
              onChange={this.handleInput}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.inputText}>Plazo del crédito en meses</Text>
            <CurrencyIn
              state="creditTerm"
              precision={0}
              maxValue={1000}
              delimiter=""
              placeholder="Ingresar valor"
              onChange={this.handleInput}
            />
          </View>
          <View style={styles.col}>
            <Text style={styles.inputText}>Fecha inicio crédito</Text>
            <DateIn
              state="startDateCredit"
              placeholder="Ingresar date"
              onChange={this.handleInput}
            />
          </View>
        </View>

        <Stack fill center spacing={4}>
          <Button title="Save" onPress={this.save} />
        </Stack>

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
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
    width: '50%',
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
