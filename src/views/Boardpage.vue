<template>
<v-content>
  <board/> 
</v-content>
</template>

<script>
import Board from '@/components/Board.vue' 

export default {
  name: 'Boardpage',
  components: {
    'board' : Board
  },
  data () {
    return {
    }
  },
  mounted() {
  
  },  
};
</script>

<style>
  
</style>
