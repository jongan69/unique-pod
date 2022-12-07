import AsyncStorage from "@react-native-async-storage/async-storage";

// for basic async storage functions
export const SaveItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("saved data to async: ", key, value);
  } catch (e) {
    console.log(e);
  }
};

export const ReadItem = async (key: string) => {
  try {
    var result = await AsyncStorage.getItem(key);
    return result;
  } catch (e) {
    return e;
  }
};

export function MultiRead(key: readonly string[], onResponse: (arg0: Map<any, any>) => void, onFailure: (arg0: unknown) => void) {
  try {
    AsyncStorage.multiGet(key).then((values) => {
      let responseMap = new Map();
      values.map((result, i, data) => {
        let key = data[i][0];
        let value = data[i][1];
        responseMap.set(key, value);
      });
      onResponse(responseMap);
    });
  } catch (error) {
    onFailure(error);
  }
}

export async function DeleteItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}

// For guest or Fake API Data
export const getProducts = async () => {
  const fakeProductData = await fetch('https://fakestoreapi.com/products', {
    method: 'GET'
  }).then((response) => response.json())
  // console.log('fake product data: ', fakeProductData)
  return fakeProductData
}

export const guestData = async () => {
  const fakeUserData = await fetch('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole', {
    method: 'GET'
  }).then((response) => response.json())
  // console.log('fake user data: ', fakeUserData)
  return fakeUserData
}

export const GuestLogin = () => {
  guestData();
  getProducts();
  return { loggedin: true }
}



