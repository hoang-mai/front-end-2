import { defineStore } from 'pinia'
import { ref } from 'vue'

interface UserState {
  id: number
  email: string
  fullName: string
  avatarUrl: string | null
}

export const useUserStore = defineStore('user', () => {
  const userState = ref<UserState | null>(null)

  const setUser = (user: UserState | null) => {
    userState.value = user
  }

  return { userState, setUser }
})
