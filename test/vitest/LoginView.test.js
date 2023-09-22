import { mount } from '@vue/test-utils'
import { beforeEach, describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import LoginView from '../../src/views/LoginView.vue'
import router from '../../src/router'

describe('LoginView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly', () => {
    expect(LoginView).toBeTruthy()
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has a title and a button', () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.text()).toContain('Login')
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('should show error message when the input is invalid', async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router]
      }
    })
    console.log('ERROR Before button click:', wrapper.vm.authStore.showError)

    const idInput = wrapper.find('#id')
    const passInput = wrapper.find('#pass')
    idInput.setValue('id')
    passInput.setValue('pass')
    wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()
    console.log('ERROR After button click:', wrapper.vm.authStore.showError)

    expect(wrapper.find('p').exists()).toBe(true)
  })
})
