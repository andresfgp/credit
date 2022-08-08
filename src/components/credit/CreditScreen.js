import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import CreditItem from './CreditItem';
import TextIn from '../global/input/TextIn';
import DateIn from '../global/input/DateIn';
import CurrencyIn from '../global/input/CurrencyIn';
import Colors from 'credit/src/res/colors';
import {Stack, Button} from '@react-native-material/core';
import {useForm, Controller} from 'react-hook-form';

function CreditScreen(props) {
  const handlePress = coin => {
    props.navigation.navigate('CoinDetail', {coin});
  };

  const credit = [];

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      creditName: '',
      creditValue: 0,
      monthlyRate: 0,
      creditTerm: 0,
      startDateCredit: new Date().toISOString().slice(0, 10),
      loading: false,
    },
  });
  const onSubmit = data => console.log(data);

  return (
    <View style={styles.container}>
      <Text style={styles.inputText}>Nombre de Credito *</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange}}) => (
          <TextIn
            placeholder="Ingresar nombre crédito"
            onChange={onChange}
            error={errors.creditName}
          />
        )}
        name="creditName"
      />

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.inputText}>Valor de crédito</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange}}) => (
              <CurrencyIn
                prefix="$"
                precision={2}
                maxValue={1000000000}
                delimiter=","
                placeholder="$0.00"
                onChange={onChange}
                error={errors.creditValue}
              />
            )}
            name="creditValue"
          />
        </View>
        <View style={styles.col}>
          <Text style={styles.inputText}>Tasa de intéres mensual</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange}}) => (
              <CurrencyIn
                prefix="%"
                precision={1}
                maxValue={100}
                delimiter=","
                placeholder="%0.0"
                onChange={onChange}
                error={errors.monthlyRate}
              />
            )}
            name="monthlyRate"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.inputText}>Plazo del crédito en meses</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange}}) => (
              <CurrencyIn
                state="creditTerm"
                precision={0}
                maxValue={1000}
                delimiter=""
                placeholder="Ingresar valor"
                onChange={onChange}
                error={errors.creditTerm}
              />
            )}
            name="creditTerm"
          />
        </View>
        <View style={styles.col}>
          <Text style={styles.inputText}>Fecha inicio crédito</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange}}) => (
              <DateIn onChange={onChange} error={errors.startDateCredit} />
            )}
            name="startDateCredit"
          />
        </View>
      </View>

      <Stack fill center spacing={4}>
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </Stack>

      <FlatList
        data={credit}
        renderItem={({item}) => (
          <CreditItem item={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
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
