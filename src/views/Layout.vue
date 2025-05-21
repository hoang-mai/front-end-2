<template>
    <div class="flex flex-col max-w-[1920px] mx-auto">
        <main class="mt-16">
            <RouterView />
        </main>
    </div>
    <a-modal v-model:open="expiredState" title="Phiên đăng nhập đã hết hạn" ok-text="Đăng nhập lại" :closable="false"
        :maskClosable="false" @ok="redirectToLogin">
        <p>Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại để tiếp tục sử dụng hệ thống.</p>
    </a-modal>
</template>

<script setup lang="ts">
interface JwtPayload {
    exp: number;
    iat: number;
    sub: string;
}
import { RouterView, useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import { useExpired } from '@/stores/expired';
import { jwtDecode } from 'jwt-decode';
const expiredStore = useExpired();
const expiredState = computed(() => expiredStore.expiredState);
const router = useRouter();
const route = useRoute();
const redirectToLogin = () => {
    expiredStore.setExpired(false);
    router.push('/login');
};
const checkTokenExpiration = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        router.push('/login');
        return;
    }
    const decoded = jwtDecode<JwtPayload>(accessToken);
    if (decoded.sub === 'admin' && !route.path.includes('/admin')) {
        router.replace('/admin');
    } else if (decoded.sub === 'teacher' && !route.path.includes('/admin')) {
        router.replace('/teacher');
    } else if (decoded.sub === 'student' && !route.path.includes('/admin')) {
        router.replace('/');
    }
};

checkTokenExpiration();

</script>
