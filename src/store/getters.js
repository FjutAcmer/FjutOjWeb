const getters = {
  loadingState(state){
    console.log('我在getter里面'+state.username);
    return state.userstate;
  }
}

export default getters
