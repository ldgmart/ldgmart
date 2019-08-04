<template>
<div>
  <v-container>
    <boardtitle></boardtitle>

    <div v-if="errorFromServer">
        <v-alert
          :value="true"
          color="error"
          icon="warning"
          outline>
          Data loading failed. You can try one more time:
          <v-btn small
                 outline
                 color="info"
                 @click="getData()">
            Try
          </v-btn>
        </v-alert>
    </div>
    <div v-else>
      <boardbody v-if="loaded" :product="products"></boardbody>
      <div class="text-xs-center" v-else>
        <v-progress-circular
          :size="100"
          color="primary"
          indeterminate
        ></v-progress-circular>
        <h2 color="primary">loading data...</h2>
      </div>
    </div>

</v-container>
</div> 

</template>

<script>
import Board_Title from './Board_Title'
import Board_Body from './Board_Body'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    'boardtitle' : Board_Title,
    'boardbody' : Board_Body
  }, 
  data: () => ({}),
  computed: {
    ...mapState(["loaded", "errorFromServer", "product"])
  },
  methods: {
    ...mapActions(["getData"])
  },
  mounted: function() {
    this.getData();
  }
};
</script>

<style>
  
</style>
