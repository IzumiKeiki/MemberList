import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { beforeEach, describe, it, expect } from 'vitest'

import LoginView from '../../src/views/LoginView.vue'
import HomeView from '../../src/views/HomeView.vue'

import { setActivePinia, createPinia } from 'pinia'

describe('LoginView', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'login',
        component: LoginView
      },
      {
        path: '/home',
        name: 'home',
        component: HomeView
      }
    ]
  })

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should navigate to the home view after login', async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router]
      }
    })
    console.log('CONFIRM Before button click:', wrapper.vm.authStore.confirm)

    const idInput = wrapper.find('#id')
    const passInput = wrapper.find('#pass')
    idInput.setValue('abc')
    passInput.setValue('pass')
    wrapper.find('form').trigger('submit.prevent')
    console.log('CONFIRM After button click:', wrapper.vm.authStore.confirm)

    await router.isReady()

    expect(router.currentRoute.value.name).toBe('home')
  })
})
