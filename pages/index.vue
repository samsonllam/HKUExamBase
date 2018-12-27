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
        aspect-ratio="2"
        dark
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
      >
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>
              <h3 class="display-2">HKUExamBase</h3>
              <br><br>
              <v-text-field
                :loading="loading"
                v-model="code"
                label="Course Code"
                color="rgba(150, 255, 120, 0.8)"
                clearable
                placeholder="ACCT1101"
                @keyup.enter.native="searchByCode"
              />
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
          <td class="text-xs-right">{{ props.item.department.toString() }}</td>

          <td class="text-xs-center">
            <v-tooltip 
              v-if="props.item.remark != null"
              bottom
            >
              <div slot="activator">
                <v-icon
                  slot="activator"
                  color="primary"
                  dark
                >info</v-icon>
              </div>
              <span>{{ props.item.remark }}</span>
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
  // mounted() { // when the Vue app is booted up, this is run automatically.
  //   var self = this // create a closure to access component in the callback below
  //   // $.getJSON('https://hkuexambaseapi.herokuapp.com/pastpaper/comp3230', function(data) {
  //   //   data.forEach(course => {
        
  //   //   });
  //   //   self.pastpaper = data;
  //   // });

  //   axios.get('http://localhost:3000/pastpaper/comp3230').then((res) => {
  //     res.data.forEach(course => {
  //       self.pastpaper = res.data;
  //     });
  //   })
  // },
  methods:{
    searchByCode () {
      var self = this // create a closure to access component in the callback below
      self.loading = true; // start loading
      self.notFoundAlert = false; // close not found alert
      self.pastpaper = [];
      // axios.get(`http://localhost:3000/pastpaper/${self.code}`).then((res) => {
      axios.get(`https://hkuexambaseapi.herokuapp.com/pastpaper/${self.code}`).then((res) => {
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
