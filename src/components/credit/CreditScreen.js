/* eslint-disable no-bitwise */
import React from 'react';
import {View, StyleSheet} from 'react-native';

import Colors from 'credit/src/res/colors';
import GlobalTable from '../global/table/table';
import CreditForm from './CreditForm';

function CreditScreen(props) {
  const tableHead = ['#', 'Interest', 'Abono capital', 'Saldo credito'];
  const widthArr = [
    parseFloat('30%'),
    parseFloat('100%'),
    parseFloat('100%'),
    parseFloat('120%'),
  ];
  const state = {tableHead, widthArr};
  return (
    <View style={styles.container}>
      <CreditForm />
      {/* {!newCredit && (
        <GlobalTable state={state} tableData={credit} />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
});

export default CreditScreen;
