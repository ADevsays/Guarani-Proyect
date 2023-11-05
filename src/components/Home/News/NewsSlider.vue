<script setup lang="ts">
import { register } from 'swiper/element/bundle';
import NewsCard from './NewsCard.vue';
import { ref, onMounted } from 'vue';
import {resizeLogic} from '../../../helpers/resizeLogic.ts';
import {type SlidesPerView} from '../../../helpers/resizeLogic.ts';
register();
const news = ref([1,2,3,34,4,5,6,6,7,7]);
const viewWidth = ref(0);
const numberOfCards = ref({} as SlidesPerView);
onMounted(()=>{
  viewWidth.value = document.documentElement.clientWidth;
  numberOfCards.value = resizeLogic(viewWidth.value);
});

window.addEventListener('resize', ()=>{
  viewWidth.value = document.documentElement.clientWidth;
  numberOfCards.value = resizeLogic(viewWidth.value);
});
</script>
<template>
      <swiper-container 
            class="mySwiper"
            :style="{width: numberOfCards.width}"
            :slides-per-view="numberOfCards.slidesPerView" 
            pagination="true" 
            space-between="30"
            loop="true" 
            speed="500"
            autoplay-delay="2500">
            <swiper-slide v-for="_ in news">
              <NewsCard/>
            </swiper-slide>
        </swiper-container>
</template>


<style scoped>
   swiper-container {
      height: 400px;
      padding: 30px;
    }

    swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: grab;
    }
    swiper-slide:active{
        cursor: grabbing;
    }

    swiper-slide div {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
</style>