// Utilities
import Session from '@/models/Session'
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
    }
  }
})