import { defineStore } from 'pinia'
import axios from 'axios'

export const useDataStore = defineStore('data', {
  state: () => ({
    data: [
      { id: 0, name: 'abc', skills: 'html, css, js', status: 'active' as 'active' | 'inactive' }
    ],
    newItem: {
      name: '',
      skills: '',
      status: 'active' as 'active' | 'inactive'
    },
    isEditing: false,
    editedIndex: 0,
    editedItem: {
      id: 0,
      name: '',
      skills: '',
      status: 'active' as 'active' | 'inactive'
    }
  }),
  actions: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:5001/get')
        console.log('fetchData successfully')
        this.data = response.data || []
      } catch (err) {
        console.error(err)
      }
    },

    async addItem() {
      const dataToInsert = {
        name: this.newItem.name,
        skills: this.newItem.skills,
        status: this.newItem.status
      }

      try {
        const response = await axios.post('http://localhost:5001/insert', dataToInsert)
        console.log('addItem successfully')

        const newItemFromServer = response.data
        this.data.push(newItemFromServer)

        this.newItem.name = ''
        this.newItem.skills = ''
        this.newItem.status = 'active'
      } catch (err) {
        console.error(err)
      }
    },

    async deleteItem(index: number) {
      const idToDelete = this.data[index].id
      try {
        await axios.delete(`http://localhost:5001/delete/${idToDelete}`)
        console.log('deleteItem successfully')
        this.data.splice(index, 1)
      } catch (err) {
        console.error(err)
      }
    },

    editItem(index: number) {
      this.isEditing = true
      this.editedIndex = index
      const item = this.data[index]
      this.editedItem = { ...item }
    },
    async saveEditedItem() {
      if (this.editedIndex >= 0) {
        try {
          const response = await axios.put(
            `http://localhost:5001/update/${this.data[this.editedIndex].id}`,
            this.editedItem
          )

          if (response.status === 200) {
            console.log('Data updated successfully')
          } else {
            console.error('Failed to update data')
          }
        } catch (err) {
          console.error(err)
        }
        this.data[this.editedIndex] = { ...this.editedItem }
        this.editedIndex = 0
        this.editedItem = { id: 0, name: '', skills: '', status: 'active' }
      }
      this.isEditing = false
    }
  }
})
