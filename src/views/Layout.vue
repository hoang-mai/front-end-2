<template>
    <div class="flex flex-col max-w-[1920px] mx-auto">
        <main class="mt-16">
            <RouterView />
        </main>
    </div>

</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>
