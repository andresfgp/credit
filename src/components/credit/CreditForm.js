/* eslint-disable no-undef */
import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Stack, Button} from '@react-native-material/core';
import GlobalInputText from '../global/input/Text';
import GlobalInputDate from '../global/input/Date';
import GlobalInputCurrency from '../global/input/Currency';
import Formulas from '../../res/formulas';
import uuid from 'react-native-uuid';
import store from '../../res/store';

const CreditForm = ({item}) => {
  const [credit, setCredit] = React.useState([]);
  const [newCredit, setNewCredit] = React.useState(true);
  const [loading, setLoading] = React.useState();

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
      creditAmount: 0,
      interestRate: 0,
      creditTerm: 0,
      startDateCredit: new Date(),
      loading: false,
      id: uuid.v4(),
    },
  });
  const onSubmit = async data => {
    setCredit([]);
    const creditTerm = Number(data.creditTerm);
    const pv = Number(data.creditAmount.replace(/[^0-9.-]+/g, ''));
    const rate = Number(data.interestRate.replace(/[^0-9.-]+/g, '') / 100);
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
    const setStore = await {...data, credit};
    store.addStore(setStore, 'credit', data.id);
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
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}>
      {newCredit && (
        <>
          <Text style={styles.inputText}>Credit Name *</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange}}) => (
              <GlobalInputText
                placeholder="Enter Name"
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
          <Text style={styles.inputText}>Credit Amount *</Text>
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
                error={errors.creditAmount}
              />
            )}
            name="creditAmount"
          />
        </View>
        <View style={styles.col}>
          <Text style={styles.inputText}>Interest Rate *</Text>
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
                error={errors.interestRate}
              />
            )}
            name="interestRate"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.inputText}>Credit term (Months) *</Text>
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
                placeholder="Enter Months"
                onChange={onChange}
                error={errors.creditTerm}
              />
            )}
            name="creditTerm"
          />
        </View>
        <View style={styles.col}>
          <Text style={styles.inputText}>Start Date Credit</Text>
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
            title="New"
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
  );
};

const styles = StyleSheet.create({
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

export default CreditForm;
