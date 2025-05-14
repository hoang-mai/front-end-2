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
              <button
                class="flex items-center gap-1 text-base"
                @click="open = true"
              >
                <LockOutlined />
                <span>Đổi mật khẩu</span>
              </button>
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
  <a-modal v-model:open="open" @ok="handleChangePassword">
    <template #closeIcon>
      <span
        class="w-8 h-8 flex items-center justify-center !hover:rounded-full hover:bg-gray-200 transition-all"
      >
        <CloseOutlined class="text-lg" />
      </span>
    </template>

    <template #title>
      <div class="text-center text-(--color-text-red) font-bold text-2xl">
        Đổi mật khẩu
      </div>
      <hr class="my-2 border-(--color-border-gray)" />
    </template>
    <form ref="form" class="flex flex-col">
      <div class="flex flex-col gap-2 mb-4">
        <label for="oldPassword" class="text-base font-medium">
          Mật khẩu cũ<strong class="text-red-500">*</strong>
        </label>
        <a-input-password
          v-model:value="oldPassword"
          :placeholder="'Nhập mật khẩu cũ'"
          :size="'large'"
          :prefix-icon="LockOutlined"
          :show-password="true"
          :style="{ borderColor: 'var(--color-border-gray)' }"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="newPassword" class="text-base font-medium">
          Mật khẩu mới<strong class="text-red-500">*</strong>
        </label>
        <div>
          <a-input-password
            v-model:value="newPassword"
            :placeholder="'Nhập mật khẩu mới'"
            :size="'large'"
            :style="{ borderColor: 'var(--color-border-gray)' }"
            :prefix-icon="LockOutlined"
            :show-password="true"
          />
          <p
            v-if="newPassword.length > 0 && newPassword.length < 6"
            class="text-red-500 text-sm"
          >
            Mật khẩu phải có ít nhất 6 ký tự
          </p>
          <p v-else class="h-5"></p>
        </div>
      </div>
      <div class="flex flex-col gap-2 mb-4">
        <label for="confirmPassword" class="text-base font-medium">
          Xác nhận mật khẩu mới<strong class="text-red-500">*</strong>
        </label>
        <div>
          <a-input-password
            v-model:value="confirmPassword"
            :placeholder="'Xác nhận mật khẩu mới'"
            :size="'large'"
            :prefix-icon="LockOutlined"
            :style="{ borderColor: 'var(--color-border-gray)' }"
            :show-password="true"
            autocomplete="off"
          />
          <p v-if="confirmPassword !== newPassword" class="text-red-500 text-sm">
            Mật khẩu xác nhận không khớp
          </p>
          <p v-else class="h-5"></p>
        </div>
      </div>
    </form>
    <template #footer>
      <button
        class="bg-(--color-bg-white) text-(--color-text-red) px-6 py-2 rounded-2xl mr-4 border text-base font-medium"
        @click="handleCancel"
      >
        Hủy bỏ
      </button>
      <button
        class="bg-(--color-text-red) text-(--color-text-white) px-6 py-2 rounded-2xl text-base font-medium"
      >
        Lưu mật khẩu
      </button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import {
  UserOutlined,
  LogoutOutlined,
  LockOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import { AutoComplete } from "ant-design-vue";
import { autoCompleteProps } from "ant-design-vue/es/auto-complete";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { toast } from "vue3-toastify";
const loading = ref<boolean>(false);
const open = ref<boolean>(false);
const form = ref();
const oldPassword = ref<string>("");
const newPassword = ref<string>("");
const confirmPassword = ref<string>("");

const handleCancel = () => {
  open.value = false;
};
const validateConfirmPassword = (rule: any, value: string) => {
  if (value !== newPassword.value) {
    return Promise.reject("Mật khẩu xác nhận không khớp");
  }
  return Promise.resolve();
};
const handleChangePassword = () => {
  loading.value = true;

  toast.success("Đổi mật khẩu thành công");

  loading.value = false;
  open.value = false;
};

const userStore = useUserStore();
</script>
