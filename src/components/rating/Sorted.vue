<script lang="ts" setup>
import { CoStar } from '@kalimahapps/vue-icons';
import { BsCalendar2Date } from '@kalimahapps/vue-icons';
import { CoListNumbered } from '@kalimahapps/vue-icons';
import { useComicStore } from '../../store';
import { SortedTypes } from '../../interfaces/components/sorted/sorted';
import { CaStringText } from '@kalimahapps/vue-icons';
import { ComicRated } from '../../interfaces/ComicResponse';
import { storeToRefs } from 'pinia';

const comicStore = useComicStore();
const { ratedComics } = storeToRefs(comicStore);

const sortByName = () => {
  const copyRated: Array<ComicRated> = [...ratedComics.value];
  return copyRated.sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  );
};
const sortByRate = () => {
  const copyRated: Array<ComicRated> = [...ratedComics.value];
  return copyRated.sort((a, b) => a.rating - b.rating).reverse();
};
const sortByDate = () => {
  const copyRated: Array<ComicRated> = [...ratedComics.value];
  return copyRated.sort(
    (a: ComicRated, b: ComicRated) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};
const sortByNum = () => {
  const copyRated: Array<ComicRated> = [...ratedComics.value];
  return copyRated.sort((a, b) => a.num - b.num);
};

const sortComics = (sortValue: string) => {
  let sortedArrays: Array<ComicRated>;
  switch (sortValue) {
    case SortedTypes.BY_DATE:
      sortedArrays = sortByDate();
      break;
    case SortedTypes.BY_NAME:
      sortedArrays = sortByName();
      break;
    case SortedTypes.BY_NUM:
      sortedArrays = sortByNum();
      break;
    case SortedTypes.BY_RATE:
      sortedArrays = sortByRate();
      break;
    default:
      sortedArrays = sortByNum();
      break;
  }
  comicStore.updateAllRatedComics(sortedArrays);
};
</script>

<template>
  <div class="sorted-controllers">
    <div class="sorted-controllers__label">Filter By:</div>
    <div class="sorted-controllers__icons">
      <div class="sorted-controllers__element">
        <CoStar @click="sortComics(SortedTypes.BY_RATE)" />
      </div>
      <div class="sorted-controllers__element">
        <BsCalendar2Date @click="sortComics(SortedTypes.BY_DATE)" />
      </div>
      <div class="sorted-controllers__element">
        <CoListNumbered @click="sortComics(SortedTypes.BY_NUM)" />
      </div>
      <div class="sorted-controllers__element">
        <CaStringText @click="sortComics(SortedTypes.BY_NAME)" />
      </div>
    </div>
  </div>
</template>
