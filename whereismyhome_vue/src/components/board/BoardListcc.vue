<template>
  <div id="board">
    <v-app-bar class="primary">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon large>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item"
            :to="{
              name: itemsMap[item],
            }"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-app-bar-title class="text-no-wrap white--text">아파트</v-app-bar-title>

      <v-spacer></v-spacer>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title color="white">
          <v-tab v-for="item in items" :key="item" :to="{ name: itemsMap[item] }">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item"
            :to="{
              name: itemsMap[item],
            }"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import http from "@/util/http-common"

export default {
  data() {
    return {
      items: {},
    }
  },
  created() {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
