import { defineStore } from "pinia";

export const useDialogStore = defineStore('dialog', {
  state() {
      return {
        enabled: false,
        title: "No title",
        body: "No body",
        callback: null as any,
      }
  },

  actions: {
    show(body: string, callback: any) {
      this.enabled = true
      this.title = "Atención"
      this.body = body
      this.callback = callback
    },

    async executeCallback() {
      if (this.callback) {
        await this.callback()
      }
    }
  }
})