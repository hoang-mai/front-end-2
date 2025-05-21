import { createWebHistory, createRouter } from "vue-router";

import Login from "@/views/Login.vue";
import { default as AdminLayout } from "@/views/admin/Layout.vue";
import { default as Layout } from "@/views/Layout.vue";
import { default as StudentLayout } from "@/views/student/Layout.vue";
import { default as TeacherLayout } from "@/views/teacher/Layout.vue";
import { default as StudentProfile } from "@/views/student/profile/Profile.vue";
import { default as StudentHome } from "@/views/student/Home.vue";
import { default as StudentSchedule } from "@/views/student/Schedule.vue";
import { default as Account } from "@/views/admin/account/Account.vue";
import { default as AdminHome } from "@/views/admin/Home.vue";
import Announcement from "@/views/admin/announcement/Announcement.vue";
const routes = [
  { path: "/login", component: Login },

  {
    path: "/",
    component: Layout,
    children: [
      { path: "", component: StudentLayout,
        children: [
          { path: "", component: StudentHome },
          { path: "profile", component: StudentProfile },
          { path: "schedule", component: StudentSchedule },
        ]
       },
      { path: "teacher", component: TeacherLayout },
      { path: "admin", component: AdminLayout,
        children: [
          { path: "", component: AdminHome },
          { path: "account", component: Account },
          { path: "announcement", component: Announcement },
        ]
       },

    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
