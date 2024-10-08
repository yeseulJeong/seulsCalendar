
  
  <script setup lang="ts">
import { reactive, defineEmits, ref } from 'vue';
import { useCalendarStore } from '@/stores/calendarStore';  
import { storeToRefs } from 'pinia';
  
  
const emit = defineEmits(['getDate'])
const calendarStore = useCalendarStore();

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
const nowYear = new Date().getFullYear();
const showPopup = ref(false);
const years = Array.from({ length: 50 }, (_, index) => nowYear - 25 + index);
const months = Array.from({ length: 12 }, (_, index) => index + 1);
const selectedYear = ref(calendarStore.year);
const selectedMonth = ref(calendarStore.month + 1);

const togglePopup = () => {
    showPopup.value = !showPopup.value;
}
const checkCalendar = (day:object) => {
    if(day.date) {  
        const dateString = `${calendarStore.year}-${calendarStore.month +1}-${day.date}`
        calendarStore.selectDate(dateString)
        emit('getDate',day)
    }
}
const updateYear = () => {
    calendarStore.year=selectedYear.value;
    calendarStore.month=selectedMonth.value - 1;
    calendarStore.generateCalendar();
    showPopup.value = false;
}

calendarStore.generateCalendar();
  </script>
  <template>
    <div class="calendar">
      <div class="calendar__header">
        <label id="scrollYear" class="calendar__title" @click="togglePopup()">{{ calendarStore.year }}년 {{ calendarStore.month + 1 }}월</label>
        <div class="calendar__move__month">
          <button class="calendar__button" @click="calendarStore.prevMonth">이전</button>
          <button class="calendar__button" @click="calendarStore.nextMonth">다음</button>
        </div>
      </div>
      <div class="calendar__weekdays">
        <div class="calendar__weekday" v-for="(weekday, index) in weekdays" :key="index">
          {{ weekday }}
        </div>
      </div>
      <div class="calendar__body">
        <div class="calendar__week" v-for="(week, weekIndex) in calendarStore.weeks" :key="weekIndex">
          <div
            class="calendar__day"
            v-for="day in week"
            :key="day.key"
            :class="{ 'calendar__day--empty': !day.date, 'calendar__day--current': day.isCurrentMonth }"
            @click="checkCalendar(day)"
          >
            <div class="calendar__date" v-if="day.date">{{ day.date }}</div>
            <div class="calendar__schedules" v-if="day.date">
              <div
                v-for="schedule in day.schedules"
                :key="schedule.id"
                :style="{ backgroundColor: schedule.color }"
                class="calendar__schedule-dot"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showPopup" class="popup">
      <div class="popup_wrap">
        <h3>{{ selectedYear }}년 {{ selectedMonth }}월</h3>
        <div class="select__wrap">
          <select v-model="selectedYear">
            <option v-for="year in years" :key="year" :value="year">{{ year }}년</option>
          </select>
          <select v-model="selectedMonth" >
            <option v-for="month in months" :key="month" :value="month">{{ month }}월</option>
          </select>
        </div>
        <button @click="togglePopup()">닫기</button>
        <button @click="updateYear()">적용</button>
      </div>
    </div>

  </template>


  <style scoped>
  .calendar {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .calendar__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .calendar__button {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .calendar__title {
    font-size: 1.125rem;
    font-weight: bold;
  }
  
  .calendar__weekdays {
    display: flex;
  }
  
  .calendar__weekday {
    width: calc(100% / 7);
    text-align: center;
    font-weight: bold;
  }
  
  .calendar__body {
    display: flex;
    flex-direction: column;
  }
  
  .calendar__week {
    display: flex;
  }
  
  .calendar__day {
    width: calc(100% / 7);
    border: 1px solid #ddd;
    box-sizing: border-box;
  }
  
  .calendar__day--empty {
    background-color: #f5f5f5;
  }
  
  .calendar__day--current {
    background-color: #fff;
  }
  
  .calendar__date {
    text-align: center;
  }
  
  .calendar__schedules {
    display: flex;
    justify-content: center;
  }
  
  .calendar__schedule-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin: 1px;
  }
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .popup_wrap {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
  }
  </style>