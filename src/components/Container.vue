<template>
    <div>
        <Post :data="datas[i]" v-for="(a,i) in datas" :key="a"/>
        <!-- <Post/>
        <Post/> -->
    </div>
</template>

<script>
import Post from './Post.vue';

export default {
    name: 'container',
    props : {
        datas : Array,
    },
    components: {
        Post,
    }
}
</script>

<style>

</style>