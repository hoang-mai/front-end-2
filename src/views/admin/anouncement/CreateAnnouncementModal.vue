<template>
  <a-modal v-bind:open="open" :title="'Tạo Thông Báo Mới'" @ok="" @cancel="handleCancel" :confirmLoading="loading"
    okText="Lưu" cancelText="Hủy" :okButtonProps="{
      style: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' },
      danger: true
    }">
    <a-form :model="formState" :rules="rules" ref="formRef" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="Tiêu đề" name="title">
        <a-input v-model:value="formState.title" />
      </a-form-item>

      <a-form-item label="Nội dung" name="content">
        <a-textarea v-model:value="formState.content" :rows="4" placeholder="Nhập nội dung thông báo..." />
      </a-form-item>

      <a-form-item label="Đối tượng" name="target">
        <a-select v-model:value="formState.target">
          <a-select-option value="STUDENT">Học sinh</a-select-option>
          <a-select-option value="TEACHER">Giáo viên</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Thẻ" name="tags">
        <a-input v-model:value="formState.tags" placeholder="Nhập thẻ..." />
      </a-form-item>

      <a-form-item label="Ngày" name="date">
        <a-date-picker v-model:value="formState.date" :show-time="{ format: 'HH:mm' }" format="YYYY-MM-DD HH:mm"
          style="width: 100%" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'
import dayjs from 'dayjs'

interface FormState {
  title: string
  content: string
  target: 'STUDENT' | 'TEACHER'
  tags: string
  date: dayjs.Dayjs | null
}

const { open } = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', open: boolean): void
}>()

const formRef = ref<FormInstance>()
const loading = ref(false)

const formState = reactive<FormState>({
  title: '',
  content: '',
  target: 'STUDENT',
  tags: '',
  date: dayjs(),
})

const rules = {
  title: [{ required: true, message: 'Vui lòng nhập tiêu đề', trigger: 'blur' }],
  content: [{ required: true, message: 'Vui lòng nhập nội dung', trigger: 'blur' }],
  target: [{ required: true, message: 'Vui lòng chọn đối tượng', trigger: 'change' }],
  date: [{ required: true, message: 'Vui lòng chọn ngày', trigger: 'change' }],
}

const resetForm = () => {
  formRef.value?.resetFields()
  Object.assign(formState, {
    title: '',
    content: '',
    target: 'STUDENT',
    tags: '',
    date: dayjs(),
  })
}

const handleCancel = () => {
  resetForm()
  emit('update:open', false)
}
</script>

<style scoped>
:deep(.ant-btn-primary) {
  background-color: #ff4d4f;
  border-color: #ff4d4f;
}

:deep(.ant-btn-primary:hover) {
  background-color: #ff7875;
  border-color: #ff7875;
}

:deep(.ant-input:focus),
:deep(.ant-input-focused),
:deep(.ant-picker-focused),
:deep(.ant-select-focused .ant-select-selector) {
  border-color: #ff4d4f;
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
}

:deep(.ant-select-item-option-selected:not(.ant-select-item-option-disabled)) {
  background-color: #fff1f0;
}
</style>