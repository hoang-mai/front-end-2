import { createWebHistory, createRouter } from "vue-router";

import Login from "@/views/Login.vue";
import { default as AdminLayout } from "@/views/admin/Layout.vue";
import { default as Layout } from "@/views/Layout.vue";
import { default as StudentLayout } from "@/views/student/Layout.vue";
import { default as TeacherLayout } from "@/views/teacher/Layout.vue";
const routes = [
  { path: "/login", component: Login },

  {
    path: "/",
    component: Layout,
    children: [
      { path: "", component: StudentLayout },
      { path: "teacher", component: TeacherLayout },
      { path: "admin", component: AdminLayout },

    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
