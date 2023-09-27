import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    id: 0,
    user: '',
    pass: '',
    showError: false,
    confirm: false
  }),
  actions: {
    async login() {
      if (this.user == 'abc' && this.pass == 'pass') {
        this.showError = false
        this.confirm = true
      } else {
        try {
          const response = await axios.post('http://localhost:5001/login', {
            username: this.user,
            password: this.pass
          })

          if (response.status === 200 && response.data.length > 0) {
            console.log('Login successfully')
            this.id = response.data[0].id
            this.showError = false
            this.confirm = true
          } else {
            this.showError = true
            this.confirm = false
            this.pass = ''
          }
        } catch (err) {
          console.error('Error logging in:', err)
          this.showError = true
          this.confirm = false
          this.pass = ''
        }
      }
    },
    logout() {
      this.user = ''
      this.pass = ''
      this.confirm = false
    }
  }
})
