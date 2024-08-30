<template>
    <div class="schedule_wrap">
        <div class="schedule_left">
            <div class="user_color"></div>
        </div>
        <div class="schedule_right">
            <div class="title">
                <h4>{{ calendar.title }}</h4>
            </div>
            <div class="date">
                <p>{{ calendar.date }}</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{
    calendar: {
        title: string;
        date: string;
    };
}>();
</script>