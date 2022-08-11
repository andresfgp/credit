/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, ScrollView, View, Animated} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import Colors from 'credit/src/res/colors';

export default function GlobalTable(props) {
  const {state, tableData} = props;

  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{...styles.container, opacity: fadeAnim}}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{borderColor: '#C1C0B9'}}>
            <Row
              data={state.tableHead}
              widthArr={state.widthArr}
              style={styles.head}
              textStyle={styles.textHead}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              {tableData.map((dataRow, index) => (
                <Row
                  key={index}
                  data={dataRow}
                  widthArr={state.widthArr}
                  style={[
                    styles.row,
                    index % 2 && {backgroundColor: Colors.zircon},
                  ]}
                  textStyle={styles.textData}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    padding: 18,
  },
  head: {
    height: 50,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: Colors.zircon,
  },
  textHead: {
    textAlign: 'center',
    fontWeight: '500',
    color: '#fff',
  },
  textData: {
    textAlign: 'center',
    fontWeight: '200',
    color: '#fff',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: Colors.blackPearl,
  },
});
