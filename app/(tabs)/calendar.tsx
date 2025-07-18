import { useState } from "react";
import { View, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Calendar } from "react-native-calendars";
import ThemeBackground from "~/components/ThemeBackground";
import ThemeText from "~/components/Text";
import { useThemeStore } from "~/store/theme";
import { useSQLiteContext } from "expo-sqlite";
import { AntDesign } from "@expo/vector-icons";
import { PriorityLevel, RecurrencePattern, TaskCategory } from "~/types";
import Button from "~/components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";

const CalendarPage = () => {
  const db = useSQLiteContext();
  const { theme } = useThemeStore();
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [loading, setLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);

  const today = new Date().toISOString().split("T")[0];

  const handleTimeChange = (_: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) setTime(selectedTime);
  };

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    priority: "medium" as PriorityLevel,
    category: "work" as TaskCategory,
    recurrence: "daily" as RecurrencePattern,
  });

  const addData = async () => {
    const { title, description, priority, category, recurrence } = formState;
    setLoading(true);
    try {
      await db.runAsync(
        `INSERT INTO tasks (
        id,
        title,
        description,
        dueDate,
        completed,
        completedAt,
        priority,
        category,
        recurrence,
        notificationInApp,
        notificationTimeBefore,
        createdAt,
        updatedAt,
        tags,
        estimatedDuration,
        isHabit,
        habitStreak
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          Date.now().toString(), // id
          title, // title
          description, // description
          selectedDate, // dueDate
          0, // completed (false)
          null, // completedAt
          priority, // priority
          category, // category
          recurrence, // recurrence
          1, // notificationInApp (true)
          30, // notificationTimeBefore (default)
          new Date().toISOString(), // createdAt
          new Date().toISOString(), // updatedAt
          "", // tags (empty for now)
          null, // estimatedDuration
          1, // isHabit (false)
          0, // habitStreak
        ]
      );

      Alert.alert("Success", "Task added to database!");

      // Reset the form state
      setFormState({
        title: "",
        description: "",
        priority: "medium",
        category: "work",
        recurrence: "daily",
      });
    } catch (error) {
      console.error("Error inserting task:", error);
      Alert.alert("Error", "Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    const { title, description } = formState;
    if (!title.trim() || !description.trim()) {
      Alert.alert("Validation Error", "Task title is required.");
      return;
    }
    await addData();
  };

  return (
    <ThemeBackground>
      <ScrollView
        className="flex flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        <Calendar
          minDate={today}
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: theme.colors.primary,
            },
          }}
          hideExtraDays
          theme={{
            calendarBackground: theme.colors.background,
            dayTextColor: theme.colors.textPrimary,
            monthTextColor: theme.colors.textPrimary,
            arrowColor: theme.colors.primary,
            todayTextColor: theme.colors.primary,
            selectedDayBackgroundColor: theme.colors.primary,
            textDisabledColor: "#d9e1e8",
            dotColor: theme.colors.primary,
            indicatorColor: theme.colors.primary,
            textDayFontFamily: "System",
            textMonthFontFamily: "System",
            textDayHeaderFontFamily: "System",
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
            arrowWidth: 30,
            arrowHeight: 30,
          }}
        />

        <View className="mb-2 mt-6 flex-row items-center justify-between">
          <ThemeText className="text-lg font-semibold">Plans on {selectedDate}</ThemeText>
          <TouchableOpacity
            className={`bg-primary flex-row items-center justify-center rounded-full p-2`}
            onPress={() => {}}>
            <AntDesign
              name="plus"
              className="font-bold"
              size={20}
              color={theme.colors.textPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* User Data Form To Fillup for the events and the date to do the work */}
        <View className="flex flex-col gap-3">
          <TextInput
            placeholder="Title"
            value={formState.title}
            onChangeText={(text) => setFormState((prev) => ({ ...prev, title: text }))}
            placeholderTextColor="#888"
            style={{
              borderColor: theme.colors.border,
              borderWidth: 2,
              color: theme.colors.textPrimary,
            }}
            className="rounded-md bg-white/10 p-3 text-base"
          />
          <TextInput
            placeholder="Description"
            value={formState.description}
            onChangeText={(text) => setFormState((prev) => ({ ...prev, description: text }))}
            placeholderTextColor="#888"
            multiline
            numberOfLines={3}
            style={{
              borderColor: theme.colors.border,
              borderWidth: 2,
              color: theme.colors.textPrimary,
            }}
            className="rounded-md bg-white/10 p-3 text-base"
          />
          <View
            style={{ backgroundColor: theme.colors.picker2 }}
            className="mb-2 flex flex-col rounded-md ">
            <Picker
              style={{
                color: theme.colors.textPrimary,
                borderRadius: 15,
              }}
              itemStyle={{
                borderRadius: 15,
              }}
              selectedValue={formState.priority}
              dropdownIconColor={theme.colors.textPrimary}
              onValueChange={(value) => setFormState((prev) => ({ ...prev, priority: value }))}>
              <Picker.Item label="Low" value="low" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="High" value="high" />
              <Picker.Item label="Urgent" value="urgent" />
            </Picker>
          </View>
          <View style={{ backgroundColor: theme.colors.picker1 }} className="mb-2 rounded-md">
            <Picker
              style={{
                color: theme.colors.textPrimary,
                borderRadius: 15,
              }}
              dropdownIconColor={theme.colors.textPrimary}
              itemStyle={{
                borderRadius: 15,
              }}
              selectedValue={formState.category}
              onValueChange={(value) => setFormState((prev) => ({ ...prev, category: value }))}>
              <Picker.Item label="Work" value="work" />
              <Picker.Item label="Personal" value="personal" />
              <Picker.Item label="Health" value="health" />
              <Picker.Item label="Learning" value="learning" />
              <Picker.Item label="Family" value="family" />
              <Picker.Item label="Finance" value="finance" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>

          <View className="mb-2 rounded-md bg-violet-400 dark:bg-violet-600">
            <Picker
              style={{ color: theme.colors.textPrimary }}
              selectedValue={formState.recurrence}
              dropdownIconColor={theme.colors.textPrimary}
              onValueChange={(value) => setFormState((prev) => ({ ...prev, recurrence: value }))}>
              <Picker.Item label="None" value="none" />
              <Picker.Item label="Daily" value="daily" />
              <Picker.Item label="Weekdays" value="weekdays" />
              <Picker.Item label="Weekends" value="weekends" />
              <Picker.Item label="Weekly" value="weekly" />
              <Picker.Item label="Monthly" value="monthly" />
              <Picker.Item label="Yearly" value="yearly" />
            </Picker>
          </View>

          {/* Time Selector */}
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            style={{
              borderColor: theme.colors.border,
              borderWidth: 2,
            }}
            className="rounded-md bg-white/10 p-3">
            <ThemeText className="text-base text-white">
              {`Select Time: ${time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
            </ThemeText>
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )}

          <Button
            label="Add Your Plan"
            disabled={
              !formState.title ||
              !formState.description ||
              !formState.priority ||
              !formState.category ||
              !formState.recurrence
            }
            loading={loading}
            onPress={handleAddTask}
            className="rounded-md"
          />
        </View>
      </ScrollView>
    </ThemeBackground>
  );
};

export default CalendarPage;
