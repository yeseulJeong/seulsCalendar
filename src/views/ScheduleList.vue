
<script setup lang="ts">
import { defineProps } from 'vue';
import ScheduleItem from '@/components/calendar/ScheduleItem.vue'

defineProps<{
    calendarDatas: [{
        id: number;
        title: string;
        date: string;
    }];
}>();

</script>
<template>
    <section id="schedule-list">
        <ul>
            <li v-for="row in calendarDatas" :key="row.id">
                <ScheduleItem
                 :calendar="row"/>    
            </li>
    </ul>
    </section>
</template>

