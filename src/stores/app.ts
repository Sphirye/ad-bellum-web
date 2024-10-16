// Utilities
import Session from '@/models/Session'
import router from '@/router'
import AuthService from '@/services/AuthService'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      session: new Session() as Session
    }
  },

  actions: {
    setSession(session: Session) {
      localStorage.removeItem(Session.KEY)
      this.session = session
      this.saveSession()
    },

    saveSession() {
      localStorage.setItem(Session.KEY, JSON.stringify(this.session))
    },

    loadSession() {
      let cachedSession = localStorage.getItem(Session.KEY)
      if (cachedSession != null) {
        this.session = JSON.parse(cachedSession)
      }
    },

    destroySession() {
      this.session = new Session()
      this.saveSession()
    },

    async checkSession() {      
      this.loadSession()

      if (this.session.token == undefined) {
        router.push("/auth/login")
        return
      }

      try {
        let session = await AuthService.checkAuth()
        console.log(session)
        this.setSession(session.result)
      } catch (e) {
        this.destroySession()
        router.push("/auth/login")
      }
    },
  }
})