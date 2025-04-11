<template>
    <div class="relative  flex items-center justify-center min-h-screen bg-red-100">
        <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-red-600">Đăng nhập</h2>
            <form @submit.prevent="handleLogin" class="space-y-2">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input id="email" type="email" v-model="email"
                        class="w-full px-3 py-2 mt-1 focus:outline-none border-b-2 border-gray-300 focus:border-red-500 transition duration-200" />
                    <p v-if="validateEmail()" class="text-red-500">Email không hợp lệ</p>
                    <p v-else class="h-6"></p>
                </div>
                <div class="relative">
                    <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
                    <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password"
                        class="w-full px-3 py-2 mt-1 focus:outline-none border-b-2 border-gray-300 focus:border-red-500 transition duration-200" />
                    <p v-if="validatePassword()" class="text-red-500">Mật khẩu ít nhất 6 ký tự</p>
                    <p v-else class="h-6"></p>
                    <font-awesome-icon v-if="showPassword" @click="showPassword = false" :icon="['fas', 'eye']"
                        class="absolute right-3 top-9 cursor-pointer" />
                    <font-awesome-icon v-else @click="showPassword = true" :icon="['fas', 'eye-slash']"
                        class="absolute right-3 top-9 cursor-pointer" />

                </div>
                <button :disabled="validateEmail() || validatePassword() || email === '' || password === ''"
                    type="submit"
                    class="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none ">
                    Đăng nhập
                </button>
            </form>
        </div>
        <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
            <svg class="w-full h-32" viewBox="0 0 500 150" preserveAspectRatio="none">
                <path d="M0.00,49.98 C149.99,150.00 349.44,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                    style="stroke: none; fill: #fecaca;"></path> <!-- màu đỏ nhạt -->
            </svg>
        </div>
        <div class="absolute top-0 left-0 w-full z-0">
            <svg class="w-60 h-60" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#fecaca" d="M0,0 C80,40 120,60 200,0 L200,0 L0,0 Z" />
            </svg>
        </div>


    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const router = useRouter();


const validateEmail = () => {
    if (email.value === '') return false; // Trả về false nếu email trống
    const emailPattern = /@[a-zA-Z0-9]+\./;
    return !emailPattern.test(email.value);
}

const validatePassword = () => {
    if (password.value === '') return false; // Trả về false nếu mật khẩu trống
    return password.value.length < 6; // Trả về true nếu mật khẩu ít hơn 6 ký tự
}
const handleLogin = () => {
    toast.success('Đăng nhập thành công!');
    if (validateEmail() || validatePassword()) {
        console.log('Validation failed');
        return;
    }
    console.log('Logging in with email:', email.value, 'and password:', password.value);

}

</script>

<style scoped>
/* Add your styles here */
</style>