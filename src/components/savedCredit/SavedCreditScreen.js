import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import SavedCreditEmptyState from './SavedCreditEmptyState';
import Colors from 'credit/src/res/colors';
import SavedCreditItem from '../savedCredit/SavedCreditItem';
import store from '../../res/store';

function SavedCreditScreen(props) {
  const [credits, setCredits] = React.useState([]);

  const handlePress = item => {
    console.log(item);
  };

  const getData = async () => {
    try {
      return await store.getAllStore('credit').then(data => setCredits(data));
    } catch (error) {
      console.log(error);
    }
  };

  // Similar to componentDidMount and componentDidUpdate:
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  // componentWillUnmount() {
  //   this.props.navigation.removeListener('focus', this.getFavorites);
  // }

  return (
    <View style={styles.container}>
      {credits.length === 0 ? <SavedCreditEmptyState /> : null}

      {credits.length > 0 ? (
        <FlatList
          data={credits}
          renderItem={({item}) => (
            <SavedCreditItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
});

export default SavedCreditScreen;
