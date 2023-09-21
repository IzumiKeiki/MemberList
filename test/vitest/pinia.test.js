import { beforeEach, describe, it, expect } from 'vitest'

import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../../src/stores/authStore'

describe('LoginView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('has initial state falsy', () => {
    const authStore = useAuthStore()
    expect(authStore.showError).toBe(false)
    expect(authStore.confirm).toBe(false)
  })

  it('has login unsuccess', () => {
    const authStore = useAuthStore()
    authStore.id = 'id'
    authStore.pass = 'pass'
    authStore.login()
    expect(authStore.showError).toBe(true)
    expect(authStore.confirm).toBe(false)
  })

  it('has login success', () => {
    const authStore = useAuthStore()
    authStore.id = 'abc'
    authStore.pass = 'pass'
    authStore.login()
    expect(authStore.showError).toBe(false)
    expect(authStore.confirm).toBe(true)
  })
})
