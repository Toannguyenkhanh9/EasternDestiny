
import React from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  useTranslation,
} from 'react-i18next';

import SmallBannerAd
  from '../components/SmallBannerAd';

import HomeScreen
  from '../screens/HomeScreen';

import TempleScreen
  from '../screens/TempleScreen';

import MeditationScreen
  from '../screens/MeditationScreen';

import PrayerScreen
  from '../screens/PrayerScreen';

import AudioLibraryScreen
  from '../screens/AudioLibraryScreen';

import SettingsScreen
  from '../screens/SettingsScreen';

import LunarCalendarScreen
  from '../screens/LunarCalendarScreen';

import SpiritualAudioScreen
  from '../screens/SpiritualAudioScreen';

import FortuneStickScreen
  from '../screens/FortuneStickScreen';

import HoroscopeScreen
  from '../screens/HoroscopeScreen';

import BaziChartScreen
  from '../screens/BaziChartScreen';

import BaziHistoryScreen
  from '../screens/BaziHistoryScreen';

import BaziStage4Screen
  from '../screens/BaziStage4Screen';

import ZiweiChartScreen
  from '../screens/ZiweiChartScreen';

import DailyRitualScreen
  from '../screens/DailyRitualScreen';

import PeaceJournalScreen
  from '../screens/PeaceJournalScreen';

import BuddhistCalendarScreen
  from '../screens/BuddhistCalendarScreen';

import AltarCustomizationScreen
  from '../screens/AltarCustomizationScreen';

import ChantCounterScreen
  from '../screens/ChantCounterScreen';

import PracticeJourneyScreen
  from '../screens/PracticeJourneyScreen';

import {
  colors,
} from '../theme/colors';

export type RootTabParamList = {
  Home: undefined;

  Temple: undefined;

  Meditation: undefined;

  Prayer: undefined;

  AudioLibrary: undefined;

  Settings: undefined;

  LunarCalendar: undefined;

  SpiritualAudio: undefined;

  FortuneStick: undefined;

  Horoscope: undefined;

  BaziChart:
    | {
        savedRecordId?: string;
      }
    | undefined;

  BaziHistory: undefined;

  BaziStage4: undefined;

  ZiweiChart: undefined;

  DailyRitual: undefined;

  PeaceJournal: undefined;

  BuddhistCalendar: undefined;

  AltarCustomization: undefined;

  ChantCounter: undefined;

  PracticeJourney: undefined;

  /*
   * Các route này có thể giữ lại nếu
   * bạn sẽ tích hợp ở giai đoạn sau.
   */
  DataSync: undefined;

  ExportCenter: undefined;

  PremiumLibrary: undefined;

  PremiumContentDetail: {
    contentId: string;
  };

  SmartReminder: undefined;
};

const Tab =
  createBottomTabNavigator<
    RootTabParamList
  >();

type TabIconProps = {
  icon: string;
  focused: boolean;
};

function TabIcon({
  icon,
  focused,
}: TabIconProps) {
  return (
    <Text
      style={[
        styles.tabIcon,
        focused &&
          styles.activeTabIcon,
      ]}>
      {icon}
    </Text>
  );
}

export default function RootNavigator() {
  const {t} = useTranslation();

  /**
   * Tạm thời chưa có PremiumContext.
   *
   * false:
   * Banner quảng cáo được hiển thị.
   *
   * true:
   * Banner quảng cáo bị ẩn.
   *
   * Sau này thay dòng này bằng:
   *
   * const {isPremium} = usePremium();
   */
  const isPremium = true;

  return (
    <NavigationContainer>
      <View style={styles.root}>
        <View style={styles.navigator}>
          <Tab.Navigator
            tabBar={props => (
              <View style={styles.bottomArea}>
                {!isPremium && (
                  <View
                    style={
                      styles.bannerContainer
                    }>
                    <SmallBannerAd
                      visible={!isPremium}
                    />
                  </View>
                )}

                <BottomTabBar {...props} />
              </View>
            )}
            screenOptions={{
              headerShown: false,

              tabBarActiveTintColor:
                colors.primary,

              tabBarInactiveTintColor:
                '#867A6E',

              tabBarStyle:
                styles.tabBar,

              tabBarLabelStyle:
                styles.tabBarLabel,
            }}>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: t('tabs.home'),

                tabBarIcon: ({
                  focused,
                }) => (
                  <TabIcon
                    icon="🏠"
                    focused={focused}
                  />
                ),
              }}
            />

            <Tab.Screen
              name="Temple"
              component={TempleScreen}
              options={{
                title: t(
                  'tabs.temple',
                ),

                tabBarIcon: ({
                  focused,
                }) => (
                  <TabIcon
                    icon="🛕"
                    focused={focused}
                  />
                ),
              }}
            />

            <Tab.Screen
              name="Meditation"
              component={
                MeditationScreen
              }
              options={{
                title: t(
                  'tabs.meditation',
                ),

                tabBarIcon: ({
                  focused,
                }) => (
                  <TabIcon
                    icon="🧘"
                    focused={focused}
                  />
                ),
              }}
            />

            <Tab.Screen
              name="Prayer"
              component={PrayerScreen}
              options={{
                title: t(
                  'tabs.prayer',
                ),

                tabBarIcon: ({
                  focused,
                }) => (
                  <TabIcon
                    icon="🙏"
                    focused={focused}
                  />
                ),
              }}
            />

            <Tab.Screen
              name="AudioLibrary"
              component={
                AudioLibraryScreen
              }
              options={{
                title: t(
                  'audioLibrary.title',
                  {
                    defaultValue:
                      'Âm thanh',
                  },
                ),

                tabBarButton:
                  () => null,

                tabBarItemStyle:
                  styles.hiddenTab,
              }}
            />

            <Tab.Screen
              name="LunarCalendar"
              component={
                LunarCalendarScreen
              }
              options={{
                title: t(
                  'lunarCalendar.title',
                ),

                tabBarButton:
                  () => null,

                tabBarItemStyle:
                  styles.hiddenTab,
              }}
            />

            <Tab.Screen
              name="SpiritualAudio"
              component={
                SpiritualAudioScreen
              }
              options={{
                title: t(
                  'spiritualAudio.title',
                ),

                tabBarButton:
                  () => null,

                tabBarItemStyle:
                  styles.hiddenTab,
              }}
            />

            <Tab.Screen
              name="FortuneStick"
              component={
                FortuneStickScreen
              }
              options={{
                title: t(
                  'fortuneStick.title',
                ),

                tabBarButton:
                  () => null,

                tabBarItemStyle:
                  styles.hiddenTab,
              }}
            />

            <Tab.Screen
              name="Horoscope"
              component={
                HoroscopeScreen
              }
              options={{
                title: t(
                  'horoscope.title',
                ),

                tabBarButton:
                  () => null,

                tabBarItemStyle:
                  styles.hiddenTab,
              }}
            />

            <Tab.Screen
              name="Settings"
              component={
                SettingsScreen
              }
              options={{
                title: t(
                  'settings.title',
                  {
                    defaultValue:
                      'Cài đặt',
                  },
                ),

                tabBarButton:
                  () => null,

                tabBarItemStyle:
                  styles.hiddenTab,
              }}
            />

            <Tab.Screen
              name="BaziChart"
              component={
                BaziChartScreen
              }
              options={{
                title: t(
                  'bazi.title',
                ),

                tabBarButton:
                  () => null,

                tabBarItemStyle:
                  styles.hiddenTab,
              }}
            />

            <Tab.Screen
              name="BaziHistory"
              component={
                BaziHistoryScreen
              }
              options={{
                title: t(
                  'bazi.stage3.historyTitle',
                ),

                tabBarButton:
                  () => null,

                tabBarItemStyle:
                  styles.hiddenTab,
              }}
            />

            <Tab.Screen
              name="BaziStage4"
              component={
                BaziStage4Screen
              }
              options={{
                title: t(
                  'bazi.stage4.title',
                ),

                tabBarButton:
                  () => null,

                tabBarItemStyle:
                  styles.hiddenTab,
              }}
            />

            <Tab.Screen
              name="ZiweiChart"
              component={
                ZiweiChartScreen
              }
              options={{
                title: t(
                  'ziwei.title',
                ),

                tabBarButton:
                  () => null,

                tabBarItemStyle:
                  styles.hiddenTab,
              }}
            />

            <Tab.Screen
              name="DailyRitual"
              component={
                DailyRitualScreen
              }
              options={{
                title: t(
                  'practice.title',
                ),

                tabBarButton:
                  () => null,

                tabBarItemStyle:
                  styles.hiddenTab,
              }}
            />

            <Tab.Screen
              name="PeaceJournal"
              component={
                PeaceJournalScreen
              }
              options={{
                title: t(
                  'peaceJournal.title',
                ),

                tabBarButton:
                  () => null,

                tabBarItemStyle:
                  styles.hiddenTab,
              }}
            />

            <Tab.Screen
              name="BuddhistCalendar"
              component={
                BuddhistCalendarScreen
              }
              options={{
                title: t(
                  'buddhistCalendar.title',
                ),

                tabBarButton:
                  () => null,

                tabBarItemStyle:
                  styles.hiddenTab,
              }}
            />

            <Tab.Screen
              name="AltarCustomization"
              component={
                AltarCustomizationScreen
              }
              options={{
                title: t(
                  'altarCustomization.title',
                ),

                tabBarButton:
                  () => null,

                tabBarItemStyle:
                  styles.hiddenTab,
              }}
            />

            <Tab.Screen
              name="ChantCounter"
              component={
                ChantCounterScreen
              }
              options={{
                title: t(
                  'chantCounter.title',
                ),

                tabBarButton:
                  () => null,

                tabBarItemStyle:
                  styles.hiddenTab,
              }}
            />

            <Tab.Screen
              name="PracticeJourney"
              component={
                PracticeJourneyScreen
              }
              options={{
                title: t(
                  'practiceJourney.title',
                ),

                tabBarButton:
                  () => null,

                tabBarItemStyle:
                  styles.hiddenTab,
              }}
            />
          </Tab.Navigator>
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:
      colors.background,
  },

  bottomArea: {
    backgroundColor: '#FFFAF2',
  },

  bannerContainer: {
    width: '100%',
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFAF2',
    borderTopWidth:
      StyleSheet.hairlineWidth,
    borderTopColor: '#EADBC8',
  },

  navigator: {
    flex: 1,
  },

  tabBar: {
    height:
      Platform.OS === 'ios'
        ? 88
        : 70,

    paddingTop: 7,

    paddingBottom:
      Platform.OS === 'ios'
        ? 22
        : 8,

    backgroundColor: '#FFFAF2',

    borderTopColor: '#EADBC8',
  },

  tabBarLabel: {
    fontSize: 11,
    fontWeight: '700',
  },

  tabIcon: {
    fontSize: 21,
    opacity: 0.6,
  },

  activeTabIcon: {
    fontSize: 23,
    opacity: 1,
  },

  hiddenTab: {
    display: 'none',
  },
});

