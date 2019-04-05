import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        uesrname:null,
        userstate:null
    },
    mutations:{
        setLogin(state, user){
            state.username = user.username;
            state.userstate = user.userstate;
            console.log('我在mutation里面'+state.username);
        }
    },
    actions,
    getters: {
        loadingState: (state) =>{
            console.log('我在getter里面'+state.username);
            return state.userstate;
        }
    }
})