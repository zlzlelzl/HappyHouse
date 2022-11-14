<template>
  <div id="footer">
    <v-footer v-bind="localAttrs" app bottom padless="true">
      <v-card flat tile width="100%" class="primary text-center">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text"> {{ new Date().getFullYear() }} — <strong>Vuetify</strong> </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  data() {
    icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"]
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
