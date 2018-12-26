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
      <v-jumbotron
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
      </v-jumbotron>

      <br>
      <form>
        <v-text-field
          label="Course Code"
          clearable
        />
      </form>

      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
      >
        <template 
          slot="items" 
          slot-scope="props"
        >
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  head: {
    script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js' },
    ]
  },
  data: () => ({
    gradient: 'to top right, rgba(14,180,142, .7), rgba(0,158,214, .7)',
    pastpaper: [],
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' }
    ],
    desserts: [
      {
        value: false,
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%'
      }
    ]
  }),
  mounted() { // when the Vue app is booted up, this is run automatically.
    var self = this // create a closure to access component in the callback below
    $.getJSON('https://hkuexambaseapi.herokuapp.com/pastpaper/comp3230', function(data) {
      self.posts = data;
    });
  }
}
</script>
