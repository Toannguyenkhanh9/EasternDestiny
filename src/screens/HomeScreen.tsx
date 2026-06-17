import React, {
  useCallback,
  useState,
} from "react";
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import PracticeStreakCard from "../components/PracticeStreakCard";
import type { RootTabParamList } from "../navigation/RootNavigator";
import {
  DEFAULT_ALTAR_PREFERENCES,
  getAltarPreferences,
  type AltarPreferences,
} from "../services/altarPreferences";
import {
  getAltarBackgroundSource,
  resolveAltarCultureTheme,
} from "../utils/altarTheme";

type Props = BottomTabScreenProps<RootTabParamList, "Home">;

type MenuRoute =
  | "Temple"
  | "Meditation"
  | "Prayer"
  | "SpiritualAudio"
  | "ChantCounter"
  | "PracticeJourney"
  | "DailyRitual"
  | "PeaceJournal"
  | "AltarCustomization"
  | "LunarCalendar"
  | "BuddhistCalendar"
  | "FortuneStick"
  | "Horoscope"
  | "BaziChart"
  | "BaziHistory"
  | "BaziStage4"
  | "ZiweiChart"
  | "Settings";

type HomeMenuItem = {
  icon: string;
  title: string;
  subtitle: string;
  route: MenuRoute;
  accent: string;
};

type HomeMenuCardProps = HomeMenuItem & {
  onPress: (route: MenuRoute) => void;
};

type HomeSectionProps = {
  icon: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  backgroundColor: string;
  borderColor: string;
  items: HomeMenuItem[];
  onPress: (route: MenuRoute) => void;
};

function HomeMenuCard({
  icon,
  title,
  subtitle,
  route,
  accent,
  onPress,
}: HomeMenuCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.menuCard,
        pressed && styles.menuCardPressed,
      ]}
      onPress={() => onPress(route)}
    >
      <View
        style={[
          styles.menuIconWrap,
          {
            backgroundColor: accent,
          },
        ]}
      >
        <Text style={styles.menuIcon}>{icon}</Text>
      </View>

      <View style={styles.menuTextWrap}>
        <Text style={styles.menuTitle}>{title}</Text>

        <Text style={styles.menuSubtitle} numberOfLines={3}>
          {subtitle}
        </Text>
      </View>

      <View style={styles.menuArrowWrap}>
        <Text style={styles.menuArrow}>›</Text>
      </View>
    </Pressable>
  );
}

function HomeSection({
  icon,
  eyebrow,
  title,
  subtitle,
  backgroundColor,
  borderColor,
  items,
  onPress,
}: HomeSectionProps) {
  return (
    <View
      style={[
        styles.categorySection,
        {
          backgroundColor,
          borderColor,
        },
      ]}
    >
      <View style={styles.categoryHeader}>
        <View style={styles.categoryIconWrap}>
          <Text style={styles.categoryIcon}>{icon}</Text>
        </View>

        <View style={styles.categoryHeaderText}>
          <Text style={styles.categoryEyebrow}>{eyebrow}</Text>
          <Text style={styles.categoryTitle}>{title}</Text>
          <Text style={styles.categorySubtitle}>{subtitle}</Text>
        </View>
      </View>

      <View style={styles.menuGrid}>
        {items.map((item) => (
          <HomeMenuCard
            key={`${title}-${item.route}-${item.title}`}
            {...item}
            onPress={onPress}
          />
        ))}
      </View>
    </View>
  );
}

export default function HomeScreen({ navigation }: Props) {
  const {t, i18n} = useTranslation();

  const [altarPreferences, setAltarPreferences] =
    useState<AltarPreferences>(
      DEFAULT_ALTAR_PREFERENCES,
    );

  useFocusEffect(
    useCallback(() => {
      let active = true;

      getAltarPreferences()
        .then(value => {
          if (active) {
            setAltarPreferences(value);
          }
        })
        .catch(error => {
          console.warn(
            "Unable to load altar preferences:",
            error,
          );
        });

      return () => {
        active = false;
      };
    }, []),
  );

  const language =
    i18n.resolvedLanguage ??
    i18n.language ??
    "en";

  const effectiveCultureTheme =
    resolveAltarCultureTheme(
      altarPreferences.cultureTheme,
      language,
    );

  const heroBackground =
    getAltarBackgroundSource(
      effectiveCultureTheme,
    );

  const navigateTo = (route: MenuRoute) => {
    navigation.navigate(route);
  };

  const practiceItems: HomeMenuItem[] = [
    {
      icon: "🌱",
      title: t("practiceJourney.homeTitle"),
      subtitle: t("practiceJourney.homeSubtitle"),
      route: "PracticeJourney",
      accent: "#E7E5C9",
    },
    {
      icon: "🪔",
      title: t("home.templeTitle"),
      subtitle: t("home.templeSubtitle"),
      route: "Temple",
      accent: "#F6E1C2",
    },
    {
      icon: "🧘",
      title: t("home.meditationTitle"),
      subtitle: t("home.meditationSubtitle"),
      route: "Meditation",
      accent: "#E8E5D2",
    },
    {
      icon: "🙏",
      title: t("home.prayerTitle"),
      subtitle: t("home.prayerSubtitle"),
      route: "Prayer",
      accent: "#F5E6CF",
    },
    {
      icon: "🎧",
      title: t("home.spiritualAudioTitle"),
      subtitle: t("home.spiritualAudioSubtitle"),
      route: "SpiritualAudio",
      accent: "#E3E8DF",
    },
    {
      icon: "📿",
      title: t("chantCounter.title"),
      subtitle: t("chantCounter.homeSubtitle"),
      route: "ChantCounter",
      accent: "#EEE0C5",
    },
    {
      icon: "🔥",
      title: t("practice.title", {
        defaultValue: "Nghi thức hằng ngày",
      }),
      subtitle: t("practice.subtitle", {
        defaultValue:
          "Thắp hương, nghe kinh, thiền và ghi lại lòng biết ơn mỗi ngày",
      }),
      route: "DailyRitual",
      accent: "#F2E0C4",
    },
    {
      icon: "🪷",
      title: t("altarCustomization.title", {
        defaultValue: "Bàn thờ cá nhân hóa",
      }),
      subtitle: t("altarCustomization.subtitle", {
        defaultValue:
          "Tùy chỉnh biểu tượng, hoa, đèn, màu ánh sáng và không gian chính điện",
      }),
      route: "AltarCustomization",
      accent: "#F0D8BA",
    },
    {
      icon: "📖",
      title: t("home.peaceJournalShortTitle", {
        defaultValue: "Nhật ký",
      }),
      subtitle: t("home.peaceJournalShortSubtitle", {
        defaultValue: "Ghi lại cảm xúc, lòng biết ơn và điều muốn buông bỏ",
      }),
      route: "PeaceJournal",
      accent: "#F1DFC8",
    },
  ];

  const calendarItems: HomeMenuItem[] = [
    {
      icon: "📅",
      title: t("home.lunarCalendarTitle"),
      subtitle: t("home.lunarCalendarSubtitle"),
      route: "LunarCalendar",
      accent: "#E9DFEF",
    },
    {
      icon: "🌑",
      title: t("home.newMoonFullMoonTitle", {
        defaultValue: "Mùng một – ngày rằm",
      }),
      subtitle: t("home.newMoonFullMoonSubtitle", {
        defaultValue: "Theo dõi ngày sóc, ngày vọng và chuẩn bị nghi lễ",
      }),
      route: "BuddhistCalendar",
      accent: "#E6E0EE",
    },
    {
      icon: "☸",
      title: t("home.buddhistFestivalTitle", {
        defaultValue: "Ngày lễ Phật giáo",
      }),
      subtitle: t("home.buddhistFestivalSubtitle", {
        defaultValue: "Xem Phật Đản, Vu Lan và các ngày vía phổ biến",
      }),
      route: "BuddhistCalendar",
      accent: "#E8D6B8",
    },
    {
      icon: "🔔",
      title: t("home.practiceReminderTitle", {
        defaultValue: "Nhắc thực hành",
      }),
      subtitle: t("home.practiceReminderSubtitle", {
        defaultValue: "Chọn giờ nhắc thiền, tụng kinh và nghi thức hằng ngày",
      }),
      route: "Settings",
      accent: "#E4E6DA",
    },
  ];

  const reflectionItems: HomeMenuItem[] = [
    {
      icon: "🧧",
      title: t("home.fortuneStickTitle"),
      subtitle: t("home.fortuneStickSubtitle"),
      route: "FortuneStick",
      accent: "#F3DFC9",
    },
    {
      icon: "🔮",
      title: t("home.horoscopeTitle", {
        defaultValue: "Tử vi và ngày tốt",
      }),
      subtitle: t("home.horoscopeSubtitle", {
        defaultValue:
          "Nhập ngày sinh để tham khảo tử vi và ngày phù hợp cho các việc quan trọng",
      }),
      route: "Horoscope",
      accent: "#E9DDEE",
    },
    {
      icon: "☯",
      title: t("home.baziTitle"),
      subtitle: t("home.baziSubtitle"),
      route: "BaziChart",
      accent: "#EFE2D0",
    },
    {
      icon: "📚",
      title: t("home.baziHistoryTitle", {
        defaultValue: "Lá số đã lưu",
      }),
      subtitle: t("home.baziHistorySubtitle", {
        defaultValue:
          "Xem lại, chia sẻ, nhân bản và tính lại các lá số Bát tự đã lưu",
      }),
      route: "BaziHistory",
      accent: "#F1E4CF",
    },
    {
      icon: "✦",
      title: t("home.baziStage4Title", {
        defaultValue: "Dòng vận và tương hợp",
      }),
      subtitle: t("home.baziStage4Subtitle", {
        defaultValue:
          "Xem lưu niên, lưu nguyệt, so hai lá số và chọn ngày theo Bát tự",
      }),
      route: "BaziStage4",
      accent: "#F0DFC3",
    },
    {
      icon: "紫",
      title: t("home.ziweiTitle", {
        defaultValue: "Tử vi Đẩu số",
      }),
      subtitle: t("home.ziweiSubtitle", {
        defaultValue:
          "An Mệnh, an Thân, 12 cung, sao và các lớp luận giải chuyên sâu",
      }),
      route: "ZiweiChart",
      accent: "#F0E0CA",
    },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topHeader}>
          <View style={styles.headerTextWrap}>
            <Text style={styles.welcomeText}>
              {t("home.welcome", {
                defaultValue: "Bình an mỗi ngày",
              })}
            </Text>

            <Text style={styles.brandText}>{t("home.title")}</Text>
          </View>

          <View style={styles.headerActions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("home.settingsTitle")}
              style={({ pressed }) => [
                styles.settingsButton,
                pressed && styles.headerButtonPressed,
              ]}
              onPress={() => navigation.navigate("Settings")}
            >
              <Text style={styles.settingsIcon}>⚙️</Text>
            </Pressable>

            <View style={styles.lotusBadge}>
              <Text style={styles.lotusIcon}>🪷</Text>
            </View>
          </View>
        </View>

        <ImageBackground
          source={heroBackground}
          resizeMode="cover"
          imageStyle={styles.heroImage}
          style={styles.hero}
        >
          <View style={styles.heroOverlay}>
            <View style={styles.heroTopBadge}>
              <Text style={styles.heroTopBadgeIcon}>☸</Text>

              <Text style={styles.heroTopBadgeText}>
                {t("home.peacefulSpace", {
                  defaultValue: "Không gian tĩnh tâm",
                })}
              </Text>
            </View>

            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>
                {t("home.heroTitle", {
                  defaultValue: "Trở về với sự an yên",
                })}
              </Text>

              <Text style={styles.heroSubtitle}>{t("home.subtitle")}</Text>

              <Pressable
                style={({ pressed }) => [
                  styles.heroButton,
                  pressed && styles.heroButtonPressed,
                ]}
                onPress={() => navigation.navigate("Temple")}
              >
                <Text style={styles.heroButtonText}>
                  {t("home.enterTemple", {
                    defaultValue: "Vào chính điện",
                  })}
                </Text>

                <Text style={styles.heroButtonArrow}>›</Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.practiceCardWrap}>
          <PracticeStreakCard
            onPress={() => navigation.navigate("DailyRitual")}
          />
        </View>

        <View style={styles.pageSectionHeader}>
          <View>
            <Text style={styles.sectionEyebrow}>
              {t("home.discover", {
                defaultValue: "Khám phá",
              })}
            </Text>

            <Text style={styles.sectionTitle}>
              {t("home.organizedActivitiesTitle", {
                defaultValue: "Không gian dành cho bạn",
              })}
            </Text>
          </View>

          <View style={styles.sectionOrnament}>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionLotus}>✦</Text>
            <View style={styles.sectionLine} />
          </View>
        </View>

        <HomeSection
          icon="🪷"
          eyebrow={t("home.practiceSectionEyebrow", {
            defaultValue: "THỰC HÀNH",
          })}
          title={t("home.practiceSectionTitle", {
            defaultValue: "Tu tập",
          })}
          subtitle={t("home.practiceSectionSubtitle", {
            defaultValue:
              "Các hoạt động giúp tâm lắng dịu và duy trì thói quen mỗi ngày",
          })}
          backgroundColor="#FFF8EC"
          borderColor="#E8D2AD"
          items={practiceItems}
          onPress={navigateTo}
        />

        <HomeSection
          icon="📆"
          eyebrow={t("home.calendarSectionEyebrow", {
            defaultValue: "THỜI GIAN",
          })}
          title={t("home.calendarSectionTitle", {
            defaultValue: "Lịch và nghi lễ",
          })}
          subtitle={t("home.calendarSectionSubtitle", {
            defaultValue:
              "Theo dõi ngày âm, ngày lễ và những dịp thực hành quan trọng",
          })}
          backgroundColor="#F8F5EE"
          borderColor="#DDD5C4"
          items={calendarItems}
          onPress={navigateTo}
        />

        <HomeSection
          icon="☯"
          eyebrow={t("home.reflectionSectionEyebrow", {
            defaultValue: "CHIÊM NGHIỆM",
          })}
          title={t("home.reflectionSectionTitle", {
            defaultValue: "Chiêm nghiệm",
          })}
          subtitle={t("home.reflectionSectionSubtitle", {
            defaultValue:
              "Nội dung truyền thống để tham khảo văn hóa và tự nhìn lại bản thân",
          })}
          backgroundColor="#FBF5F0"
          borderColor="#E6D4C7"
          items={reflectionItems}
          onPress={navigateTo}
        />

        <View style={styles.dailyCard}>
          <View style={styles.dailyIconWrap}>
            <Text style={styles.dailyIcon}>☀</Text>
          </View>

          <View style={styles.dailyContent}>
            <Text style={styles.dailyLabel}>{t("home.dailyTitle")}</Text>

            <Text style={styles.dailyText}>{t("home.dailyText")}</Text>
          </View>
        </View>

        <View style={styles.footerQuote}>
          <Text style={styles.footerQuoteMark}>“</Text>

          <Text style={styles.footerQuoteText}>
            {t("home.footerQuote", {
              defaultValue: "Tâm tĩnh thì mọi nơi đều là chốn bình an.",
            })}
          </Text>

          <Text style={styles.footerQuoteMarkEnd}>”</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const BACKGROUND = "#FFF9F1";
const SURFACE = "#FFFDF9";
const BROWN = "#4D2C1D";
const BROWN_SOFT = "#6D4D39";
const GOLD = "#C99551";
const GOLD_LIGHT = "#F5D9A4";
const BORDER = "#E8D6BF";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 120,
  },

  topHeader: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  headerTextWrap: {
    flex: 1,
    marginRight: 12,
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  welcomeText: {
    color: "#9A7B62",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },

  brandText: {
    color: BROWN,
    fontSize: 25,
    fontWeight: "900",
    marginTop: 3,
  },

  settingsButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7EEE3",
    borderWidth: 1,
    borderColor: "#E5D4BF",
    borderRadius: 21,
    marginRight: 8,
  },

  settingsIcon: {
    fontSize: 20,
  },

  headerButtonPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.96 }],
  },

  lotusBadge: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7EBD9",
    borderWidth: 1,
    borderColor: "#E6CCA7",
    borderRadius: 24,
  },

  lotusIcon: {
    fontSize: 25,
  },

  hero: {
    width: "100%",
    aspectRatio: 0.96,
    overflow: "hidden",
    borderRadius: 28,
    shadowColor: "#5C351F",
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    elevation: 8,
  },

  heroImage: {
    borderRadius: 28,
  },

  heroOverlay: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "rgba(31, 14, 6, 0.30)",
    padding: 18,
  },

  heroTopBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 248, 234, 0.92)",
    borderWidth: 1,
    borderColor: "rgba(232, 196, 138, 0.85)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  heroTopBadgeIcon: {
    color: GOLD,
    fontSize: 16,
    marginRight: 7,
  },

  heroTopBadgeText: {
    color: BROWN,
    fontSize: 12,
    fontWeight: "800",
  },

  heroContent: {
    backgroundColor: "rgba(32, 15, 7, 0.68)",
    borderWidth: 1,
    borderColor: "rgba(239, 204, 145, 0.38)",
    borderRadius: 22,
    padding: 18,
  },

  heroTitle: {
    color: "#FFF4D8",
    fontSize: 27,
    fontWeight: "900",
    lineHeight: 34,
  },

  heroSubtitle: {
    color: "#F4DFC3",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },

  heroButton: {
    alignSelf: "flex-start",
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: GOLD,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginTop: 16,
  },

  heroButtonPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }],
  },

  heroButtonText: {
    color: "#3D2316",
    fontSize: 14,
    fontWeight: "900",
  },

  heroButtonArrow: {
    color: "#3D2316",
    fontSize: 23,
    lineHeight: 24,
    marginLeft: 8,
  },

  practiceCardWrap: {
    marginTop: 14,
  },

  pageSectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 28,
    marginBottom: 14,
  },

  sectionEyebrow: {
    color: GOLD,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },

  sectionTitle: {
    color: BROWN,
    fontSize: 24,
    fontWeight: "900",
    marginTop: 3,
  },

  sectionOrnament: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  sectionLine: {
    width: 20,
    height: 1,
    backgroundColor: "#D8B981",
  },

  sectionLotus: {
    color: GOLD,
    fontSize: 13,
    marginHorizontal: 6,
  },

  categorySection: {
    borderWidth: 1,
    borderRadius: 26,
    padding: 13,
    marginBottom: 16,
  },

  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 3,
    paddingVertical: 5,
    marginBottom: 12,
  },

  categoryIconWrap: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderColor: "rgba(201,149,81,0.28)",
    borderRadius: 18,
    marginRight: 12,
  },

  categoryIcon: {
    fontSize: 27,
  },

  categoryHeaderText: {
    flex: 1,
  },

  categoryEyebrow: {
    color: GOLD,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.1,
  },

  categoryTitle: {
    color: BROWN,
    fontSize: 21,
    fontWeight: "900",
    marginTop: 2,
  },

  categorySubtitle: {
    color: "#806B5A",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 3,
  },

  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  menuCard: {
    width: "48.5%",
    minHeight: 172,
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 22,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#6A4027",
    shadowOpacity: 0.07,
    shadowRadius: 9,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },

  menuCardPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.985 }],
  },

  menuIconWrap: {
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },

  menuIcon: {
    fontSize: 29,
  },

  menuTextWrap: {
    flex: 1,
    marginTop: 12,
  },

  menuTitle: {
    color: BROWN,
    fontSize: 17,
    fontWeight: "900",
    lineHeight: 21,
  },

  menuSubtitle: {
    color: "#7D6858",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },

  menuArrowWrap: {
    position: "absolute",
    right: 12,
    top: 15,
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7EEE3",
    borderRadius: 13,
  },

  menuArrow: {
    color: BROWN_SOFT,
    fontSize: 20,
    lineHeight: 21,
  },

  dailyCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: BROWN,
    borderWidth: 1,
    borderColor: "#8B634A",
    borderRadius: 24,
    padding: 18,
    marginTop: 2,
  },

  dailyIconWrap: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2D39B",
    borderRadius: 24,
    marginRight: 13,
  },

  dailyIcon: {
    color: BROWN,
    fontSize: 23,
  },

  dailyContent: {
    flex: 1,
  },

  dailyLabel: {
    color: GOLD_LIGHT,
    fontSize: 16,
    fontWeight: "900",
  },

  dailyText: {
    color: "#F4E7D4",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },

  footerQuote: {
    alignItems: "center",
    backgroundColor: "#F8EAD7",
    borderWidth: 1,
    borderColor: "#E6CBA4",
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 18,
    marginTop: 14,
  },

  footerQuoteMark: {
    alignSelf: "flex-start",
    color: GOLD,
    fontSize: 30,
    lineHeight: 25,
  },

  footerQuoteText: {
    color: BROWN_SOFT,
    fontSize: 14,
    lineHeight: 21,
    fontStyle: "italic",
    textAlign: "center",
  },

  footerQuoteMarkEnd: {
    alignSelf: "flex-end",
    color: GOLD,
    fontSize: 30,
    lineHeight: 25,
  },
});
