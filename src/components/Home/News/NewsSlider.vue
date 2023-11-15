<script setup lang="ts">
import { register } from 'swiper/element/bundle';
import NewsCard from './NewsCard.vue';
import { ref, onMounted, computed} from 'vue';
import {resizeLogic} from '../../../helpers/resizeLogic.ts';
import {type SlidesPerView} from '../../../helpers/resizeLogic.ts';
import { useAllNews } from '../../../store/useAllNews';
register();
const viewWidth = ref(0);
const numberOfCards = ref({} as SlidesPerView);
const newsStore = useAllNews();
const news = ref([] as NewData[]);

onMounted(()=>{
  viewWidth.value = document.documentElement.clientWidth;
  numberOfCards.value = resizeLogic(viewWidth.value);
  news.value = newsStore.getNews();
});

window.addEventListener('resize', ()=>{
  viewWidth.value = document.documentElement.clientWidth;
  numberOfCards.value = resizeLogic(viewWidth.value);
});

const getNews = computed(()=>{
  if(news.value.length > 10){
    const cutArr = news.value.splice(0, 10);
    return cutArr;
  }
  return news.value;
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
            <swiper-slide v-for="userNew in getNews">
              <NewsCard
                :link="`/noticias/${userNew.id}`"
                :content="userNew.description"
                :title="userNew.title"  
                :img="userNew.url"
              />
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