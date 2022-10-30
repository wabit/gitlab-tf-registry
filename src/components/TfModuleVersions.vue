<template>
    <v-card height="720" class="scroll">
      <v-overlay :value="loading" absolute>
        <v-row
        class="fill-height"
        align-content="center"
        justify="center"
      >
        <v-col
          class="text-subtitle-1 text-center"
          cols="12"
        >
          Fetching Version information
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="primary"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
      </v-overlay>
      <ul v-for="version in versionInfo" :key="version.version">
        <li class="pt-4 ma-3">
          <h2>{{ version.version }}</h2>
          <p>Comments: {{ version.message }}</p>
        </li>
      </ul>
    </v-card>
</template>

<script>
export default {
  name: 'TfModuleVersions',
  props: ['id', 'versions'],
  computed: {
  },
  data () {
    return {
      versionInfo: [],
      versionInfoLoading: true,
      appToken: this.$session.get("appToken"),
      loading: true
    }
  },
  created() {
    this.getCommitMessage()
  },
  methods: {
    async getCommitMessage() {
      console.log(this.versions)

      try {
        for (const version of this.versions) {
          const commitMessage = await this.$http.get(
            "https://gitlab.com/api/v4/projects/" + this.id + "/repository/commits/" + version,{
            headers: {
              Authorization: 'Bearer ' + this.appToken
            }
          })
          const versionDetails = {
            version: version,
            message: commitMessage.data.message
          }
          this.versionInfo.push(versionDetails)
        }
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    }
  },
}
</script>
<style scoped>
.scroll {
   overflow-y: auto
}
</style>