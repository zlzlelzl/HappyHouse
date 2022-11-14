import Vue from "vue"
import Vuetify from "vuetify/lib/framework"
import colors from "vuetify/lib/util/colors"

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.blue.lighten1,
        secondary: colors.blue.lighten2,
        // info: colors.white,
        // accent: colors.shades.black,
        // error: colors.red.accent3,
      },
      dark: {
        // primary: colors.blue.lighten3,
      },
    },
  },
})
