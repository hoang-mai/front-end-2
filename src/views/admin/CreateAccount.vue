<template>
  <div class="flex flex-col">
    <a-card title="Tạo Tài Khoản Mới" class="account-card">
      <a-form
        :model="formState"
        name="createAccount"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        autocomplete="off"
        @finish="onFinish"
        @finish-failed="onFinishFailed"
      >
        <a-form-item
          label="Tên đăng nhập"
          name="username"
          :rules="[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]"
        >
          <a-input
            v-model:value="formState.username"
            placeholder="Nhập tên đăng nhập"
          />
        </a-form-item>

        <a-form-item
          label="Mật khẩu"
          name="password"
          :rules="[
            { required: true, message: 'Vui lòng nhập mật khẩu!', min: 6 },
          ]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="Nhập mật khẩu"
          />
        </a-form-item>

        <a-form-item
          label="Họ và tên"
          name="fullName"
          :rules="[{ required: true, message: 'Vui lòng nhập họ và tên!' }]"
        >
          <a-input
            v-model:value="formState.fullName"
            placeholder="Nhập họ và tên đầy đủ"
          />
        </a-form-item>

        <a-form-item
          label="Vai trò"
          name="role"
          :rules="[{ required: true, message: 'Vui lòng chọn vai trò!' }]"
        >
          <a-select
            v-model:value="formState.role"
            placeholder="Chọn vai trò người dùng"
          >
            <a-select-option value="STUDENT">Học sinh</a-select-option>
            <a-select-option value="TEACHER">Giáo viên</a-select-option>
            <a-select-option value="ADMIN">Quản trị viên</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="Ngày sinh"
          name="dob"
          :rules="[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]"
        >
          <a-config-provider :locale="viVN">
            <a-date-picker
              v-model:value="formState.dob"
              style="width: 100%"
              placeholder="Chọn ngày sinh"
              :format="'DD/MM/YYYY'"
            />
          </a-config-provider>
        </a-form-item>

        <a-form-item
          label="Giới tính"
          name="gender"
          :rules="[{ required: true, message: 'Vui lòng chọn giới tính!' }]"
        >
          <a-select
            v-model:value="formState.gender"
            placeholder="Chọn giới tính"
          >
            <a-select-option value="MALE">Nam</a-select-option>
            <a-select-option value="FEMALE">Nữ</a-select-option>
            <a-select-option value="OTHER">Khác</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="Số điện thoại"
          name="phoneNumber"
          :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]"
        >
          <a-input
            v-model:value="formState.phoneNumber"
            placeholder="Nhập số điện thoại"
            maxlength="10"
          />
        </a-form-item>

        <a-form-item
          label="Email"
          name="email"
          :rules="[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Vui lòng nhập email hợp lệ!' },
          ]"
        >
          <a-input
            v-model:value="formState.email"
            placeholder="Nhập địa chỉ email"
          />
        </a-form-item>

        <a-form-item label="Ảnh đại diện" name="avatarUrl">
          <a-upload
            v-model:file-list="fileList"
            list-type="picture"
            :max-count="1"
            :accept="'image/*'"
          >
            <a-button
              class="hover:!border-[var(--color-border-gray)] focus:!border-[var(--color-border-gray)] active:!border-[var(--color-border-gray)] hover:!text-[var(--color-text-gray)] focus:!text-[var(--color-text-gray)] active:!text-[var(--color-text-gray)]"
            >
              <upload-outlined style="color: currentColor" />
              Chọn ảnh đại diện
            </a-button>
          </a-upload>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
          <a-button type="primary" html-type="submit" class="submit-button"
            >Tạo Tài Khoản</a-button
          >
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import dayjs from "dayjs";
import viVN from "ant-design-vue/es/locale/vi_VN";
import { toast } from "vue3-toastify";
import { post } from "@/services/callApi";
import { adminCreateAccount } from "@/services/api";
interface FormState {
  username: string;
  password: string;
  role: string;
  fullName: string;
  dob: any;
  gender: string;
  phoneNumber: string;
  email: string;
  avatarUrl: string;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
  role: "STUDENT",
  fullName: "",
  dob: null,
  gender: "MALE",
  phoneNumber: "",
  email: "",
  avatarUrl: "",
});
const fileList = ref<File | null>(null);

const onFinish = (values: FormState) => {
  const formattedData = {
    ...values,
    dob: values.dob
      ? dayjs(values.dob).format("YYYY-MM-DD")
      : null,
  };
  toast.promise(post(adminCreateAccount,{
    ...formattedData
  }), {
    pending: "Đang tạo tài khoản...",
    success: "Tạo tài khoản thành công!",
    error: "Tạo tài khoản thất bại!",
  });
};

const onFinishFailed = () => {
  toast.error(
    "Vui lòng kiểm tra lại thông tin!"
  );
};
</script>

<style scoped>
.account-card {
  margin: 20px auto;
  max-width: 800px;
  width: 90%;
}

:deep(.ant-btn-primary) {
  background-color: #f5222d; /* Red color */
  border-color: #f5222d;
}

:deep(.ant-btn-primary:hover),
:deep(.ant-btn-primary:focus) {
  background-color: var(--color-text-red);
  border-color: var(--color-text-red);
}

:deep(.ant-form-item-label label) {
  font-weight: 500;
}

:deep(.ant-card-head) {
  background-color: #fff1f0;
  border-bottom: 2px solid #f5222d;
}

:deep(.ant-card-head-title) {
  color: var(--color-text-red);
  font-weight: 600;
  font-size: 1.3rem;
}

:deep(.ant-select-selection-item),
:deep(.ant-select-selection-placeholder) {
  text-align: left;
}
:deep(.ant-input:focus),
:deep(.ant-input:hover),
:deep(.ant-input:active) {
  border: 1px solid var(--color-border-gray);
}

:deep(.ant-input-password:hover),
:deep(.ant-input-password:focus),
:deep(.ant-input-password:active) {
  border: 1px solid var(--color-border-gray);
}
:deep(.ant-input-password .ant-input:hover),
:deep(.ant-input-password .ant-input:focus),
:deep(.ant-input-password .ant-input:active) {
  border: none !important;
}
</style>
