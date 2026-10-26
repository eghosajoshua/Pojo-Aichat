import * as StoreReview from 'expo-store-review';

const rateApp = async () => {
  if (await StoreReview.isAvailableAsync()) {
    await StoreReview.requestReview();
  }
};

export default rateApp;
