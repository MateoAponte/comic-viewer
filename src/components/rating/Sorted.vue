<script lang="ts" setup>
import { CoStar } from '@kalimahapps/vue-icons';
import { BsCalendar2Date } from '@kalimahapps/vue-icons';
import { CoListNumbered } from '@kalimahapps/vue-icons';
import { useComicStore } from '../../store';
import { SortedTypes } from '../../interfaces/components/sorted/sorted';
import { ComicData } from '../../interfaces/store/ComicData';
import { CaStringText } from '@kalimahapps/vue-icons';

const comicStore = useComicStore();
const { ratedComics } = comicStore;

const sortByName = () => {
  const copyRated: Array<ComicData> = [...ratedComics];
  return copyRated.sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  );
};
const sortByRate = () => {
  const copyRated: Array<ComicData> = [...ratedComics];
  return copyRated.sort((a, b) => a.rating - b.rating).reverse();
};
const sortByDate = () => {
  const copyRated: Array<ComicData> = [...ratedComics];
  return copyRated.sort(
    (a: ComicData, b: ComicData) => new Date(a.date) - new Date(b.date)
  );
};
const sortByNum = () => {
  const copyRated: Array<ComicData> = [...ratedComics];
  return copyRated.sort((a, b) => a.num - b.num);
};

const sortComics = (sortValue: string) => {
  let sortedArrays: Array<ComicData>;
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
