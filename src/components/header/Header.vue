<script setup lang="ts">
import { AnFilledGithub } from '@kalimahapps/vue-icons';
import { AkLinkedinBoxFill } from '@kalimahapps/vue-icons';
import { MEDIA_LINK } from '../../contants/media';

const openLink = (link: string) => {
  window.open(link, '_blank');
};
</script>

<template>
  <div class="comic-header">
    <div class="comic-header__section">
      <h3 class="comic-title">
        <span class="comic-title--colored">Com</span>ic
      </h3>
      <h3 class="comic-title comic-title--moved">
        <span class="comic-title--colored">Vi</span>ewer
      </h3>
    </div>
    <div class="comic-header__section">
      <div class="comic-social">
        <div class="comic-social__divition" @click="openLink(MEDIA_LINK.GIT)">
          <AnFilledGithub />
        </div>
        <div
          class="comic-social__divition"
          @click="openLink(MEDIA_LINK.LINKEDIN)"
        >
          <AkLinkedinBoxFill />
        </div>
      </div>
    </div>
  </div>
</template>
