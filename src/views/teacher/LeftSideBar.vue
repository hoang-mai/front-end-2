<template>
  <aside
    class="bg-[var(--color-bg-white)] h-[calc(100vh-64px)] w-64 shadow-lg flex flex-col"
  >
    <nav class="flex-grow p-3 space-y-1">
      <RouterLink
        v-for="item in navItems"
        :key="item.link"
        :to="item.link"
        class="flex items-center px-4 py-3 rounded-md text-(--color-text-gray) transition-colors duration-200 hover:bg-gray-100 hover:text-[var(--color-text-red)]"
        active-class="bg-gray-100 text-[var(--color-text-red)] border-l-4 border-[var(--color-text-red)]"
      >
        <component :is="item.icon" class="mr-3 text-lg" />
        <span class="font-medium">{{ item.name }}</span>
      </RouterLink>
    </nav>

    <div class="p-4 border-t border-gray-200">
      <div class="flex items-center">
        <div
          class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
        >
          <span class="text-sm font-medium">A</span>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium">Admin User</p>
          <p class="text-xs text-gray-500">admin@example.com</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {
  HomeOutlined,
  ReadOutlined,
  CalendarOutlined,
} from "@ant-design/icons-vue";

const navItems = [
  { link: "", name: "Trang chủ", icon: HomeOutlined },
  { link: "/schedule", name: "Lịch học", icon: CalendarOutlined },
  { link: "/class", name: "Lớp học", icon: ReadOutlined },
];
</script>
