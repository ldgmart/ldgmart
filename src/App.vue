<template>
<div id="app">
  <v-app>
    <MainToolbar></MainToolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer >
      <v-layout text-xs-center >
     
                <v-flex >
                  <router-link  to="/Privacy">   개인정보 처리방침   </router-link>
                     
                 <!-- <v-btn primary flat href="/#/Privacy" target="_self">개인정보처리방침 
                   </v-btn>-->
                     <v-divider :inset="inset" vertical></v-divider> 
                     <router-link to="/Privacy">   이용약관   </router-link>
                    </v-flex>
         
            </v-layout>
    </v-footer>
  </v-app>
  </div>
</template>

<script>

import MainToolbar from '@/components/MainToolbar.vue'
export default {
  components: {
    MainToolbar
  }
}
</script>