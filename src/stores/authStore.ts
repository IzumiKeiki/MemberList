import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    id: '',
    pass: '',
    showError: false,
    confirm: false
  }),
  actions: {
    login() {
      if (this.id !== 'abc' || this.pass !== 'pass') {
        this.showError = true
        this.confirm = false
        this.id = ''
        this.pass = ''
      } else {
        this.showError = false
        this.confirm = true
      }
    }
  }
})
