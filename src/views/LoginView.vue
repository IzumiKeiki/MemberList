<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const submit = () => {
  authStore.login()
  if (authStore.confirm) {
    router.replace('/home')
  }
}

const beforeRouteEnter = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: () => void
) => {
  if (to.path === '/home' && !authStore.confirm) {
    router.push('/')
  } else {
    next()
  }
}

router.beforeEach(beforeRouteEnter)
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <p v-if="authStore.showError">
      ID or Password was wrong! <br />
      You can try "abc" for ID and "pass" for Password
    </p>
    <form @submit.prevent="submit">
      <label for="id">ID :</label>
      <input id="id" type="text" v-model="authStore.id" />
      <label for="pass">Password :</label>
      <input id="pass" type="password" v-model="authStore.pass" />
      <button type="submit">Confirm</button>
    </form>
  </div>
</template>

<style scoped>
div.login {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h1 {
  padding: 1rem 0;
}
.login p {
  color: red;
  padding: 1rem 0;
}

form {
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
</style>
