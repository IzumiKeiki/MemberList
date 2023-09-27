import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '../../src/stores/authStore'

setActivePinia(createPinia())

describe('pinia.cy.ts', () => {
  it('has initial state falsy', () => {
    cy.wrap(useAuthStore()).then((store) => {
      expect(store.showError).to.eq(false)
      expect(store.confirm).to.eq(false)
    })
  })

  it('should have an unsuccessful login', () => {
    cy.wrap(useAuthStore()).then(async (store) => {
      store.user = 'id'
      store.pass = 'pass'
      await store.login()
      expect(store.showError).to.eq(true)
      expect(store.confirm).to.eq(false)
    })
  })

  it('should have an unsuccessful login', () => {
    cy.wrap(useAuthStore()).then((store) => {
      store.user = 'abc'
      store.pass = 'pass'
      store.login()
      expect(store.showError).to.eq(false)
      expect(store.confirm).to.eq(true)
    })
  })
})
