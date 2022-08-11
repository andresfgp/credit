import {Alert} from 'react-native';
import Storage from 'credit/src/libs/storage';

const store = {
  addStore: async (data, keyName, keyId) => {
    const dataJSON = JSON.stringify(data);
    const key = `${keyName}-${keyId}`;

    const stored = await Storage.instance.store(key, dataJSON);

    console.log('stored', stored);
  },

  removeStore: async (keyName, keyId) => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `${keyName}-${keyId}`;

          await Storage.instance.remove(key);
        },
        style: 'destructive',
      },
    ]);
  },

  getStoreId: async (keyName, keyId) => {
    try {
      const key = `${keyName}-${keyId}`;

      const data = await Storage.instance.get(key);

      return data;
    } catch (err) {
      console.log('get favorites err', err);
    }
  },
  getAllStore: async keyName => {
    try {
      const allKeys = await Storage.instance.getAllkeys();

      const keys = allKeys.filter(key => key.includes(`${keyName}-`));

      const data = await Storage.instance.multiGet(keys);

      const allData = data.map(fav => JSON.parse(fav[1]));
      return allData;
    } catch (err) {
      console.log('get favorites err', err);
    }
  },
};

export default store;
