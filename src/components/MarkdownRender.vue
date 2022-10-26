<template>
  <v-card class="scroll"  height="720">
    <div class="ma-4" v-html="rendered"></div>
  </v-card>
</template>

<script>
import MarkdownIt from 'markdown-it'

export default {
  name: 'MarkdownRender',
  props: ['content'],
  computed: {
    rendered: function() {
      const md = new MarkdownIt()
      md.set({ linkify: true })
      return md.render(this.content)
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.scroll {
   overflow-y: scroll
}
</style>