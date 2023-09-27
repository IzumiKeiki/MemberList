import { mount } from '@vue/test-utils'
import { beforeEach, describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import LoginView from '../../src/views/LoginView.vue'
import router from '../../src/router'

describe('LoginView', () => {
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

    const userInput = wrapper.find('#user')
    const passInput = wrapper.find('#pass')
    userInput.setValue('abc')
    passInput.setValue('pass')
    wrapper.find('form').trigger('submit.prevent')
    console.log('CONFIRM After button click:', wrapper.vm.authStore.confirm)

    await router.isReady()

    expect(router.currentRoute.value.name).toBe('home')
  })
})
