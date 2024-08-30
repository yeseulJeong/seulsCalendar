<script setup lang="ts">
import { RouterView } from 'vue-router'

import CommonHeader from './components/common/CommonHeader.vue';
</script>

<template>
  <header>

    <CommonHeader />
    
  </header>

  <RouterView />
</template>

<style scoped>
</style>
