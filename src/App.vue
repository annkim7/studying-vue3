<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">Post</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <p>{{ myname }} {{ age }} {{ likes }}</p>

  <h4>안녕 {{ $store.state.age }}</h4>
  <button @click="plus(10)">클릭</button>

  <!-- <h4>안녕 {{ $store.state.age }}</h4>
  <button @click="$store.commit('plus', 10)">클릭</button>

  <p>{{ $store.state.more }}</p>
  <button @click="$store.dispatch('getData')">더보기 버튼</button> -->

  <Container :uploadFile="uploadFile" :datas="datas" :step="step" @write="writeTxt = $event"/>
  <!-- <button @click="more">더보기</button> -->

  <!-- <p>{{ now2 }} {{ counter }}</p>
  <button @click="counter++">버튼</button> -->

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

  <!-- <div v-if="step == 0">내용0</div>
  <div v-if="step == 1">내용1</div>
  <div v-if="step == 2">내용2</div>
  <button @click="step = 0">버튼0</button>
  <button @click="step = 1">버튼1</button>
  <button @click="step = 2">버튼2</button> -->
</template>

<script>
import Container from './components/Container.vue'
import Data from './assets/data.js'
import axios from 'axios'
import {mapMutations, mapState} from 'vuex'

// axios.post()

export default {
  name: 'App',
  data(){
    return {
      step : 3,
      datas : Data,
      moreData : 0,
      uploadFile : '',
      writeTxt : '',
      chooseFilter : '',
      counter: 0,
    }
  },
  mounted() {
    this.emitter.on('filterName', (a)=>{
        this.chooseFilter = a
    });
  },
  components: {
    Container,
  },
  computed: {
    // now2(){
    //   return new Date()
    // },
    name(){
      return this.$store.state.name
    },
    ...mapState(['name', 'age', 'likes']),
    ...mapState({ myname : 'name', })
  },
  methods: {
    ...mapMutations(['setMore', 'likes', 'plus']),
    publish(){
      var myPost = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.uploadFile,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.writeTxt,
        filter: this.chooseFilter,
      };
      this.datas.unshift(myPost);
      this.step = 0;
    },
    more(){

      // axios.post('URL', {name : 'kim'}).then().catch((err)=>{
      //   err
      // })

      axios.get(`https://codingapple1.github.io/vue/more${this.moreData}.json`)
      .then((result)=>{
        console.log(result.data);
        this.datas.push(result.data);
        this.moreData++;
      })
    },
    upload(e){
      let file = e.target.files;
      console.log(file[0]);
      let url = URL.createObjectURL(file[0]);
      console.log(url);
      this.uploadFile = url;
      this.step++;
    }
  },
}
</script>

<style>
@import 'style.css';

body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
