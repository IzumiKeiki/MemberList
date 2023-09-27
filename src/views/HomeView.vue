<script setup lang="ts">
import { onMounted } from 'vue'
import { useDataStore } from '../stores/dataStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const dataStore = useDataStore()
const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  if (!authStore.confirm) {
    router.replace('/')
  }
}

onMounted(() => {
  dataStore.fetchData()
})
</script>

<template>
  <main>
    <div class="header">
      <h1>Member List</h1>
      <button @click="logout">Logout</button>
    </div>

    <div v-if="!dataStore.isEditing">
      <h2>Add Member</h2>
      <form @submit.prevent="dataStore.addItem">
        <div>
          <label for="name">Name</label>
          <input id="name" type="text" v-model="dataStore.newItem.name" required />
          <label for="skill">Skills</label>
          <input id="skill" type="text" v-model="dataStore.newItem.skills" />
          <label for="status">Status</label>
          <select id="status" v-model="dataStore.newItem.status">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div class="twobtn"><button type="submit">Add</button></div>
      </form>
    </div>

    <div class="edit" v-if="dataStore.isEditing">
      <h2>Edit Member</h2>
      <form @submit.prevent="dataStore.saveEditedItem">
        <div>
          <label for="editName">Name</label>
          <input id="editName" type="text" v-model="dataStore.editedItem.name" required />
          <label for="editskill">Skills</label>
          <input id="editskill" type="text" v-model="dataStore.editedItem.skills" />
          <label for="editStatus">Status</label>
          <select id="editStatus" v-model="dataStore.editedItem.status">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div class="twobtn">
          <button type="submit">Save</button>
          <button>Cancel</button>
        </div>
      </form>
    </div>

    <div class="list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Skills</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataStore.data" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.skills }}</td>
            <td>{{ item.status }}</td>
            <div class="twobtn">
              <button @click="dataStore.editItem(index)">Edit</button>
              <button @click="dataStore.deleteItem(index)">Delete</button>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style scoped>
h1 {
  padding: 1rem 0;
}

form {
  width: 300px;
  display: flex;
  align-items: flex-end;
}

form div {
  display: flex;
  flex-direction: column;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 50px;
}

thead {
  background-color: #282828;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

tr:nth-child(even) {
  background-color: #222222;
}

tr:hover {
  background-color: #282828;
}

.twobtn {
  width: 150px;
  display: flex;
}

.twobtn button {
  margin: 10px 0px 10px 20px;
}

.edit {
  color: hsla(160, 100%, 37%, 1);
}

.header {
  display: flex;
  align-items: center;
  width: 300px;
}
</style>
