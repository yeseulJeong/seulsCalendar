<script setup lang="ts">
import { ref, computed } from 'vue';
import ScheduleList from '@/views/scheduleList.vue';
import CommonCalendar from '@/components/calendar/CommonCalendar.vue';
import { useCalendarStore} from '@/stores/calendarStore';


interface Day{
  key:string;
  date: number | null;
  schedules:CalendarDatas[];
  isCurrentMonth:boolean;
}

const store = useCalendarStore();

const handleDateClick = (day: Day) => {
  store.selecteDate = day;
}
const filteredSchedules = computed(()=> {
  store.filteredSchedules
})


</script>

<template>
  <div class="calendar">
   <CommonCalendar
   @getDate="handleDateClick"/>
  </div>
  <!-- 타입 확인 및 자동완성 활성화 -->
  <ScheduleList :calendarDatas="filteredSchedules" />
</template>