// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      token: undefined as String | undefined
    }
  },

  actions: {
    setToken(token: string) {
      this.token = token
    },

    clearAuthentication() {
      this.token = undefined
    },
  }
})
