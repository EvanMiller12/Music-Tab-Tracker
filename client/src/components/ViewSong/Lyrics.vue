<template>
  <panel  title="Lyrics">
    <textarea
      readonly
      v-model="song.lyrics"
    ></textarea>
  </panel>
</template>

<script>
export default {
  props: [
    'song'
  ]
}
</script>

<style scoped>
  textarea {
    font-family: monospace;
    width: 100%;
    height: 600px;
    border: none;
    border-style: none;
    border-color: transparent;
    overflow: auto; /* scrollbar */
    padding: 40px;
  }
</style>
