<template>
  <v-layout
    column
    justify-center
  >
    <v-flex 
      xs12 
      sm8 
      md6
    >
      <v-img
        gradient="to top right, rgba(14,180,142, .7), rgba(0,158,214, .7)"
        aspect-ratio="2.7"
        dark
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
      >
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>
              <h3 class="display-2">HKUExamBase</h3>
              <br>
              <span class="subheading">✨Refined HKUL ExamBase✨</span>
              <br><br>
              <v-text-field
                :loading="loading"
                v-model="code"
                box
                clearable
                type="text"
                label="Course Code"
                color="rgba(150, 255, 120, 0.8)"
                placeholder="ACCT1101"
                append-outer-icon="search"
                @click:append-outer="searchByCode"
                @keyup.enter.native="searchByCode"
              />
              <!-- <v-combobox
                :loading="loading"
                v-model="code"
                :items="courses"
                clearable
                color="rgba(150, 255, 120, 0.8)"
                hide-no-data="false"
                placeholder="ACCT1101"
                label="Course Code"
                @change="searchByCode"
              /> -->
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>


      <!-- Not Foudn Alert -->
      <v-alert
        :value="notFoundAlert"
        type="error"
        transition="scale-transition"
      >
        {{ errmsg }}
      </v-alert>

      <v-data-table
        :headers="headers"
        :items="pastpaper"
        class="elevation-1"
      >
        <template 
          slot="items" 
          slot-scope="props"
        >
          <td>{{ props.item.code }}</td>
          <td class="text-xs-right">{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.exam_date }}</td>
          <td class="text-xs-right">{{ props.item.department.toString() }}</td>

          <td class="text-xs-center">
            <v-tooltip 
              v-if="props.item.remark.length > 0"
              bottom
            >
              <div slot="activator">
                <v-icon
                  slot="activator"
                  color="primary"
                  dark
                >info</v-icon>
              </div>
              <span>{{ props.item.remark.toString() }}</span>
            </v-tooltip>
          </td>
          
          <td class="text-xs-center">
            <a 
              v-if="!props.item.blocked" 
              :href="props.item.url"
              target="_blank"
            >
              Enter
            </a>
          </td>

        </template>
      </v-data-table>
      <span>Data will be collected anonymously in high confidentials for statistical use only</span>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  head: {
    script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js' },
    ]
  },
  data: () => ({
    loading: false,
    code: '',
    courses: [],
    errmsg: '',
    notFoundAlert: false,
    headers: [
      {
        text: 'Code',
        align: 'left',
        value: 'code'
      },
      { text: 'Title', value: 'title' },
      { text: 'Exam Date', value: 'exam_date' },
      { text: 'Department', value: 'department' },
      { text: 'Remark', 
        sortable: false,
        value: 'remark' 
      },
      { text: 'Enter', 
        sortable: false,
        value: 'enter' 
      }
    ],
    pastpaper: [],
  }), 
  mounted: function () {
    // axios.get(`http://localhost:3001/courses`).then((res) => {
    axios.get(`https://hkuexambaseapi.herokuapp.com/courses`).then((res) => {
      if(res.data.status == 404){
        this.errmsg = res.data.msg;
        self.notFoundAlert = true; // show not found alert
      } else {
        this.courses = res.data;
      }
      self.loading = false; // stop loading
    }).catch(err => {
      self.loading = false; // stop loading
    })
  },
  methods:{
    searchByCode () {
      var self = this // create a closure to access component in the callback below
      self.notFoundAlert = false; // close not found alert
      if(self.code != null){
        self.loading = true; // start loading
        self.pastpaper = [];
        // axios.get(`http://localhost:3001/pastpaper/${self.code}`).then((res) => {
        axios.get(`https://hkuexambaseapi.herokuapp.com/pastpaper/${self.code}`).then((res) => {
          if(res.data.status == 404){
            this.errmsg = res.data.msg;
            self.notFoundAlert = true; // show not found alert
          } else {
            self.pastpaper = res.data;
          }
          self.loading = false; // stop loading
        }).catch(err => {
          self.loading = false; // stop loading
        })
      }
    }
  },
}
</script>
