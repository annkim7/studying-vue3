import axios from 'axios';
import { createStore } from 'vuex'

const store = createStore({
  state(){
    return {
        name: 'store',
        age : '20',
        likes : '30',
        likeClick : false,
        more : {},
    }
  },
  mutations : {
    setMore(state, data){
      state.more = data
    },
    likes(state){
      if(state.likeClick == false){
        state.likes++;
        state.likeClick = true;
      }else{
        state.likes--;
        state.likeClick = false;
      }
    },
    plus(state, data){
      state.age += data
    },
    changeName(state){
      state.name = 'park'
    }
  },
  actions : {
    getData(context){
      axios.get('https://codingapple1.github.io/vue/more0.json')
      .then((a)=>{
        console.log(a.data);
        context.commit('setMore', a.data);
      })
    },
  },
})

export default store