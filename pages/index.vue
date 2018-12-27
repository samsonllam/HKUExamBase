<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex 
      xs12 
      sm8 
      md6
    >
      <v-img
        :gradient="gradient"
        dark
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
      >
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>
              <h3 class="display-3">HKUExamBase</h3>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>

      <br>

      <v-text-field
        :loading="loading"
        v-model="code"
        label="Course Code"
        clearable
        placeholder="ACCT1101"
        @keyup.enter.native="searchByCode"
      />

      <!-- Not Foudn Alert -->
      <v-alert
        :value="notFoundAlert"
        type="error"
        transition="scale-transition"
      >
        This course does not exist.
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
          <td class="text-xs-right">{{ props.item.department }}</td>
          <td class="text-xs-right">{{ props.item.blocked }}</td>
          <td class="text-xs-right">{{ props.item.remark }}</td>
          <td class="text-xs-center"><a 
            :href="props.item.url" 
            target="_blank"
          >
            Enter
          </a></td>
        </template>
      </v-data-table>
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
    gradient: 'to top right, rgba(14,180,142, .7), rgba(0,158,214, .7)',
    loading: false,
    code: '',
    notFoundAlert: false,
    headers: [
      {
        text: 'Code',
        align: 'left',
        // sortable: false,
        value: 'code'
      },
      { text: 'Title', value: 'title' },
      { text: 'Exam Date', value: 'exam_date' },
      { text: 'Department', value: 'department' },
      { text: 'Blocked', value: 'blocked' },
      { text: 'Remark', value: 'remark' },
      { text: 'Enter', 
        sortable: false,
        value: 'enter' 
      }
    ],
    pastpaper: [],
  }),
  // mounted() { // when the Vue app is booted up, this is run automatically.
  //   var self = this // create a closure to access component in the callback below
  //   // $.getJSON('https://hkuexambaseapi.herokuapp.com/pastpaper/comp3230', function(data) {
  //   //   data.forEach(course => {
        
  //   //   });
  //   //   self.pastpaper = data;
  //   // });

  //   axios.get('https://hkuexambaseapi.herokuapp.com/pastpaper/comp3230').then((res) => {
  //     res.data.forEach(course => {
  //       const code = course.code;
  //       const pastpapers = course.pastpaper;
  //       pastpapers.forEach(pastpaper => {
  //         pastpaper.code = code;
  //         self.pastpaper.push(pastpaper)
  //       });
  //     });
  //     self.pastpaper = [].concat.apply([], self.pastpaper);
  //   })
  // },
  methods:{
    searchByCode () {
      var self = this // create a closure to access component in the callback below
      self.loading = true; // start loading
      self.notFoundAlert = false; // close not found alert
      self.pastpaper = [];
      axios.get(`http://localhost:3000/pastpaper/${self.code}`).then((res) => {
      // axios.get(`https://hkuexambaseapi.herokuapp.com/pastpaper/${self.code}`).then((res) => {
        if(res.data.status == 404){
          self.notFoundAlert = true; // show not found alert
        } else {
          self.pastpaper = res.data;
        }
        self.loading = false; // stop loading
      }).catch(err => {
        console.log(err)
        self.loading = false; // stop loading
      })
    }
  },
}
</script>
