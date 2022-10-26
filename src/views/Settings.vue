<template>
  <div class="settings">
    <Settings/>
  </div>
</template>

<script>
// @ is an alias to /src
import Settings from '@/components/Settings.vue'

export default {
  name: 'HomeView',
  components: {
    Settings
  }
}
</script>
