/* eslint-disable no-bitwise */
import React from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';
import GlobalInputText from '../global/input/Text';
import GlobalInputDate from '../global/input/Date';
import GlobalInputCurrency from '../global/input/Currency';
import Colors from 'credit/src/res/colors';
import {Stack, Button} from '@react-native-material/core';
import {useForm, Controller} from 'react-hook-form';
import GlobalTable from '../global/table/table';
import Formulas from '../../res/formulas';

function CreditScreen(props) {
  const [credit, setCredit] = React.useState([]);
  const [loading, setLoading] = React.useState();
  const [newCredit, setNewCredit] = React.useState(true);
  const tableHead = ['#', 'Intereses', 'Abono capital', 'Saldo credito'];
  const widthArr = [
    parseFloat('30%'),
    parseFloat('100%'),
    parseFloat('100%'),
    parseFloat('120%'),
  ];
  const state = {tableHead, widthArr};

  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
  }, [fadeAnim]);

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
      startDateCredit: new Date(),
      loading: false,
    },
  });
  const onSubmit = async data => {
    setCredit([]);
    const creditTerm = Number(data.creditTerm);
    const pv = Number(data.creditValue.replace(/[^0-9.-]+/g, ''));
    const rate = Number(data.monthlyRate.replace(/[^0-9.-]+/g, '') / 100);
    const nper = Number(data.creditTerm);
    const fv = 0;
    const type = 0;
    const arrayPPMT = [];

    const pmt = Formulas.PMT(rate, nper, pv, fv, type).toFixed(2);
    for (let per = 0; per < creditTerm; per++) {
      const ipmt = Formulas.IPMT(pv, pmt, rate, per);
      const ppmt = Formulas.PPMT(rate, per + 1, nper, pv, 0, 0);
      arrayPPMT.push(ppmt);
      const creditTotal = pv + reduceSum(arrayPPMT);
      const date = new Date(data.startDateCredit);
      date.setMonth(date.getMonth() + per);
      const table = [
        per + 1,
        convertToCurrency(ipmt),
        convertToCurrency(ppmt),
        convertToCurrency(creditTotal),
      ];
      setCredit(oldCredit => [...oldCredit, table]);
      if (per === creditTerm - 1) {
        setNewCredit(false);
        setLoading(false);
      }
    }
  };

  const convertToCurrency = number => {
    return Math.abs(number.toFixed(2)).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const reduceSum = array => {
    const initialValue = 0;
    return array.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue,
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}>
        {newCredit && (
          <>
            <Text style={styles.inputText}>Nombre de Credito *</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange}}) => (
                <GlobalInputText
                  placeholder="Ingresar nombre crédito"
                  onChange={onChange}
                  error={errors.creditName}
                />
              )}
              name="creditName"
            />
          </>
        )}
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.inputText}>Valor de crédito *</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange}}) => (
                <GlobalInputCurrency
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
            <Text style={styles.inputText}>Tasa de intéres mensual *</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange}}) => (
                <GlobalInputCurrency
                  prefix="%"
                  precision={2}
                  maxValue={100}
                  delimiter=","
                  placeholder="%0.00"
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
            <Text style={styles.inputText}>Plazo crédito en meses *</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange}}) => (
                <GlobalInputCurrency
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
                <GlobalInputDate
                  onChange={onChange}
                  error={errors.startDateCredit}
                />
              )}
              name="startDateCredit"
            />
          </View>
        </View>
        <Stack center direction="row" spacing={20}>
          {!newCredit && (
            <Button
              style={styles.btn}
              title="Nuevo"
              onPress={() => setNewCredit(true)}
            />
          )}
          <Button
            style={styles.btn}
            title="Save"
            loading={loading}
            loadingIndicatorPosition="overlay"
            onPress={handleSubmit(onSubmit)}
          />
        </Stack>
      </Animated.View>
      {!newCredit && (
        <GlobalTable style={styles.table} state={state} tableData={credit} />
      )}
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
    fontWeight: 'bold',
  },
  table: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
    width: '50%',
  },
  btn: {
    marginTop: 16,
  },
  loader: {
    marginTop: 60,
  },
});

export default CreditScreen;
