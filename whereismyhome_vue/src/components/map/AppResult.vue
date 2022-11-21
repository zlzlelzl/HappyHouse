<template>
    <!-- result -->
      <v-card class="pa-1 ma-3" height="80%" style="position:absolute;">
        <v-list dense>
          <v-subheader>아파트 검색 결과</v-subheader>
          <v-list-item-group>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
  </template>
  
  <script>
  export default {
    name: "AppResult",
    data() {
      return {
        items: [
          { text: 'Real-Time', icon: 'mdi-clock' },
          { text: 'Audience', icon: 'mdi-account' },
          { text: 'Conversions', icon: 'mdi-flag' },
        ],
        inputMsg:"",
        autoSearchList:false,
        completeData:[],
      };
    },
    mounted() {
    },
    watch: {
  
    },
    methods: {
    
    },
  };
  </script>
  <style scoped>
  </style>