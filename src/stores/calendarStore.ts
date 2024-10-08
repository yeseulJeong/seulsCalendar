import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface Schedule {
  id: number;
  title: string;
  date: string;
  color: string;
  memo: string;
  joiner: [];
}

interface Day {
  key: string;
  date: number | null;
  schedules: Schedule[];
  isCurrentMonth: boolean;
}

export const useCalendarStore = defineStore('calendar', () => {
  const year = ref(new Date().getFullYear());
  const month = ref(new Date().getMonth());
  const weeks = ref<Day[][]>([]);
  const calendarDatas = ref<Schedule[]>([]);
  const selectedDate = ref<string | null>(null);
  const selectedDay = ref<number | null>(new Date().getDate());

  const filteredSchedules = computed(() => {
    return selectedDate.value
      ? calendarDatas.value.filter(schedule => schedule.date === selectedDate.value)
      : [];
  });

  const generateCalendar = () => {
    const daysInWeek: Day[][] = [];
    const currentWeek: Day[] = [];
    console.log(selectedDay);

    fillPrevMonthDays(currentWeek);
    fillCurrentMonthDays(currentWeek, daysInWeek);
    fillNextMonthDays(currentWeek, daysInWeek);

    weeks.value = daysInWeek;
  };

  const fillPrevMonthDays = (currentWeek: Day[]) => {
    const firstDayOfMonth = new Date(year.value, month.value, 1).getDay();
    const prevMonthLastDate = new Date(year.value, month.value, 0).getDate();

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      currentWeek.push(createDay(`prev-${prevMonthLastDate - i}`, prevMonthLastDate - i, false));
    }
  };

  const fillCurrentMonthDays = (currentWeek: Day[], daysInWeek: Day[][]) => {
    const lastDateOfMonth = new Date(year.value, month.value + 1, 0).getDate();

    for (let date = 1; date <= lastDateOfMonth; date++) {
      const schedules = getSchedulesForDate(date);
      currentWeek.push(createDay(`cur-${date}`, date, true, schedules));

      if (currentWeek.length === 7) {
        daysInWeek.push(currentWeek);
        currentWeek = [];
      }
    }
  };

  const fillNextMonthDays = (currentWeek: Day[], daysInWeek: Day[][]) => {
    let nextMonthDate = 1;
    while (currentWeek.length < 7) {
      currentWeek.push(createDay(`next-${nextMonthDate}`, nextMonthDate, false));
      nextMonthDate++;
    }
    if (currentWeek.length > 0) {
      daysInWeek.push(currentWeek);
    }
  };

  const createDay = (key: string, date: number, isCurrentMonth: boolean, schedules: Schedule[] = []): Day => {
    return { key, date, schedules, isCurrentMonth };
  };

  const getSchedulesForDate = (date: number): Schedule[] => {
    const formattedDate = `${year.value}-${String(month.value + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return calendarDatas.value.filter(schedule => schedule.date === formattedDate);
  };

  const prevMonth = () => {
    if (month.value === 0) {
      year.value--;
      month.value = 11;
    } else {
      month.value--;
    }
    generateCalendar();
  };

  const nextMonth = () => {
    if (month.value === 11) {
      year.value++;
      month.value = 0;
    } else {
      month.value++;
    }
    generateCalendar();
  };

  const selectDate = (date: string) => {
    selectedDate.value = date;
  };

  return {
    year,
    month,
    weeks,
    selectedDay,
    calendarDatas,
    generateCalendar,
    filteredSchedules,
    selectDate,
    prevMonth,
    nextMonth,
  };
});