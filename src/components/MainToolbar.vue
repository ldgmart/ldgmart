<template>
<v-layout row>
    <v-flex xs12 sm6 offset-sm3>
        <v-toolbar clipped-left app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
            <v-btn flat href="/" target="_self">
                <v-flex class="font-weight-light">SUGO.EE
                </v-flex>
            </v-btn>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat>Link One</v-btn>
                <v-btn flat>Link Two</v-btn>
                <v-btn flat>Link Three</v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-btn flat href="/#/Signin" target="_self">
                <v-flex class="font-weight-light"> {{loginBtnLabel }} </v-flex>
            </v-btn> 

        </v-toolbar>
        <v-navigation-drawer v-model="drawer" temporary absolute width="200" id="drawer">
            <v-btn flat href="/" target="_self">
                <v-flex class="font-weight-light"> SUGO.EE </v-flex>
            </v-btn>
      
        <v-divider></v-divider>
            <v-list subheader>
                <v-subheader> 포지션 게시판 </v-subheader>
                <v-list-tile 
                    v-for="item in mobile_menu" 
                    :key="item.title" 
                    :to="item.link" 
                    avartar
                    :prepend-icon="item.action"
                >
                <v-list-tile-avatar>
                     <img :src="item.avatar"> </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
               </v-list-tile-content>            
          </v-list-tile>

        <v-divider></v-divider>
            <v-btn flat href="/#/Privacy" target="_self">
                <v-flex class="font-weight-light"> 개인정보취급방침 </v-flex>
            </v-btn>


            </v-list>

        </v-navigation-drawer>

    </v-flex>
</v-layout>
</template>

<script>
import axios from 'axios'
export default {
    name: "MainToolbar",
    data() {
        return {
            drawer: null,
            isLogined: false,
            mobile_menu: [{
                    avatar: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/e/ef/Top_icon.png/revision/latest?cb=20181117143602', title: 'TOP'
                },
                {
                   avatar: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/1/1b/Jungle_icon.png/revision/latest?cb=20181117143559',  title: 'JUNGLE'
                },
                {
                    avatar: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/9/98/Middle_icon.png/revision/latest?cb=20181117143644', title: 'MIDDLE'
                },
                {
                    avatar: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/9/97/Bottom_icon.png/revision/latest?cb=20181117143632', title: 'BOTTOM'
                },
                {
                    avatar: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/e/e0/Support_icon.png/revision/latest?cb=20181117143601', title: 'SUPPORT'
                }
            ],
            items: [{
                    title: 'Home',
                    icon: 'dashboard'
                },
                {
                    title: 'About',
                    icon: 'question_answer'
                }
            ]
            // items: [{
            //         team: 'TOP',
            //         link: '/Signin'
            //     },
            //     {
            //         team: 'JUNGLE',
            //         link: '/Board/Team/Epicseven'
            //     },
            //     {
            //         team: 'MIDDLE',
            //         link: '/Board/Team/EpicEight'
            //     },
            //     {
            //         team: 'BOTTOM',
            //         link: '/Board/Team/Sandbox'
            //     }
            // ]
        }
    },
    methods: {
        checkLoginStatus() {
            axios.get('http://54.180.37.121:8090/Status').then(res => {
                if (res.data == 'YES') {
                    this.isLogined = true;
                }
            })
        }

    },
    mounted() {
        this.checkLoginStatus();
    },
    computed: {
        loginBtnLabel() {
            if (this.isLogined) {
                return 'LOGOUT'
            } else {
                return 'LOGIN'
            }
        }
    }
}
</script>
