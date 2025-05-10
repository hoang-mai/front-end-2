<template>
    <div class="flex flex-col max-w-[1920px] mx-auto">
        <Header />
        <RouterView />
    </div>

</template>

<script setup lang="ts">
import Header from './Header.vue';
import { RouterView } from 'vue-router';
</script>
