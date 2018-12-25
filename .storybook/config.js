import { configure, addDecorator } from '@storybook/vue'
import { withOptions } from '@storybook/addon-options'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import theme from '@/vuetify.config.js'
import StoryCentered from '@/components/StoryCentered'

Vue.use(Vuex)

Vue.use(Vuetify, {
  theme
})

Vue.component('StoryCentered', StoryCentered)

Vue.component('nuxt-link', {
  functional: true,
  render (createElement, context) {
    let allClass = {}
    let arrClass = context.data.staticClass
      ? context.data.staticClass.split(' ')
      : []
    arrClass.forEach(theClass => {
      allClass[theClass] = true
    })
    return createElement('a', { class: allClass }, context.children)
  }
})
Vue.component('no-ssr', {
  functional: true,
  render (createElement, context) {
    return context.children
  }
})

/* start Css resources */
import '!!style-loader!css-loader!stylus-loader!../assets/style/reset.styl'

import '!!style-loader!css-loader!stylus-loader!../assets/style/app.styl'

import '!!style-loader!css-loader!stylus-loader!../assets/style/base.styl'
/* end Css resources */

addDecorator(
  withOptions({
    name: 'HKUExamBase',
    url: 'https://github.com/samsonllam/HKUExamBase.git',
    addonPanelInRight: true
  })
)

const CenterDecorator = storyFn => {
  const story = storyFn()
  return {
    component: { story },
    template: `<StoryCentered><story></story></StoryCentered>`
  }
}
addDecorator(CenterDecorator)

const req = require.context('../components', true, /stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)