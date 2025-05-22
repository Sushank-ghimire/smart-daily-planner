export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';

export type TaskCategory =
  | 'work'
  | 'personal'
  | 'health'
  | 'learning'
  | 'family'
  | 'finance'
  | 'other';

export type RecurrencePattern =
  | 'none'
  | 'daily'
  | 'weekdays'
  | 'weekends'
  | 'weekly'
  | 'monthly'
  | 'yearly';

export type NotificationPreference = {
  inApp: boolean;
  timeBefore: number;
};

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date | null;
  completed: boolean;
  completedAt?: Date | null;
  priority: PriorityLevel;
  category: TaskCategory;
  recurrence: RecurrencePattern;
  subtasks?: Subtask[];
  notificationPreferences: NotificationPreference;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  estimatedDuration?: number; // in minutes
  isHabit?: boolean;
  habitStreak?: number;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  taskId: string;
  title: string;
  body: string;
  scheduledTime: Date;
  isRead: boolean;
  type: 'reminder' | 'habit' | 'overdue' | 'achievement';
}

export interface CalendarEvent {
  id: string;
  taskId?: string; // Optional link to a task
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  color?: string;
  description?: string;
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  targetFrequency: 'daily' | 'weekly' | 'monthly';
  currentStreak: number;
  longestStreak: number;
  completionHistory: Date[];
  reminderTime?: Date;
  category: TaskCategory;
  createdAt: Date;
}

export interface AppData {
  tasks: Task[];
  completedTasks: Task[];
  habits: Habit[];
  notifications: Notification[];
  calendarEvents: CalendarEvent[];
  settings: {
    theme: 'light' | 'dark';
    defaultNotificationPreferences: NotificationPreference;
    startOfWeek: 'monday' | 'sunday';
    timeFormat: '12h' | '24h';
    dailyReviewTime?: Date;
    weeklyReviewDay?:
      | 'monday'
      | 'tuesday'
      | 'wednesday'
      | 'thursday'
      | 'friday'
      | 'saturday'
      | 'sunday';
  };
}

// Utility types for UI components
export type FilterOptions = {
  category?: TaskCategory;
  priority?: PriorityLevel;
  dueDate?: 'today' | 'tomorrow' | 'this-week' | 'next-week' | 'overdue' | 'no-date';
  completed?: boolean;
  searchQuery?: string;
};

export type SortOptions =
  | 'dueDate-asc'
  | 'dueDate-desc'
  | 'priority-asc'
  | 'priority-desc'
  | 'createdAt-asc'
  | 'createdAt-desc';
