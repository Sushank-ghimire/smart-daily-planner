import { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import ThemeBackground from "~/components/ThemeBackground";
import ThemeText from "~/components/Text";
import { useThemeStore } from "~/store/theme";
import { AntDesign } from "@expo/vector-icons";

const CalendarPage = () => {
  const { theme } = useThemeStore();

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);

  const today = new Date().toISOString().split("T")[0];

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  return (
    <ThemeBackground>
      <ScrollView className="p-4">
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
      </ScrollView>
    </ThemeBackground>
  );
};

export default CalendarPage;
