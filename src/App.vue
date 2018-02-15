<template>
  <div id="app">
    <h1>hello</h1>
    <button v-if="!loggedIn" @click="login">login</button>
    <p v-if="loggedIn">login successful</p>
    <button v-if="loggedIn" @click="getTimeEntries">get Time</button>
    {{timeEntries}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios' // for ajax requests
import { TimeEntryKey, TimeEntry } from '@/types/TimeEntry'
import { buildTemplate } from '@/utils'
import ExcelAdapter from '@/utils/ExcelAdapter'

const url = process.env.VUE_APP_API_URL

interface Data {
  loggedIn: boolean
  timeEntries: TimeEntry[] | null
}

export default Vue.extend({
  name: 'app',
  data(): Data {
    return {
      loggedIn: false,
      timeEntries: null,
    }
  },
  methods: {
    async login() {
      const response = await axios.post(`${url}/login`)
      this.loggedIn = true
    },
    async getTimeEntries() {
      const response = await axios.get(`${url}/time`)
      this.timeEntries = response.data.result
    },
  },
  watch: {
    timeEntries(newTimeEntries) {
      if (newTimeEntries) {
        ExcelAdapter.writeToExcel(buildTemplate(newTimeEntries))
      }
    },
  },
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
