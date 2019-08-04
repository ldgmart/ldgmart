<template>
<v-content>

    <hr>
  <v-data-table 
  :headers="titleheadersdata" 
  >
  <data-table>
    ????
  </data-table>   
  </v-data-table>
  <table id="firstTable">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Profession</th>
    </tr>
  </thead>
  
  <tbody>
    <tr >
      <td>111</td>
      <td>222</td>
      <td>333</td>
      <td>444</td>
    </tr>
  </tbody>
</table>
    
    <v-layout justify-end>
      <v-menu>
        
        <template v-slot:activator="{ on }">
          <v-btn small
                 color="error"
                 v-on="on"
                 >
            글쓰기
          </v-btn>
        </template>
       <v-card>
          <v-list>
            <v-list-tile>
              <v-list-tile-title>
                Are you sure you want to delete selected items?
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat>Cancel</v-btn>
            <v-btn color="error" flat @click="deleteProduct(selectedDeserts)">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      
      </v-menu>
    
    </v-layout>

    <hr>
    
</v-content>


</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
  export default {
   props: {
      dbtabledata: {
        type: Array,
        default: () => []
      }
    },
    data: function(){
      return{
        errorSnackbar: false, // tag to show snackBar
        titleheadersdata: [
          { text: '번호',  value: 'index', sortable: false},
          { text: '말머리', value: 'type', sortable: false },
          { text: '제목', value: 'subject', sortable: false },
          { text: '글쓴이', value: 'nickname', sortable: false },
          { text: '작성일', value: 'date', sortable: false },
          { text: '조회', value: 'viewcount', sortable: false },
          { text: '추천', value: 'recommendation', sortable: false }
        ], // default headers data with parameters
        tabletitles: ['번호',	'말머리',	'제목',	'글쓴이',	'작성일',	'조회',	'추천'], // selected headers data (which is shown)
        selectedDeserts: [] // selected deserts to delete
      }
    },
    computed: {
      titleobj: function() {
        // make an arr from Objects from filtered headers arr
        return this.filterHeaders();
      },
      headersWithoutLastItem: function() {
        // headers without last item - '' (which contains delete button)
        return this.titleheadersdata.slice(0, this.titleheadersdata.length - 1);
      },
      // errorDeleting - boolean from Vuex which sets to TRUE if deleting error
      ...mapState(["errorDeleting"])
    },
    methods: {
      filterHeaders: function() {
        // filter headers Arr of Objects the same as sorted Arr
        let selectedHeadersWithDeleteColumn = this.tabletitles.concat(['']);
        let filteredArrofObj = [];
        for (let i = 0; i < selectedHeadersWithDeleteColumn.length; i++) {
          for (let j = 0; j < this.titleheadersdata.length; j++) {
            if (selectedHeadersWithDeleteColumn[i] === this.titleheadersdata[j].text) {
              filteredArrofObj.push(this.titleheadersdata[j]);
            }
          }
        }
        return filteredArrofObj;
      },
      // deleteProduct - call server to delete product
      ...mapActions(["deleteProduct"]),
      // setDeletingError - set deleting error in Vuex
      ...mapMutations(["setDeletingError"])
    },
    watch: {
      errorDeleting: function() {
        // if it is error on server call snackbar
        this.errorSnackbar = true;
      },
      errorSnackbar: function() {
        // if snackbar finished set deletingError on server to false
        this.setDeletingError(false);
      }
    }
  }
</script>

<style>
  
</style>
