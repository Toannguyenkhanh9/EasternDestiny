import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

type Props = {
  visible?: boolean;
};

/**
 * Thay hai ID production bên dưới bằng Banner Unit ID thật.
 *
 * Android và iOS phải dùng hai quảng cáo riêng.
 */
const androidBannerUnitId =
  'ca-app-pub-XXXXXXXXXXXXXXXX/ANDROID_BANNER_ID';

const iosBannerUnitId =
  'ca-app-pub-XXXXXXXXXXXXXXXX/IOS_BANNER_ID';

const productionBannerUnitId =
  Platform.select({
    android: androidBannerUnitId,
    ios: iosBannerUnitId,
  }) ?? androidBannerUnitId;

const bannerUnitId = __DEV__
  ? TestIds.BANNER
  : productionBannerUnitId;

export default function SmallBannerAd({
  visible = true,
}: Props) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={bannerUnitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log('Banner AdMob đã tải');
        }}
        onAdFailedToLoad={error => {
          console.warn(
            'Không thể tải Banner AdMob:',
            error,
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF9EF',
  },
});