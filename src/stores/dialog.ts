import Dialog from "@/models/Dialog";
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
    show(dialog: Dialog) {
      this.enabled = true
      this.title = dialog.title ? dialog.title : "Atención"
      this.body = dialog.body!
      this.callback = dialog.callback
    }
  }
})