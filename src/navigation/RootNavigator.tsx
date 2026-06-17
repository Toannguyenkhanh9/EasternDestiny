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

import LunarCalendarScreen
  from '../screens/LunarCalendarScreen';

import BaziChartScreen
  from '../screens/BaziChartScreen';

import ZiweiChartScreen
  from '../screens/ZiweiChartScreen';

import SettingsScreen
  from '../screens/SettingsScreen';

import HoroscopeScreen
  from '../screens/HoroscopeScreen';

import BaziHistoryScreen
  from '../screens/BaziHistoryScreen';

import BaziStage4Screen
  from '../screens/BaziStage4Screen';

import FortuneStickScreen
  from '../screens/FortuneStickScreen';

import BuddhistCalendarScreen
  from '../screens/BuddhistCalendarScreen';

export type RootTabParamList = {
  Home: undefined;

  LunarCalendar: undefined;

  BaziChart:
    | {
        savedRecordId?: string;
      }
    | undefined;

  ZiweiChart: undefined;

  Settings: undefined;

  Horoscope: undefined;

  BaziHistory: undefined;

  BaziStage4: undefined;

  FortuneStick: undefined;

  BuddhistCalendar: undefined;
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
    <View
      style={[
        styles.tabIconWrap,
        focused &&
          styles.tabIconWrapActive,
      ]}>
      <Text
        style={[
          styles.tabIcon,
          focused &&
            styles.tabIconActive,
        ]}>
        {icon}
      </Text>
    </View>
  );
}

export default function RootNavigator() {
  const {t} = useTranslation();

  /**
   * Tạm thời chưa có PremiumContext.
   *
   * false: hiển thị banner.
   * true: ẩn banner.
   *
   * Sau này thay bằng:
   * const {isPremium} = usePremium();
   */
  const isPremium = true;

  return (
    <NavigationContainer>
      <View style={styles.root}>
        <Tab.Navigator
          initialRouteName="Home"
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
            tabBarHideOnKeyboard: true,

            tabBarActiveTintColor:
              COLORS.gold,

            tabBarInactiveTintColor:
              COLORS.tabInactive,

            tabBarStyle:
              styles.tabBar,

            tabBarLabelStyle:
              styles.tabBarLabel,

            tabBarItemStyle:
              styles.tabBarItem,
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: t(
                'tabs.home',
                {
                  defaultValue:
                    'Home',
                },
              ),

              tabBarIcon: ({
                focused,
              }) => (
                <TabIcon
                  icon="✦"
                  focused={focused}
                />
              ),
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
                {
                  defaultValue:
                    'Calendar',
                },
              ),

              tabBarIcon: ({
                focused,
              }) => (
                <TabIcon
                  icon="☾"
                  focused={focused}
                />
              ),
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
                {
                  defaultValue:
                    'BaZi',
                },
              ),

              tabBarIcon: ({
                focused,
              }) => (
                <TabIcon
                  icon="☯"
                  focused={focused}
                />
              ),
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
                {
                  defaultValue:
                    'Zi Wei',
                },
              ),

              tabBarIcon: ({
                focused,
              }) => (
                <TabIcon
                  icon="紫"
                  focused={focused}
                />
              ),
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
                    'Settings',
                },
              ),

              tabBarIcon: ({
                focused,
              }) => (
                <TabIcon
                  icon="⚙"
                  focused={focused}
                />
              ),
            }}
          />

          {/*
           * Các màn hình bên dưới vẫn điều hướng được từ HomeScreen,
           * nhưng không hiển thị thành nút trên thanh tab.
           */}

          <Tab.Screen
            name="Horoscope"
            component={
              HoroscopeScreen
            }
            options={{
              title: t(
                'horoscope.title',
                {
                  defaultValue:
                    'Horoscope and Auspicious Dates',
                },
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
                {
                  defaultValue:
                    'Saved Charts',
                },
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
                {
                  defaultValue:
                    'Timing and Compatibility',
                },
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
                {
                  defaultValue:
                    'Fortune Stick',
                },
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
                'astrologyHome.cards.holidayTitle',
                {
                  defaultValue:
                    'Holidays and Observances',
                },
              ),

              tabBarButton:
                () => null,

              tabBarItemStyle:
                styles.hiddenTab,
            }}
          />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}

const COLORS = {
  navy: '#17243A',
  navySoft: '#22324B',
  gold: '#D7AF5E',
  cream: '#F7F2E8',
  surface: '#FFFDF8',
  border: '#DED4C3',
  tabInactive: '#7D807E',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:
      COLORS.cream,
  },

  bottomArea: {
    backgroundColor:
      COLORS.surface,
  },

  bannerContainer: {
    width: '100%',
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:
      COLORS.surface,
    borderTopWidth:
      StyleSheet.hairlineWidth,
    borderTopColor:
      COLORS.border,
  },

  tabBar: {
    height:
      Platform.OS === 'ios'
        ? 88
        : 70,

    paddingTop: 6,

    paddingBottom:
      Platform.OS === 'ios'
        ? 22
        : 8,

    backgroundColor:
      COLORS.surface,

    borderTopWidth:
      StyleSheet.hairlineWidth,

    borderTopColor:
      COLORS.border,

    elevation: 10,

    shadowColor: '#000000',

    shadowOpacity:
      Platform.OS === 'ios'
        ? 0.08
        : 0,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: -3,
    },
  },

  tabBarItem: {
    paddingTop: 1,
  },

  tabBarLabel: {
    fontSize: 10,
    fontWeight: '800',
  },

  tabIconWrap: {
    width: 33,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  tabIconWrapActive: {
    backgroundColor:
      'rgba(215,175,94,0.16)',
  },

  tabIcon: {
    color: COLORS.tabInactive,
    fontSize: 19,
    fontWeight: '900',
    opacity: 0.72,
  },

  tabIconActive: {
    color: COLORS.gold,
    fontSize: 20,
    opacity: 1,
  },

  hiddenTab: {
    display: 'none',
  },
});
