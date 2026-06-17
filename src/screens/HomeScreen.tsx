import React, {
  useMemo,
} from 'react';

import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type {
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  useTranslation,
} from 'react-i18next';

import type {
  RootTabParamList,
} from '../navigation/RootNavigator';

type Props = BottomTabScreenProps<
  RootTabParamList,
  'Home'
>;

type HomeRoute =
  | 'LunarCalendar'
  | 'BuddhistCalendar'
  | 'FortuneStick'
  | 'Horoscope'
  | 'BaziChart'
  | 'BaziHistory'
  | 'BaziStage4'
  | 'ZiweiChart'
  | 'Settings';

type HomeCard = {
  route: HomeRoute;
  icon: string;
  title: string;
  subtitle: string;
  accent: string;
};

type HomeSectionProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: HomeCard[];
  onPress: (
    route: HomeRoute,
  ) => void;
};

function getGreetingKey(): string {
  const hour = new Date().getHours();

  if (hour < 11) {
    return 'astrologyHome.greetingMorning';
  }

  if (hour < 18) {
    return 'astrologyHome.greetingAfternoon';
  }

  return 'astrologyHome.greetingEvening';
}

function formatCurrentDate(
  language: string,
): string {
  try {
    return new Intl.DateTimeFormat(
      language,
      {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    ).format(new Date());
  } catch {
    return new Date().toLocaleDateString();
  }
}

function FeatureCard({
  item,
  onPress,
}: {
  item: HomeCard;
  onPress: (
    route: HomeRoute,
  ) => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.title}
      style={({pressed}) => [
        styles.featureCard,
        pressed &&
          styles.pressed,
      ]}
      onPress={() =>
        onPress(item.route)
      }>
      <View
        style={[
          styles.featureIconWrap,
          {
            backgroundColor:
              item.accent,
          },
        ]}>
        <Text style={styles.featureIcon}>
          {item.icon}
        </Text>
      </View>

      <Text style={styles.featureTitle}>
        {item.title}
      </Text>

      <Text
        style={styles.featureSubtitle}
        numberOfLines={3}>
        {item.subtitle}
      </Text>

      <Text style={styles.featureArrow}>
        ›
      </Text>
    </Pressable>
  );
}

function HomeSection({
  eyebrow,
  title,
  subtitle,
  cards,
  onPress,
}: HomeSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionEyebrow}>
        {eyebrow}
      </Text>

      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <Text style={styles.sectionSubtitle}>
        {subtitle}
      </Text>

      <View style={styles.featureGrid}>
        {cards.map(item => (
          <FeatureCard
            key={item.route}
            item={item}
            onPress={onPress}
          />
        ))}
      </View>
    </View>
  );
}

export default function HomeScreen({
  navigation,
}: Props) {
  const {t, i18n} =
    useTranslation();

  const language =
    i18n.resolvedLanguage ??
    i18n.language ??
    'en';

  const currentDate = useMemo(
    () =>
      formatCurrentDate(
        language,
      ),
    [language],
  );

  const navigateTo = (
    route: HomeRoute,
  ) => {
    navigation.navigate(
      route as never,
    );
  };

  const mainCards: HomeCard[] = [
    {
      route: 'BaziChart',
      icon: '☯',
      title: t(
        'astrologyHome.cards.baziTitle',
      ),
      subtitle: t(
        'astrologyHome.cards.baziSubtitle',
      ),
      accent: '#E9D8B8',
    },
    {
      route: 'ZiweiChart',
      icon: '紫',
      title: t(
        'astrologyHome.cards.ziweiTitle',
      ),
      subtitle: t(
        'astrologyHome.cards.ziweiSubtitle',
      ),
      accent: '#DFD9ED',
    },
    {
      route: 'Horoscope',
      icon: '✦',
      title: t(
        'astrologyHome.cards.auspiciousTitle',
      ),
      subtitle: t(
        'astrologyHome.cards.auspiciousSubtitle',
      ),
      accent: '#DEE7D2',
    },
    {
      route: 'BaziStage4',
      icon: '∞',
      title: t(
        'astrologyHome.cards.compatibilityTitle',
      ),
      subtitle: t(
        'astrologyHome.cards.compatibilitySubtitle',
      ),
      accent: '#EBD9D1',
    },
  ];

  const calendarCards: HomeCard[] = [
    {
      route: 'LunarCalendar',
      icon: '月',
      title: t(
        'astrologyHome.cards.lunarTitle',
      ),
      subtitle: t(
        'astrologyHome.cards.lunarSubtitle',
      ),
      accent: '#D8E3ED',
    },
    {
      route: 'BuddhistCalendar',
      icon: '日',
      title: t(
        'astrologyHome.cards.holidayTitle',
      ),
      subtitle: t(
        'astrologyHome.cards.holidaySubtitle',
      ),
      accent: '#F0E0BE',
    },
  ];

  const profileCards: HomeCard[] = [
    {
      route: 'BaziHistory',
      icon: '冊',
      title: t(
        'astrologyHome.cards.savedTitle',
      ),
      subtitle: t(
        'astrologyHome.cards.savedSubtitle',
      ),
      accent: '#DCE6D9',
    },
    {
      route: 'FortuneStick',
      icon: '籤',
      title: t(
        'astrologyHome.cards.fortuneTitle',
      ),
      subtitle: t(
        'astrologyHome.cards.fortuneSubtitle',
      ),
      accent: '#F0D6C4',
    },
  ];

  return (
    <SafeAreaView
      edges={['top']}
      style={styles.screen}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={
          COLORS.navy
        }
      />

      <ScrollView
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }>
        <View style={styles.hero}>
          <View
            pointerEvents="none"
            style={
              styles.heroOrbLarge
            }
          />

          <View
            pointerEvents="none"
            style={
              styles.heroOrbSmall
            }
          />

          <View
            style={
              styles.heroTopRow
            }>
            <View
              style={
                styles.brandMark
              }>
              <Text
                style={
                  styles.brandMarkText
                }>
                ED
              </Text>
            </View>

            <View
              style={
                styles.brandCategory
              }>
              <Text
                style={
                  styles.brandCategoryText
                }>
                {t(
                  'astrologyHome.brandCategory',
                )}
              </Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t(
                'astrologyHome.settings',
              )}
              style={({pressed}) => [
                styles.settingsButton,
                pressed &&
                  styles.pressed,
              ]}
              onPress={() =>
                navigateTo(
                  'Settings',
                )
              }>
              <Text
                style={
                  styles.settingsIcon
                }>
                ⚙
              </Text>
            </Pressable>
          </View>

          <Text style={styles.greeting}>
            {t(getGreetingKey())}
          </Text>

          <Text style={styles.appName}>
            {t(
              'astrologyHome.appName',
            )}
          </Text>

          <Text
            style={
              styles.brandDescriptor
            }>
            {t(
              'astrologyHome.brandDescriptor',
            )}
          </Text>

          <Text
            style={
              styles.appTagline
            }>
            {t(
              'astrologyHome.appTagline',
            )}
          </Text>

          <View style={styles.todayCard}>
            <View
              style={
                styles.todaySymbol
              }>
              <Text
                style={
                  styles.todaySymbolText
                }>
                ☾
              </Text>
            </View>

            <View
              style={
                styles.todayTextWrap
              }>
              <Text
                style={
                  styles.todayEyebrow
                }>
                {t(
                  'astrologyHome.today',
                )}
              </Text>

              <Text
                style={
                  styles.todayDate
                }>
                {currentDate}
              </Text>
            </View>

            <Pressable
              accessibilityRole="button"
              style={({pressed}) => [
                styles.todayButton,
                pressed &&
                  styles.pressed,
              ]}
              onPress={() =>
                navigateTo(
                  'LunarCalendar',
                )
              }>
              <Text
                style={
                  styles.todayButtonText
                }>
                {t(
                  'astrologyHome.viewCalendar',
                )}
              </Text>
            </Pressable>
          </View>
        </View>

        <View
          style={
            styles.reflectionCard
          }>
          <View
            style={
              styles.reflectionIconWrap
            }>
            <Text
              style={
                styles.reflectionIcon
              }>
              ✧
            </Text>
          </View>

          <View
            style={
              styles.reflectionTextWrap
            }>
            <Text
              style={
                styles.reflectionTitle
              }>
              {t(
                'astrologyHome.insightTitle',
              )}
            </Text>

            <Text
              style={
                styles.reflectionText
              }>
              {t(
                'astrologyHome.insightText',
              )}
            </Text>
          </View>
        </View>

        <HomeSection
          eyebrow={t(
            'astrologyHome.mainEyebrow',
          )}
          title={t(
            'astrologyHome.mainTitle',
          )}
          subtitle={t(
            'astrologyHome.mainSubtitle',
          )}
          cards={mainCards}
          onPress={navigateTo}
        />

        <HomeSection
          eyebrow={t(
            'astrologyHome.calendarEyebrow',
          )}
          title={t(
            'astrologyHome.calendarTitle',
          )}
          subtitle={t(
            'astrologyHome.calendarSubtitle',
          )}
          cards={calendarCards}
          onPress={navigateTo}
        />

        <HomeSection
          eyebrow={t(
            'astrologyHome.profileEyebrow',
          )}
          title={t(
            'astrologyHome.profileTitle',
          )}
          subtitle={t(
            'astrologyHome.profileSubtitle',
          )}
          cards={profileCards}
          onPress={navigateTo}
        />

        <View
          style={
            styles.disclaimerCard
          }>
          <Text
            style={
              styles.disclaimerTitle
            }>
            {t(
              'astrologyHome.disclaimerTitle',
            )}
          </Text>

          <Text
            style={
              styles.disclaimerText
            }>
            {t(
              'astrologyHome.disclaimerText',
            )}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const COLORS = {
  navy: '#17243A',
  navySoft: '#243550',
  gold: '#D7AF5E',
  cream: '#F7F2E8',
  surface: '#FFFDF8',
  text: '#282D36',
  muted: '#6C726F',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor:
      COLORS.cream,
  },

  content: {
    paddingBottom: 130,
  },

  hero: {
    overflow: 'hidden',
    backgroundColor:
      COLORS.navy,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },

  heroOrbLarge: {
    position: 'absolute',
    top: -112,
    right: -78,
    width: 245,
    height: 245,
    backgroundColor:
      'rgba(215,175,94,0.12)',
    borderRadius: 123,
  },

  heroOrbSmall: {
    position: 'absolute',
    left: -55,
    bottom: 25,
    width: 145,
    height: 145,
    backgroundColor:
      'rgba(255,255,255,0.05)',
    borderRadius: 73,
  },

  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brandMark: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:
      'rgba(215,175,94,0.16)',
    borderWidth: 1,
    borderColor:
      'rgba(215,175,94,0.6)',
    borderRadius: 15,
  },

  brandMarkText: {
    color: '#F4DA9A',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.6,
  },

  brandCategory: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 11,
  },

  brandCategoryText: {
    color: '#BBC2CD',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },

  settingsButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:
      'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.14)',
    borderRadius: 14,
  },

  settingsIcon: {
    color: '#F2E8D2',
    fontSize: 20,
  },

  greeting: {
    color: '#C5CAD2',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 24,
  },

  appName: {
    color: '#FFF8E9',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 0.1,
    marginTop: 4,
  },

  brandDescriptor: {
    color: '#E5C77F',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginTop: 6,
  },

  appTagline: {
    maxWidth: 335,
    color: '#D5D9E1',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },

  todayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:
      'rgba(255,255,255,0.09)',
    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.13)',
    borderRadius: 18,
    padding: 12,
    marginTop: 20,
  },

  todaySymbol: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:
      'rgba(215,175,94,0.17)',
    borderRadius: 13,
  },

  todaySymbolText: {
    color: '#F1D58F',
    fontSize: 22,
  },

  todayTextWrap: {
    flex: 1,
    marginLeft: 11,
    marginRight: 8,
  },

  todayEyebrow: {
    color: '#B8BEC7',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  todayDate: {
    color: '#FFF7E5',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 3,
    textTransform: 'capitalize',
  },

  todayButton: {
    backgroundColor:
      COLORS.gold,
    borderRadius: 11,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },

  todayButtonText: {
    color: COLORS.navy,
    fontSize: 10,
    fontWeight: '900',
  },

  reflectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:
      COLORS.surface,
    borderWidth: 1,
    borderColor: '#E5D9C4',
    borderRadius: 19,
    padding: 15,
    marginHorizontal: 18,
    marginTop: 18,
  },

  reflectionIconWrap: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEE3CA',
    borderRadius: 14,
  },

  reflectionIcon: {
    color: '#8E6928',
    fontSize: 24,
  },

  reflectionTextWrap: {
    flex: 1,
    marginLeft: 12,
  },

  reflectionTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '900',
  },

  reflectionText: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 4,
  },

  section: {
    paddingHorizontal: 18,
    marginTop: 27,
  },

  sectionEyebrow: {
    color: '#9C793A',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 23,
    fontWeight: '900',
    marginTop: 3,
  },

  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
    marginBottom: 12,
  },

  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:
      'space-between',
  },

  featureCard: {
    width: '48.5%',
    minHeight: 174,
    backgroundColor:
      COLORS.surface,
    borderWidth: 1,
    borderColor: '#E7DDCD',
    borderRadius: 20,
    padding: 14,
    marginBottom: 11,
  },

  featureIconWrap: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },

  featureIcon: {
    color: COLORS.navySoft,
    fontSize: 23,
    fontWeight: '900',
  },

  featureTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 19,
    marginTop: 12,
  },

  featureSubtitle: {
    flex: 1,
    color: COLORS.muted,
    fontSize: 10.5,
    lineHeight: 16,
    marginTop: 5,
  },

  featureArrow: {
    alignSelf: 'flex-end',
    color: '#9B7A45',
    fontSize: 24,
    lineHeight: 24,
    marginTop: 4,
  },

  disclaimerCard: {
    backgroundColor: '#EAE5DC',
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 18,
    marginTop: 18,
  },

  disclaimerTitle: {
    color: '#5E5549',
    fontSize: 12,
    fontWeight: '900',
  },

  disclaimerText: {
    color: '#756D62',
    fontSize: 10.5,
    lineHeight: 17,
    marginTop: 5,
  },

  pressed: {
    opacity: 0.72,
    transform: [
      {
        scale: 0.985,
      },
    ],
  },
});
