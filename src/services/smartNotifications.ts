import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  RepeatFrequency,
  TriggerType,
  type TimestampTrigger,
} from '@notifee/react-native';

import {
  getUpcomingBuddhistEvents,
} from './buddhistCalendar';
import {
  getPracticeStats,
  getTodayPractice,
} from './practice';

export type SmartReminderTime = {
  hour: number;
  minute: number;
};

export type SmartNotificationSettings = {
  enabled: boolean;
  dailyPracticeEnabled: boolean;
  dailyPracticeTime: SmartReminderTime;
  streakProtectionEnabled: boolean;
  streakProtectionTime: SmartReminderTime;
  buddhistCalendarEnabled: boolean;
  buddhistCalendarTime: SmartReminderTime;
};

const STORAGE_KEY =
  '@online_pagoda/smart_notification_settings_v1';

const CHANNEL_ID = 'spiritual-practice';

const DAILY_ID = 'daily-practice-reminder';
const STREAK_ID = 'streak-protection-reminder';
const BUDDHIST_PREFIX = 'buddhist-calendar-';

export const DEFAULT_SMART_NOTIFICATION_SETTINGS: SmartNotificationSettings = {
  enabled: true,
  dailyPracticeEnabled: true,
  dailyPracticeTime: {
    hour: 20,
    minute: 0,
  },
  streakProtectionEnabled: true,
  streakProtectionTime: {
    hour: 21,
    minute: 30,
  },
  buddhistCalendarEnabled: true,
  buddhistCalendarTime: {
    hour: 7,
    minute: 0,
  },
};

export async function getSmartNotificationSettings(): Promise<SmartNotificationSettings> {
  try {
    const raw = await AsyncStorage.getItem(
      STORAGE_KEY,
    );

    if (!raw) {
      return DEFAULT_SMART_NOTIFICATION_SETTINGS;
    }

    return {
      ...DEFAULT_SMART_NOTIFICATION_SETTINGS,
      ...(JSON.parse(
        raw,
      ) as Partial<SmartNotificationSettings>),
    };
  } catch {
    return DEFAULT_SMART_NOTIFICATION_SETTINGS;
  }
}

export async function saveSmartNotificationSettings(
  settings: SmartNotificationSettings,
): Promise<void> {
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(settings),
  );
}

async function ensureChannel(): Promise<void> {
  await notifee.createChannel({
    id: CHANNEL_ID,
    name: 'Spiritual Practice',
    importance: AndroidImportance.DEFAULT,
  });
}

function nextTimestamp(
  time: SmartReminderTime,
): number {
  const now = new Date();
  const next = new Date();

  next.setHours(
    time.hour,
    time.minute,
    0,
    0,
  );

  if (next.getTime() <= now.getTime()) {
    next.setDate(next.getDate() + 1);
  }

  return next.getTime();
}

export async function requestNotificationPermission(): Promise<boolean> {
  const settings =
    await notifee.requestPermission();

  return (
    settings.authorizationStatus ===
      AuthorizationStatus.AUTHORIZED ||
    settings.authorizationStatus ===
      AuthorizationStatus.PROVISIONAL
  );
}

async function cancelManagedNotifications(): Promise<void> {
  const ids =
    await notifee.getTriggerNotificationIds();

  const managed = ids.filter(
    id =>
      id === DAILY_ID ||
      id === STREAK_ID ||
      id.startsWith(
        BUDDHIST_PREFIX,
      ),
  );

  await Promise.all(
    managed.map(id =>
      notifee.cancelTriggerNotification(
        id,
      ),
    ),
  );
}

async function scheduleDailyPractice(
  settings: SmartNotificationSettings,
  title: string,
  body: string,
): Promise<void> {
  if (
    !settings.enabled ||
    !settings.dailyPracticeEnabled
  ) {
    return;
  }

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: nextTimestamp(
      settings.dailyPracticeTime,
    ),
    repeatFrequency:
      RepeatFrequency.DAILY,
  };

  await notifee.createTriggerNotification(
    {
      id: DAILY_ID,
      title,
      body,
      android: {
        channelId: CHANNEL_ID,
        pressAction: {
          id: 'default',
          launchActivity: 'default',
        },
      },
      data: {
        route: 'DailyRitual',
      },
    },
    trigger,
  );
}

async function scheduleStreakProtection(
  settings: SmartNotificationSettings,
  title: string,
  body: string,
): Promise<void> {
  if (
    !settings.enabled ||
    !settings.streakProtectionEnabled
  ) {
    return;
  }

  const stats = await getPracticeStats();
  const today = await getTodayPractice();

  const completedToday =
    Object.values(
      today.activities,
    ).some(Boolean);

  if (
    stats.currentStreak <= 0 ||
    completedToday
  ) {
    return;
  }

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: nextTimestamp(
      settings.streakProtectionTime,
    ),
  };

  await notifee.createTriggerNotification(
    {
      id: STREAK_ID,
      title,
      body,
      android: {
        channelId: CHANNEL_ID,
        pressAction: {
          id: 'default',
          launchActivity: 'default',
        },
      },
      data: {
        route: 'DailyRitual',
      },
    },
    trigger,
  );
}

async function scheduleBuddhistDates(
  settings: SmartNotificationSettings,
  titleFactory: (
    day: number,
    month: number,
  ) => string,
  bodyFactory: (
    eventTitleKey: string,
  ) => string,
): Promise<void> {
  if (
    !settings.enabled ||
    !settings.buddhistCalendarEnabled
  ) {
    return;
  }

  const upcoming =
    getUpcomingBuddhistEvents(
      new Date(),
      120,
    ).slice(0, 18);

  await Promise.all(
    upcoming.map(async day => {
      const when = new Date(day.date);

      when.setDate(when.getDate() - 1);
      when.setHours(
        settings.buddhistCalendarTime
          .hour,
        settings.buddhistCalendarTime
          .minute,
        0,
        0,
      );

      if (
        when.getTime() <= Date.now()
      ) {
        return;
      }

      const firstEvent =
        day.events[0];

      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: when.getTime(),
      };

      await notifee.createTriggerNotification(
        {
          id: `${BUDDHIST_PREFIX}${day.solarDateKey}`,
          title: titleFactory(
            day.lunarDay,
            day.lunarMonth,
          ),
          body: bodyFactory(
            firstEvent.titleKey,
          ),
          android: {
            channelId: CHANNEL_ID,
            pressAction: {
              id: 'default',
              launchActivity:
                'default',
            },
          },
          data: {
            route:
              'BuddhistCalendar',
          },
        },
        trigger,
      );
    }),
  );
}

export type SmartNotificationCopy = {
  dailyTitle: string;
  dailyBody: string;
  streakTitle: string;
  streakBody: string;
  buddhistTitle: (
    day: number,
    month: number,
  ) => string;
  buddhistBody: (
    eventTitleKey: string,
  ) => string;
};

export async function refreshSmartNotifications(
  copy: SmartNotificationCopy,
): Promise<void> {
  const settings =
    await getSmartNotificationSettings();

  await ensureChannel();
  await cancelManagedNotifications();

  if (!settings.enabled) {
    return;
  }

  await scheduleDailyPractice(
    settings,
    copy.dailyTitle,
    copy.dailyBody,
  );

  await scheduleStreakProtection(
    settings,
    copy.streakTitle,
    copy.streakBody,
  );

  await scheduleBuddhistDates(
    settings,
    copy.buddhistTitle,
    copy.buddhistBody,
  );
}
