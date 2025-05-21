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
import { RouterView, useRouter } from 'vue-router';
import { useExpired } from '@/stores/expired';
const { expiredState, setExpired } = useExpired();
const router = useRouter();
const redirectToLogin = () => {
    setExpired(false);
    router.push('/login');
};
</script>
