<template>
  <a-modal
    v-bind:open="open"
    @update:open="emit('update:open', false)"
    :width="800"
  >
    <template #closeIcon>
      <span
        class="w-8 h-8 flex items-center justify-center !hover:rounded-full hover:bg-gray-200 transition-all"
      >
        <CloseOutlined class="text-lg" />
      </span>
    </template>
    <template #title>
      <div class="text-center text-(--color-text-red) font-bold text-2xl">
        Chỉnh sửa thông tin
      </div>
      <hr class="my-2 border-(--color-border-gray)" />
    </template>
    <div class="flex flex-col items-center max-h-150 overflow-y-auto">
      <div class="flex flex-col items-center w-full">
        <div
          class="flex items-center w-full text-(--color-text-red) font-bold text-lg gap-2"
        >
          <UserOutlined />Thông tin cá nhân
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <IdcardOutlined class="!text-gray-500" />
            <span>Số CCCD</span>
          </div>
          <input
            type="text"
            class="border border-(--color-border-gray) rounded-lg px-4 py-2 w-2/3 outline-none transition-colors focus:shadow-sm duration-300"
            v-model="cloneProfile.idCardNumber"
            placeholder="Nhập số CCCD"
            @input="e => {
                            const target = e.target as HTMLInputElement;
                            if (target) { target.value = target.value.replace(/\D/g, ''); cloneProfile.idCardNumber = target.value; }
                        }"
          />
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <BankOutlined class="!text-gray-500" />
            <span>Nơi cấp</span>
          </div>
          <input
            type="text"
            class="border border-(--color-border-gray) rounded-lg px-4 py-2 w-2/3 outline-none transition-colors focus:shadow-sm duration-300"
            v-model="cloneProfile.idCardPlaceOfIssue"
            placeholder="Nơi cấp"
          />
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <PhoneOutlined class="!text-gray-500" />
            <span>Số điện thoại</span>
          </div>
          <input
            type="text"
            class="border border-(--color-border-gray) rounded-lg px-4 py-2 w-2/3 outline-none transition-colors focus:shadow-sm duration-300"
            v-model="cloneProfile.phoneNumber"
            placeholder="Số điện thoại"
            maxlength="10"
            @input="e => {
                            const target = e.target as HTMLInputElement;
                            if (target) {
                                target.value = target.value.replace(/\D/g, '').slice(0, 10);
                                cloneProfile.phoneNumber = target.value;
                            }
                        }"
          />
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <EnvironmentOutlined class="!text-gray-500" />
            <span>Nơi cư trú</span>
          </div>
          <input
            type="text"
            class="border border-(--color-border-gray) rounded-lg px-4 py-2 w-2/3 outline-none transition-colors focus:shadow-sm duration-300"
            v-model="cloneProfile.residence"
            placeholder="Nơi cư trú"
          />
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <CalendarOutlined class="!text-gray-500" />
            <span>Ngày Sinh</span>
          </div>
          <a-config-provider :locale="viVN">
            <a-date-picker
              v-model:value="cloneProfile.dateOfBirth"
              class="w-2/3 h-10 !border !border-(--color-border-gray) !rounded-lg !outline-none !transition-colors focus:!shadow-sm !duration-300"
              :inputReadOnly="true"
              placeholder="Nhập ngày sinh"
              :format="'DD/MM/YYYY'"
            >
            </a-date-picker>
          </a-config-provider>
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <ContactsOutlined class="!text-gray-500" />
            <span>Giới Tính</span>
          </div>
          <a-select
            ref="select"
            v-model:value="cloneProfile.gender"
            :placeholder="'Chọn giới tính'"
            size="large"
            class="w-2/3"
          >
            <a-select-option value="Nam">Nam</a-select-option>
            <a-select-option value="Nữ">Nữ</a-select-option>
            <a-select-option value="Khác">Khác</a-select-option>
          </a-select>
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <GlobalOutlined class="!text-gray-500" />
            <span>Dân Tộc</span>
          </div>
          <input
            type="text"
            class="border border-(--color-border-gray) rounded-lg px-4 py-2 w-2/3 outline-none transition-colors focus:shadow-sm duration-300"
            v-model="cloneProfile.ethnicity"
            placeholder="Dân tộc"
          />
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <HomeOutlined class="!text-gray-500" />
            <span>Địa Chỉ</span>
          </div>
          <input
            type="text"
            class="border border-(--color-border-gray) rounded-lg px-4 py-2 w-2/3 outline-none transition-colors focus:shadow-sm duration-300"
            v-model="cloneProfile.address"
            placeholder="Địa chỉ"
          />
        </div>
      </div>
      <div class="flex flex-col items-center w-full">
        <div
          class="flex items-center w-full text-(--color-text-red) font-bold text-lg gap-2"
        >
          <TeamOutlined />Thông tin bố
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <UserOutlined class="!text-gray-500" />
            <span>Họ và Tên</span>
          </div>
          <input
            type="text"
            class="border border-(--color-border-gray) rounded-lg px-4 py-2 w-2/3 outline-none transition-colors focus:shadow-sm duration-300"
            v-model="cloneProfile.fatherName"
            placeholder="Họ và tên bố"
          />
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <PhoneOutlined class="!text-gray-500" />
            <span>Điện Thoại</span>
          </div>
          <input
            type="text"
            class="border border-(--color-border-gray) rounded-lg px-4 py-2 w-2/3 outline-none transition-colors focus:shadow-sm duration-300"
            v-model="cloneProfile.fatherPhone"
            placeholder="Điện thoại bố"
            maxlength="10"
            @input="e => {
                            const target = e.target as HTMLInputElement;
                            if (target) {
                                target.value = target.value.replace(/\D/g, '').slice(0, 10);
                                cloneProfile.fatherPhone = target.value;
                            }
                        }"
          />
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <MailOutlined class="!text-gray-500" />
            <span>Email</span>
          </div>
          <input
            type="email"
            class="border border-(--color-border-gray) rounded-lg px-4 py-2 w-2/3 outline-none transition-colors focus:shadow-sm duration-300"
            v-model="cloneProfile.fatherMail"
            placeholder="Email bố"
          />
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <IdcardOutlined class="!text-gray-500" />
            <span>Năm Sinh</span>
          </div>
          <input
            type="number"
            class="border border-(--color-border-gray) rounded-lg px-4 py-2 w-2/3 outline-none transition-colors focus:shadow-sm duration-300"
            v-model="cloneProfile.fatherYob"
            placeholder="Năm sinh bố"
            min="1900"
            max="2100"
            @input="e => {
                            const target = e.target as HTMLInputElement;
                            if (target) {
                                target.value = target.value.replace(/\D/g, '').slice(0, 4);
                                cloneProfile.fatherYob = target.value;
                            }
                        }"
          />
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <BankOutlined class="!text-gray-500" />
            <span>Nghề Nghiệp</span>
          </div>
          <input
            type="text"
            class="border border-(--color-border-gray) rounded-lg px-4 py-2 w-2/3 outline-none transition-colors focus:shadow-sm duration-300"
            v-model="cloneProfile.fatherOccupation"
            placeholder="Nghề nghiệp bố"
          />
        </div>
      </div>
      <div class="flex flex-col items-center w-full">
        <div
          class="flex items-center w-full text-(--color-text-red) font-bold text-lg gap-2"
        >
          <TeamOutlined />Thông tin mẹ
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <UserOutlined class="!text-gray-500" />
            <span>Họ và Tên</span>
          </div>
          <input
            type="text"
            class="border border-(--color-border-gray) rounded-lg px-4 py-2 w-2/3 outline-none transition-colors focus:shadow-sm duration-300"
            v-model="cloneProfile.motherName"
            placeholder="Họ và tên mẹ"
          />
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <PhoneOutlined class="!text-gray-500" />
            <span>Điện Thoại</span>
          </div>
          <input
            type="text"
            class="border border-(--color-border-gray) rounded-lg px-4 py-2 w-2/3 outline-none transition-colors focus:shadow-sm duration-300"
            v-model="cloneProfile.motherPhone"
            placeholder="Điện thoại mẹ"
            maxlength="10"
            @input="e => {
                            const target = e.target as HTMLInputElement;
                            if (target) {
                                target.value = target.value.replace(/\D/g, '').slice(0, 10);
                                cloneProfile.motherPhone = target.value;
                            }
                        }"
          />
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <MailOutlined class="!text-gray-500" />
            <span>Email</span>
          </div>
          <input
            type="email"
            class="border border-(--color-border-gray) rounded-lg px-4 py-2 w-2/3 outline-none transition-colors focus:shadow-sm duration-300"
            v-model="cloneProfile.motherMail"
            placeholder="Email mẹ"
          />
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <IdcardOutlined class="!text-gray-500" />
            <span>Năm Sinh</span>
          </div>
          <input
            type="number"
            class="border border-(--color-border-gray) rounded-lg px-4 py-2 w-2/3 outline-none transition-colors focus:shadow-sm duration-300"
            v-model="cloneProfile.motherYob"
            placeholder="Năm sinh mẹ"
            min="1900"
            max="2100"
            @input="e => {
                            const target = e.target as HTMLInputElement;
                            if (target) {
                                target.value = target.value.replace(/\D/g, '').slice(0, 4);
                                cloneProfile.motherYob = target.value;
                            }
                        }"
          />
        </div>
        <div class="flex flex-row w-full items-center mb-4">
          <div class="flex items-center gap-2 font-medium text-gray-500 w-1/3">
            <BankOutlined class="!text-gray-500" />
            <span>Nghề Nghiệp</span>
          </div>
          <input
            type="text"
            class="border border-(--color-border-gray) rounded-lg px-4 py-2 w-2/3 outline-none transition-colors focus:shadow-sm duration-300"
            v-model="cloneProfile.motherOccupation"
            placeholder="Nghề nghiệp mẹ"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <button
        class="bg-(--color-bg-white) text-(--color-text-red) px-6 py-2 rounded-2xl mr-4 border text-base font-medium"
        @click="emit('update:open', false)"
      >
        Hủy bỏ
      </button>
      <button
        class="bg-(--color-text-red) text-(--color-text-white) px-6 py-2 rounded-2xl text-base font-medium"
      >
        Lưu thay đổi
      </button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import viVN from "ant-design-vue/es/locale/vi_VN";

import {
  UserOutlined,
  LockOutlined,
  IdcardOutlined,
  TeamOutlined,
  HeartOutlined,
  PlusOutlined,
  SaveOutlined,
  CloseOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons-vue";

const { profile, open } = defineProps<{
  profile: StudentProfile;
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "update:open", open: boolean): void;
  (e: "updateProfile", profile: StudentProfile): void;
}>();

const cloneProfile = reactive({
  ...profile,
});
</script>

<style>
.ant-picker-footer {
  display: none !important;
}
</style>
