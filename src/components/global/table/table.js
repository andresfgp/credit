/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import Colors from 'credit/src/res/colors';

export default function GlobalTable(props) {
  const {tableHead, tableData} = props;

  return (
    <ScrollView style={styles.container}>
      <Table borderStyle={{borderWidth: 2, borderColor: Colors.zircon}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        <Rows data={tableData} textStyle={styles.text} />
      </Table>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: 'transparent',
  },
  head: {height: 40, backgroundColor: 'transparent'},
  text: {margin: 6, color: '#fff', textAlign: 'center'},
});
