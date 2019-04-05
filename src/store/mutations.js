const mutations = {
    setLogin(state, user){
        state.username = user.username;
        state.userstate = user.userstate;
        console.log('我在mutation里面'+state.user.username);
    }
}

export default mutations