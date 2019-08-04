<template>
  <div>
  <h1> {{titleheadersdata.freeboard}} </h1> 
  <p class="text-sm-right"><input flat outline type="text" v-model="search" placeholder="Search title.."/></p>
  </div>
</template>

<script>
  export default {
    el: '#title',
    data: function() {
      return{
        titleheadersdata :{
          freeboard : '자유게시판',
          playerboard : '선수게시판' 
        }
      }
    },
    computed: {
    },
    methods: {
    },
    watch: {
     }
  }
</script>

<style>
  
</style>
