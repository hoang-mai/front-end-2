<template>
  <header
    class="relative bg-(--color-bg-red) text-(--color-text-white) p-4 flex justify-center items-center w-full"
  >
    <p class="text-2xl font-bold">Hệ thống thông tin trường học</p>

    <a-tooltip
      placement="left"
      color="var(--color-text-red)"
      class="absolute right-4 flex items-center cursor-pointer"
    >
      <template #title>
        <p v-if="userStore.userState && userStore.userState.fullName">
          {{ userStore.userState.fullName }}
        </p>
        <p v-else>Nguyen Van A</p>
      </template>
      <a-dropdown
        placement="bottomRight"
        :arrow="{ pointAtCenter: true }"
        :trigger="['click']"
      >
        <img
          v-if="userStore.userState && userStore.userState.avatarUrl"
          :src="userStore.userState.avatarUrl"
          alt="Avatar"
          class="w-9 h-9 rounded-full"
        />
        <div
          v-else
          class="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center"
        >
          <component :is="UserOutlined" class="text-xl" />
        </div>
        <template #overlay>
          <a-menu class="!p-2">
            <a-menu-item class="hover:!text-[var(--color-text-red)]">
              <RouterLink to="/profile">
                <div class="flex items-center gap-1 text-base">
                  <UserOutlined />
                  <span>Thông tin cá nhân</span>
                </div>
              </RouterLink>
            </a-menu-item>
            <a-menu-item class="hover:!text-[var(--color-text-red)]">
              <RouterLink to="/login">
                <div class="flex items-center gap-1 text-base">
                  <LogoutOutlined />
                  <span>Đăng xuất</span>
                </div>
              </RouterLink>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-tooltip>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons-vue";
import { RouterLink } from "vue-router";

const userStore = useUserStore();
</script>
