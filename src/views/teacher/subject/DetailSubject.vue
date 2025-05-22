<template>
    <div class="p-6">
        <div class="mb-4">
            <a-button type="link" class="!text-red-600 font-medium px-0" @click="router.back()">
                <template #icon><left-outlined /></template>
                Quay lại
            </a-button>
        </div>
        <a-card :bordered="false" class="rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold text-red-600 mb-6">Chi tiết môn học</h2>            <a-descriptions :column="3" bordered>
                <a-descriptions-item label="Tên môn học" :span="1">{{ subject.name }}</a-descriptions-item>
                <a-descriptions-item label="Mã môn học" :span="1">{{ subject.code }}</a-descriptions-item>
                <a-descriptions-item label="Tổng số lớp" :span="1">{{ subject.totalClasses }}</a-descriptions-item>
                <a-descriptions-item label="Mô tả" :span="3">{{ subject.description }}</a-descriptions-item>
                <a-descriptions-item label="Ngày tạo" :span="1">{{ formatDate(subject.createdAt) }}</a-descriptions-item>
                <a-descriptions-item label="Ngày cập nhật" :span="2">{{ formatDate(subject.updatedAt) }}</a-descriptions-item>
            </a-descriptions>

            <div class="mt-8">
                <h3 class="text-xl font-semibold text-red-600 mb-4">Danh sách lớp học</h3>
                <a-table :dataSource="subject.classes" :columns="columns" :pagination="false" class="bg-white">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'teaching'">
                            <a-tag :color="record.teaching ? 'success' : 'error'" class="px-3 py-1 rounded">
                                {{ record.teaching ? 'Đang dạy' : 'Không hoạt động' }}
                            </a-tag>
                        </template>
                    </template>
                </a-table>
            </div>
        </a-card>
    </div>
</template>

<script setup lang="ts">
interface Class {
    id: number;
    name: string;
    teaching: boolean;
    totalStudents: number;
    startDate: string;
    endDate: string;
}

interface Subject {
    id: number;
    name: string;
    code: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    totalClasses: number;
    classes: Class[];
}

import { onMounted, ref } from 'vue';
import { Card as ACard, Descriptions as ADescriptions, Table as ATable, Tag as ATag, Button as AButton } from 'ant-design-vue';
import { LeftOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router';
import { get } from '@/services/callApi';
import { teacherSubject } from '@/services/api';

// Register components
const ADescriptionsItem = ADescriptions.Item;
const route = useRoute();
const router = useRouter();
const subject = ref<Subject>({
    id: 0,
    name: "",
    code: "",
    description: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalClasses: 0,
    classes: []
});

const columns = [
    {
        title: 'Tên lớp',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'teaching',
        key: 'teaching',
    },
    {
        title: 'Số lượng học sinh',
        dataIndex: 'totalStudents',
        key: 'totalStudents',
    },
    {
        title: 'Ngày bắt đầu',
        dataIndex: 'startDate',
        key: 'startDate',
        customRender: ({ text }: { text: string }) => formatDate(text),
    },
    {
        title: 'Ngày kết thúc',
        dataIndex: 'endDate',
        key: 'endDate',
        customRender: ({ text }: { text: string }) => formatDate(text),
    },
];

const formatDate = (date: string) => {
    return dayjs(date).format('DD-MM-YYYY');
};

const fetchSubjectDetails = (subjectId: number) => {
    get(teacherSubject + `/${subjectId}`)
        .then((response: any) => {
            if (response.code === 200) {
                subject.value = response.data;
            } else {
                throw new Error('Failed to fetch subject details');
            }
        });
};

onMounted(() => {
    const subjectId = Number(route.params.subjectId);
    fetchSubjectDetails(subjectId);
});
</script>

<style scoped>
:deep(.ant-descriptions-item-label) {
    background-color: rgb(254 242 242);
    color: rgb(220 38 38);
}

:deep(.ant-table-thead > tr > th) {
    background-color: rgb(254 242 242);
    color: rgb(220 38 38);
}

:deep(.ant-card-body) {
    padding: 1.5rem;
}

:deep(.ant-table-wrapper) {
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    border-radius: 0.5rem;
}

:deep(.ant-tag) {
    font-size: 0.875rem;
}
</style>