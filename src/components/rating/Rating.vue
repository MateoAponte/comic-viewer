<script lang="ts" setup>
import { CaViewFilled } from '@kalimahapps/vue-icons';
import { FlFilledDelete } from '@kalimahapps/vue-icons';
import Rating from '../comic/components/Rating.vue';
import { useComicStore } from '../../store';
import { storeToRefs } from 'pinia';
import Sorted from './Sorted.vue';
import { ComicRated } from '../../interfaces/ComicResponse';

const emits = defineEmits(['update:selection']);

const comicStore = useComicStore();
const { comicData, ratedComics } = storeToRefs(comicStore);

const updateRating = (evt: number) => {
  comicStore.updateComicRating(comicData.value, evt);
};

const getComic = (comic: ComicRated) => {
  const getNumber = comic.num.toString().split('#').join('') || '';
  comicStore.fetchAndUpdateComicData(parseInt(getNumber));
  emits('update:selection', 0);
};

const deleteComic = (comic: ComicRated) => {
  comicStore.deleteComicById(comic);
};
</script>

<template>
  <section class="comic__container">
    <div class="comic-rating">
      <Sorted />
      <div
        class="comic-rating__gallery"
        v-for="comic in ratedComics"
        :key="comic.num"
      >
        <div class="comic-rating__image">
          <img :src="comic.img" :alt="comic.alt" />
        </div>
        <div class="comic-rating__info">
          <div class="comic-rating__data">
            <span class="comic-rating__num"> # {{ comic.num }} </span>
            <span class="comic-rating__title">
              {{ comic.title }}
            </span>
          </div>
          <div class="comic-rating__description">
            {{ comic.alt }}
          </div>
          <div class="comic-rating__rating">
            <Rating @update:rating="updateRating" :rate="comic.rating" />
          </div>
        </div>
        <div class="comic-rating__buttons">
          <button class="button-view">
            <CaViewFilled @click="getComic(comic)" />
          </button>
          <button class="button-delete">
            <FlFilledDelete @click="deleteComic(comic)" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
