<template>
  <panel title="Bookmarks">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="bookmarks">
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">
          <v-btn
            class="title-link"
            flat
            :to="{
              name: 'song',
              params: {
                songId: props.item.SongId
              }
            }">
            {{props.item.title}}
          </v-btn>
        </td>
        <td class="text-xs-right">
          {{props.item.artist}}
        </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  data () {
    return {
      // headers- array of the text- data for column and value- key referenced from bookmark array
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Artist',
          value: 'artist'
        }
      ],
      // sort bookmorks by date created
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      bookmarks: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    // if user is logged in, make request to backend for all users bookmarks
    if (this.isUserLoggedIn) {
      this.bookmarks = (await BookmarksService.getBookmarks()).data
    }
  }
}
</script>

<style scoped>
  .title-link {
    padding: 0;
    margin-right: 0;
  }
</style>
