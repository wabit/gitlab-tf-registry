<template>
  <div class="home">
    <TfModules v-if="showModules"/>
    <v-overlay
      :dark="$vuetify.theme.dark"
      v-model="showDialog"
      absolute
    >
      <v-card>
        <v-card-title>
          You don't seem to have any groups or credentials configured, set them up bellow.
        </v-card-title>
        <TfModuleSettings  @save="checkSettings()" />
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
// @ is an alias to /src
import TfModules from '@/components/TfModules.vue'
import TfModuleSettings from '@/components/TfModuleSettings.vue'


export default {
  name: 'HomeView',
  components: {
    TfModules,
    TfModuleSettings
  },
  data() {
    return {
      showModules: false,
      showDialog: true
    }
  },
  created() {

  },
  computed: {

  },
  methods: {
  checkSettings(){
      if ( this.$session.get("groupId") && this.$session.get("appToken")) {
        this.showModules = true
        this.showDialog = false
      } else {
        this.showModules = false
        this.showDialog = true
      }
    }
  }
}
</script>
