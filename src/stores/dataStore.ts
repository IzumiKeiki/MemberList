import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({
    data: [
      {
        name: 'abc',
        skills: 'html, css, js',
        status: 'active' as 'active' | 'inactive'
      }
    ],
    newItem: {
      name: '',
      skills: '',
      status: 'active' as 'active' | 'inactive'
    },
    isEditing: false,
    editedIndex: 0,
    editedItem: {
      name: '',
      skills: '',
      status: 'active' as 'active' | 'inactive'
    }
  }),
  actions: {
    addItem() {
      this.data.push({ ...this.newItem })
      this.newItem.name = ''
      this.newItem.skills = ''
      this.newItem.status = 'active'
    },
    deleteItem(index: number) {
      this.data.splice(index, 1)
    },
    editItem(index: number) {
      this.isEditing = true
      this.editedIndex = index
      const item = this.data[index]
      this.editedItem = { ...item }
    },
    saveEditedItem() {
      if (this.editedIndex >= 0) {
        this.data[this.editedIndex] = { ...this.editedItem }
        this.editedIndex = 0
        this.editedItem = { name: '', skills: '', status: 'active' }
      }
      this.isEditing = false
    }
  }
})
