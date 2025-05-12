<template>
    <div class="flex flex-col h-screen">
        <header class="bg-white shadow-md">
        <div class="container mx-auto px-4 py-2 flex items-center justify-between">
            <h1 class="text-xl font-bold">Hệ thống quản lý sinh viên</h1>
            <nav>
            <RouterLink
                to="/login"
                class="text-gray-700 hover:text-red-500 transition duration-200"
            >
                Đăng nhập
            </RouterLink>
            </nav>
        </div>
        </header>
    
        <main class="flex flex-grow">
        <LeftSideBar />
        <div class="flex-grow p-4">
            <router-view />
        </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const defaultStudentProfile: StudentProfile = {
    id: 0,
    email: null,
    fullName: null,
    dob: null,
    gender: null,
    phoneNumber: null,
    avatarUrl: null,
    ethnicity: null,
    idCardNumber: null,
    idCardPlaceOfIssue: null,
    residence: null,
    address: null,
    religion: null,
    motherName: null,
    motherYob: null,
    motherPhone: null,
    motherMail: null,
    motherOccupation: null,
    fatherName: null,
    fatherYob: null,
    fatherPhone: null,
    fatherMail: null,
    fatherOccupation: null,
    notes: null
  };

const profile = ref<StudentProfile | null>(defaultStudentProfile);

</script>