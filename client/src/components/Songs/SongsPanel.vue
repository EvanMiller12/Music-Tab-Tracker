<template>
  <panel title="Songs">
 <!-- router link messed w/ styling so added navto method -->
 <!--  <router-link
    slot="action"
    :to="{name: 'song-create'}"> -->
    <v-btn
      slot="action"
      :to="{
        name: 'songs-create'
      }"
      class="cyan accent-2"
      light
      medium
      absolute
      right
      middle
      fab>
      <v-icon>add</v-icon>
    </v-btn>
  <!-- </router-link> -->
  <div
    class="song"
    v-for="song in songs"
    :key="song.id">
    <v-layout>
      <v-flex xs6>
        <div class="song-title">
          {{song.title}}
        </div>
        <div class="song-artist">
          {{song.artist}}
        </div>
        <div class="song-genre">
          {{song.genre}}
        </div>

        <v-btn
          dark
          class="cyan"
          :to="{
            name: 'song',
            params: {
              songId: song.id
            }
          }">
          View
        </v-btn>
      </v-flex>

      <v-flex xs-6>
        <img :src="song.albumImageUrl" :alt="song.title" class="album-image">
      </v-flex>
    </v-layout>
  </div>
</panel>
</template>

<script>
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      songs: null
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.getSongs(value)).data
      }
    }
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size: 30px;
}
.song-artist {
  font-size: 24px;
}
.song-genre {
  font-size: 18px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
