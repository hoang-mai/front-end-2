<template>
  <div class="p-6">
    <div class="mb-4">
      <a-button type="primary" danger @click="showCreateAnnouncementModal = true" class="!flex !items-center">
        <template #icon>
          <PlusOutlined />
        </template>
        Tạo Thông Báo
      </a-button>
    </div>

    <a-table :dataSource="announcements" :columns="columns" :pagination="pagination" @change="handleTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a-button type="link" danger @click="">Sửa</a-button>
            <a-button type="link" danger @click="">Xóa</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
  <CreateAnnouncementModal v-model:open="showCreateAnnouncementModal" />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableColumnsType } from 'ant-design-vue'
import CreateAnnouncementModal from './CreateAnnouncementModal.vue'
import dayjs from 'dayjs'

interface Announcement {
  id: number
  title: string
  contentPreview: string
  target: 'STUDENT' | 'TEACHER'
  targetName: string
  tags: string
  date: string
  adminName: string
}
const announcements = ref<Announcement[]>([])
const showCreateAnnouncementModal = ref(false)

const formData = reactive({
  title: '',
  contentPreview: '',
  target: 'STUDENT',
  tags: '',
})

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
})

const columns: TableColumnsType = [
  {
    title: 'Tiêu đề',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Nội dung xem trước',
    dataIndex: 'contentPreview',
    key: 'contentPreview',
  },
  {
    title: 'Đối tượng',
    dataIndex: 'target',
    key: 'target',
  },
  {
    title: 'Ngày',
    dataIndex: 'date',
    key: 'date',
    customRender: ({ text }: { text: string }) => formatDate(text),
  },
  {
    title: 'Người quản trị',
    dataIndex: 'adminName',
    key: 'adminName',
  },
  {
    title: 'Thao tác',
    key: 'action',
  },
]

const formatDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}


const handleTableChange = (pagination: { current: number; pageSize: number }) => {
  // Update pagination
  pagination.current = pagination.current
  pagination.pageSize = pagination.pageSize
  // TODO: Fetch data with new pagination
}

const handlePaginationChange = (page: number, pageSize: number) => {
  pagination.current = page
  pagination.pageSize = pageSize
  // TODO: Fetch data with new pagination
}
</script>

<style scoped>
.pagination {
  margin-top: 24px;
  text-align: right;
}

:deep(.ant-btn-primary) {
  background-color: #ff4d4f;
}

:deep(.ant-btn-primary:hover) {
  background-color: #ff7875;
}

:deep(.ant-tag-red) {
  color: #ff4d4f;
  background: #fff1f0;
  border-color: #ffa39e;
}

:deep(.ant-tag-volcano) {
  color: #ff7a45;
  background: #fff2e8;
  border-color: #ffbb96;
}
</style>