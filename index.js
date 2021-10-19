/**
 * @flow
 */
import { MMKV } from 'react-native-mmkv';

/*
  By default, the options are these when initialized:
    id: mmkv.default,
    path: $(Documents)/mmkv/
*/

const options = {
  id: 'mmkv.persist'
}; //create a separate instance for redux-persist
const storage = new MMKV(options);

const MMKVStorage = {
  /* Disabling config for now, not too sure if it will recreate a new instance if I declared or replaced the storage variable */
  // config: (customOptions: Object) => {
  //   options = {
  //     ...options,
  //     ...customOptions
  //   }
  // },

  setItem: (key: string, value: string, callback?: (error: ?Error) => void) => {
    try {
      storage.set(key, value);
      
      if (callback){
        callback()
      }
    } catch(err){
      if (callback){
        callback(err)
      }
    }
  },

  getItem: (key: string, callback?: (error: ?Error, result: ?(Array<number> | string)) => any) => {
    try {
      const itemExists = storage.contains(key)

      if (itemExists){
        const item = storage.getString(key)

        if (!callback){
          return item
        }
      }

      if (!callback){
        return null
      }
      callback(null)
    } catch(err){
      if (callback){
        callback(err)
      }
      return err
    }
  },

  removeItem: (key: string, callback?: (error: ?Error) => void) => {
    try {
      storage.set(key, value);
      
      if (callback){
        callback()
      }
    } catch(err){
      if (callback){
        callback(err)
      }
    }
  },

  getAllKeys: (callback?: (error: ?Error, keys: ?Array<string>) => any) => {
    try {
      const keys = storage.getAllKeys();
      
      if (!callback){
        return keys
      }
      callback(null, keys)

    } catch(err){
      if (callback){
        callback(err)
      }
    }
  },

  clear: undefined // Workaround for Flow error coming from `clear` not being part of object literal
};

MMKVStorage.clear = (callback?: (error: ?Error, allKeysCleared: boolean | void) => void) => {
  storage.clearAll();
}

export default MMKVStorage;
