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
        <img
          v-if="userStore.userState && userStore.userState.avatarUrl"
          :src="userStore.userState.avatarUrl"
          alt="Avatar"
          class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center"
        />
        <div
          v-else
          class="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center"
        >
          <component :is="UserOutlined" class="text-xl" />
        </div>
        <RouterLink to="/profile">
          <div class="ml-3">
            <p class="text-sm font-medium">
              {{
                userStore.userState
                  ? userStore.userState.fullName
                  : "Nguyen Van A"
              }}
            </p>
            <p class="text-xs text-gray-500">
              {{
                userStore.userState
                  ? userStore.userState.email
                  : "nguyenvana@example.com"
              }}
            </p>
          </div>
        </RouterLink>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {
  HomeOutlined,
  ReadOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { useUserStore } from "@/stores/user";

const navItems = [
  { link: "", name: "Trang chủ", icon: HomeOutlined },
  { link: "/schedule", name: "Lịch học", icon: CalendarOutlined },
  { link: "/class", name: "Lớp học", icon: ReadOutlined },
];

const userStore = useUserStore();
</script>
