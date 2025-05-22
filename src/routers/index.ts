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
import { default as UserLayout } from "@/views/admin/user/Layout.vue";
import { default as AdminSubjectLayout } from "@/views/admin/subject/Layout.vue";
import { default as AdminDetailSubject } from "@/views/admin/subject/DetailSubject.vue";
import Announcement from "@/views/admin/announcement/Announcement.vue";
import { default as AdminSubject } from "@/views/admin/subject/Subject.vue";
import User from "@/views/admin/user/User.vue";
import Student from "@/views/admin/user/student/Student.vue";
const routes = [
  { path: "/login", component: Login },

  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        component: StudentLayout,
        children: [
          { path: "", component: StudentHome },
          { path: "profile", component: StudentProfile },
          { path: "schedule", component: StudentSchedule },
        ],
      },
      { path: "teacher", component: TeacherLayout },
      {
        path: "admin",
        component: AdminLayout,
        children: [
          { path: "", component: AdminHome },
          { path: "account", component: Account },
          { path: "announcement", component: Announcement },
          { path: "subject", component: AdminSubjectLayout,
            children: [
              { path: "", component: AdminSubject },
              { path: ":subjectId", component: AdminDetailSubject, name: "subject" },
            ]
           },
          {
            path: "users",
            component: UserLayout,
            children: [
              { path: "", component: User },
              {
                path: "student/:studentId",
                name: "student",
                component: Student,
              },
              // { path: "teacher/:teacherId", component: UserCreate },
              // { path: "admin/:adminId", component: UserEdit },
            ],
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
