/* eslint-disable no-bitwise */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import GlobalInputText from '../global/input/Text';
import GlobalInputDate from '../global/input/Date';
import GlobalInputCurrency from '../global/input/Currency';
import Colors from 'credit/src/res/colors';
import {Stack, Button} from '@react-native-material/core';
import {useForm, Controller} from 'react-hook-form';
import GlobalTable from '../global/table/table';

function CreditScreen(props) {
  const [credit, setCredit] = React.useState([]);
  const tableHead = ['Couta', 'Intereses', 'Head3', 'Head4'];

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
  const onSubmit = async data => {
    setCredit([]);
    console.log(data.creditValue.slice(1, -1), data.monthlyRate);
    const creditTerm = Number(data.creditTerm);
    const pv = Number(data.creditValue.replace(/[^0-9.-]+/g, ''));
    const rt = Number(data.monthlyRate.replace(/[^0-9.-]+/g, '') / 100);
    const Tn = Number(data.creditTerm);

    const pmt = PMT(rt, Tn, pv, 0, 0).toFixed(2);
    for (let n = 0; n < creditTerm; n++) {
      const ipmt = Math.abs(IPMT(pv, pmt, rt, n).toFixed(2)).toLocaleString(
        'en-US',
        {
          style: 'currency',
          currency: 'USD',
        },
      );
      const table = [n + 1, ipmt, '2', '2'];
      setCredit(data => [...data, table]);
    }
  };

  function PMT(rt, Tn, pv, fv, type) {
    var pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (rt === 0) {
      return -(pv + fv) / Tn;
    }

    pvif = Math.pow(1 + rt, Tn);
    pmt = (-rt * (pv * pvif + fv)) / (pvif - 1);

    if (type === 1) {
      pmt /= 1 + rt;
    }

    return pmt;
  }

  function IPMT(pv, pmt, rt, n) {
    let tmp = Math.pow(1 + rt, n);
    return 0 - (pv * tmp * rt + pmt * (tmp - 1));
  }

  return (
    <View style={styles.container}>
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

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.inputText}>Valor de crédito</Text>
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
          <Text style={styles.inputText}>Tasa de intéres mensual</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange}}) => (
              <GlobalInputCurrency
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

      <Stack center spacing={2}>
        <Button
          style={styles.btn}
          title="Save"
          onPress={handleSubmit(onSubmit)}
        />
      </Stack>

      <GlobalTable tableHead={tableHead} tableData={credit} />
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
    margin: 16,
  },
  loader: {
    marginTop: 60,
  },
});

export default CreditScreen;
