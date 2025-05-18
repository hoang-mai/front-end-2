<template>
  <div class="px-10 py-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-[var(--color-text-red)]">
        Thời khoá biểu
      </h1>
    </div>
    <a-card :bordered="false" class="rounded-lg shadow-md">
        <a-config-provider :locale="viVN">
      <a-calendar
        :fullscreen="false"
        @select="onSelect"
        @panelChange="onPanelChange"
      >
        <template #dateCellRender="{ current }">
          <ul class="p-0 m-0 list-none">
            <li
              v-for="item in getListData(current)"
              :key="item.id"
              class="mb-0.5 inline-block mr-1"
            >
              <a-tooltip :title="item.content" color="var(--color-text-red)">
                <div
                  class="cursor-pointer transition-all duration-300 ease-in-out"
                >
                  <div
                    class="w-2 h-2 rounded-full transition-all duration-300 ease-in-out"
                    :style="{ backgroundColor: item.color }"
                  ></div>
                </div>
              </a-tooltip>
            </li>
          </ul>
        </template>
      </a-calendar>
      </a-config-provider>
    </a-card>

    <a-modal
      v-model:visible="modalVisible"
      :title="
        selectedDate
          ? `Lịch học ngày ${selectedDate.format('DD/MM/YYYY')}`
          : 'Lịch học'
      "
      :footer="null"
      width="600px"
    >
      <a-list
        v-if="selectedEvents.length"
        :dataSource="selectedEvents"
        :renderItem="renderItem"
        item-layout="horizontal"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-card
              :bordered="false"
              :style="{ width: '100%', borderLeft: `4px solid ${item.color}` }"
              class="mb-3 schedule-detail-card"
            >
              <div class="flex justify-between">
                <h3 class="font-bold text-lg">{{ item.content }}</h3>
                <span class="text-gray-500">{{ item.timeRange }}</span>
              </div>
              <p><strong>Phòng:</strong> {{ item.room }}</p>
              <p><strong>Giảng viên:</strong> {{ item.teacher }}</p>
            </a-card>
          </a-list-item>
        </template>
      </a-list>
      <a-empty v-else description="Không có lịch học cho ngày này" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import dayjs, { Dayjs } from "dayjs";
import viVN from "ant-design-vue/es/locale/vi_VN";

const modalVisible = ref(false);
const selectedDate = ref<Dayjs | null>(null);

// Mock events data
const events = reactive([
  {
    id: "1",
    date: dayjs().format("YYYY-MM-DD"),
    content: "Lập trình Web",
    color: "#f50",
    timeRange: "07:00 - 09:30",
    room: "A1-101",
    teacher: "Nguyễn Văn A",
  },
  {
    id: "2",
    date: dayjs().format("YYYY-MM-DD"),
    content: "Cơ sở dữ liệu",
    color: "#2db7f5",
    timeRange: "09:45 - 11:15",
    room: "A1-202",
    teacher: "Trần Thị B",
  },
  {
    id: "3",
    date: dayjs().add(1, "day").format("YYYY-MM-DD"),
    content: "Trí tuệ nhân tạo",
    color: "#87d068",
    timeRange: "13:00 - 15:30",
    room: "A2-303",
    teacher: "Lê Văn C",
  },
  {
    id: "4",
    date: dayjs().add(2, "day").format("YYYY-MM-DD"),
    content: "Mạng máy tính",
    color: "#722ed1",
    timeRange: "15:45 - 17:15",
    room: "A2-404",
    teacher: "Phạm Thị D",
  },
]);

// Get events for a specific date
const getListData = (value: Dayjs) => {
  const listData = events.filter(
    (event) => event.date === value.format("YYYY-MM-DD")
  );
  return listData;
};

// Computed property for selected date events
const selectedEvents = computed(() => {
  if (!selectedDate.value) return [];
  return events.filter(
    (event) => event.date === selectedDate.value?.format("YYYY-MM-DD")
  );
});

// Event handlers
const onSelect = (date: Dayjs) => {
  selectedDate.value = date;
  modalVisible.value = true;

  // Add custom class to the selected date cells via DOM
  setTimeout(() => {
    const selectedCells = document.querySelectorAll(
      ".ant-picker-cell-selected"
    );
    selectedCells.forEach((cell) => {
      cell.classList.add("calendar-cell-selected");
    });
  }, 10);
};

const onPanelChange = (date: Dayjs, mode: string) => {
  console.log(date.format("YYYY-MM-DD"), mode);
};

// For a-list rendering - not actually used due to template rendering
const renderItem = () => {};
</script>

<style scoped>

:deep(.ant-picker-calendar-date-content) {
  height: 1rem; /* further reduced for icon-only display */
  overflow-y: visible;
  display: flex;
  align-items: center;
}

:deep(.ant-picker-calendar-header) {
  margin-bottom: 1rem; /* equivalent to mb-4 */
}

:deep(.ant-picker-calendar-date) {
  padding: 0.125rem; /* reduced from 0.25rem */
  transition: background-color 0.2s ease;
}

:deep(.ant-picker-cell-selected .ant-picker-calendar-date::after),
:deep(.calendar-cell-selected .ant-picker-calendar-date::after) {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid rgba(245, 34, 45, 0.6);
  border-radius: 2px;
  pointer-events: none;
}

:deep(.ant-radio-button-wrapper) {
  display: none;
}

:deep(.ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner),
:deep(.ant-picker-cell-in-view.ant-picker-cell-range-start .ant-picker-cell-inner),
:deep(.ant-picker-cell-in-view.ant-picker-cell-range-end .ant-picker-cell-inner) {
  color: #fff;
  background: var(--color-text-red) !important;
}

:deep(.ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner::before) {
  border-color: var(--color-text-red) !important;
}
</style>
