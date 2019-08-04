<template>
<div class="login">
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>LOGIN</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-form class="ma-4 pa-2" @submit.prevent="loginPost">
              <v-card-text>
 
                  <v-text-field v-model="id" prepend-icon="person" name="id" 
label="Login" type="text"></v-text-field>
                  <v-text-field v-model = "password" prepend-icon="lock" 
name="password" label="Password" 
type="password"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type ="submit" color="primary">Login</v-btn>
				<v-btn href ="/Signup" color="primary">Signup</v-btn>
              </v-card-actions>		
			</v-form>
            </v-card>

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
  </div>
</template>

<script>

import axios from 'axios'
import router from '../router'
export default{
  name: "Signin",
  data() {
    return {
      id: "",
      password: ""
    }
  },
  methods: {
     loginPost: function() {
                    let form = new FormData()
                    form.append('id', this.id)
                    form.append('password', this.password)
                    axios.post('http://54.180.37.121:8090/Login', form).then(function(res) {
					alert(res.data)
                    }).catch(function (error) {
                        alert("Login Error")
                    })
                }
            }
			
}
</script>