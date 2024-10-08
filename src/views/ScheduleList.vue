
<script setup lang="ts">
import { defineProps } from 'vue';
import ScheduleItem from '@/components/calendar/ScheduleItem.vue'
import { useCalendarStore } from '@/stores/calendarStore';


const calendarStore = useCalendarStore(); 
// defineProps<{
//     calendarDatas: [{
//         id: number;
//         title: string;
//         date: string;
//     }];

// }>();

</script>
<template>
    <div class="schedule-header">
        <div class="header__top">
            <h3>{{calendarStore.month+1}}월{{ calendarStore.selectedDay }}일</h3>
            <button @click="AddSchedule()">Add</button>
        </div>
        <h4>일정 목록</h4>
    </div>
    <section id="schedule-list">
        <ul v-if="calendarStore.calendarDatas.length != 0">
            <li v-for="row in calendarStore.calendarDatas" :key="row.id">
                <ScheduleItem
                 :calendar="row"/>    
            </li>
        </ul>
        <div else>
            <p>일정이 없습니다.</p>
        </div>
    </section>
</template>

<style scoped>
.schedule-header {
    color: #2e2e2e;
    padding: 20px;
    border-bottom: 1px solid #e0e0e0;
}
.header__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.schedule-header h3 {
    font-size: 24px;
    font-weight: 700;
}
.schedule-header button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
}
.schedule-header h4 {
    font-size: 18px;
    font-weight: 700;
}
#schedule-list {
    padding: 20px;
}
</style>