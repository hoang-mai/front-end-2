<template>
    <div class="flex flex-col max-w-[1920px] mx-auto">
        <Header />
        <main class="mt-16">
            <RouterView />
        </main>
    </div>

</template>

<script setup lang="ts">
import Header from './Header.vue';
import { RouterView } from 'vue-router';
</script>
