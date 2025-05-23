import { SQLiteProvider } from "expo-sqlite";

const schema = `
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  dueDate TEXT,
  completed INTEGER NOT NULL,
  completedAt TEXT,
  priority TEXT NOT NULL,
  category TEXT NOT NULL,
  recurrence TEXT NOT NULL,
  notificationInApp INTEGER NOT NULL,
  notificationTimeBefore INTEGER NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  tags TEXT,
  estimatedDuration INTEGER,
  isHabit INTEGER,
  habitStreak INTEGER
);

CREATE TABLE IF NOT EXISTS subtasks (
  id TEXT PRIMARY KEY,
  taskId TEXT NOT NULL,
  title TEXT NOT NULL,
  completed INTEGER NOT NULL,
  createdAt TEXT NOT NULL,
  FOREIGN KEY (taskId) REFERENCES tasks(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  taskId TEXT,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  scheduledTime TEXT NOT NULL,
  isRead INTEGER NOT NULL,
  type TEXT NOT NULL,
  FOREIGN KEY (taskId) REFERENCES tasks(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS calendar_events (
  id TEXT PRIMARY KEY,
  taskId TEXT,
  title TEXT NOT NULL,
  start TEXT NOT NULL,
  end TEXT NOT NULL,
  allDay INTEGER NOT NULL,
  color TEXT,
  description TEXT,
  FOREIGN KEY (taskId) REFERENCES tasks(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS habits (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  targetFrequency TEXT NOT NULL,
  currentStreak INTEGER NOT NULL,
  longestStreak INTEGER NOT NULL,
  completionHistory TEXT NOT NULL,
  reminderTime TEXT,
  category TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

`;

const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SQLiteProvider
      onInit={async (db) => {
        try {
          await db.execAsync(schema);
        } catch (error) {
          console.error("Database init error:", error);
        }
      }}
      onError={(error) => {
        if (error instanceof Error) {
          throw Error(error.message);
        }
        throw Error(error);
      }}
      options={{ useNewConnection: false }}
      databaseName="planner.db">
      {children}
    </SQLiteProvider>
  );
};

export default DatabaseProvider;
