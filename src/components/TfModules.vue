<template>
  <v-container>
    <div>
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
          Fetching Module Information
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
      <v-expansion-panels>
        <v-expansion-panel v-for="tfmodule in modules" v-bind:key="tfmodule.id" @click="showDescription = !showDescription">
          <v-expansion-panel-header>
            <v-row justify="center">
              <v-col cols-="1">
                <v-avatar>
                  <img :src= tfmodule.avatar_url >
                </v-avatar>
              </v-col>
              <v-col cols="11" class="ma-auto">
                <h2>{{ tfmodule.name }}</h2>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <div class="ml-4" v-if="showDescription">
            <p>{{ tfmodule.description }}</p>
          </div>
        <v-expansion-panel-content>
          <v-tabs>
            <v-tab>
              <v-icon left>mdi-information</v-icon> information
            </v-tab>
            <v-tab>
              <v-icon left>mdi-text-box</v-icon> docs
            </v-tab>
            <v-tab>
              <v-icon left>mdi-history</v-icon> versions
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <p>
                    <tf-module-information :repoInfo="tfmodule" />
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <p>
                    <MarkdownRender :content="tfmodule.readme" />
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <p>
                    <TfModuleVersions :id="tfmodule.id" :versions="tfmodule.tf_module_versions" />
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-container>
</template>

<script>
import MarkdownRender from '@/components/MarkdownRender.vue'
import TfModuleInformation from '@/components/TfModuleInformation.vue'
import TfModuleVersions from '@/components/TfModuleVersions.vue'

  export default {
    name: 'tf-modules',
    components: {
      MarkdownRender,
      TfModuleInformation,
      TfModuleVersions
    },
    data() {
      return {
        modules: [],
        readme: "",
        appToken: this.$session.get("appToken"),
        groupId: this.$session.get("groupId"),
        showDescription: true,
        loading: true
      }
    },

    created() {
      this.getData()
    },

    methods: {
    async getData() {
      try {
        const response = await this.$http.get(
          "https://gitlab.com/api/v4/groups/" + this.groupId + "/projects?simple=false",{
            headers: {
              Authorization: 'Bearer ' + this.appToken
            }
          })
        this.modules = response.data
        this.getReadmes()
        this.getModuleInfo()
        this.getModuleVersionInfo()
        this.loading = false
      } catch (error) {
        console.log(error);
      }
    },
    async getReadmes() {
      try {
        for (const module of this.modules) {
          const readme = await this.$http.get(
            "https://gitlab.com/api/v4/projects/" + module.id + "/repository/files/README.md?ref=master",{
              headers: {
                Authorization: 'Bearer ' + this.appToken
              }
            })
            const markdown = atob(readme.data.content)
            module.readme = markdown.toString()
            this.$forceUpdate()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getModuleInfo() {
      try {
        for (const module of this.modules) {
          const moduleMainGroup = module.path_with_namespace.split("/", 1)
          const moduleCurrentVersion = await this.$http.get(
            "https://gitlab.com/api/v4/packages/terraform/modules/v1/" + moduleMainGroup + "/" + module.path + "/aws",{
              headers: {
                Authorization: 'Bearer ' + this.appToken
              }
            })
            module.tf_module_current = moduleCurrentVersion.data
            this.$forceUpdate()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getModuleVersionInfo() {
      try {
        for (const module of this.modules) {
          const moduleMainGroup = module.path_with_namespace.split("/", 1)
          const moduleVersionsData = await this.$http.get(
            "https://gitlab.com/api/v4/packages/terraform/modules/v1/" + moduleMainGroup + "/" + module.path + "/aws/versions",{
              headers: {
                Authorization: 'Bearer ' + this.appToken
              }
            })
            const moduleVersions = []
            moduleVersionsData.data.modules[0].versions.forEach(element => {
              moduleVersions.push(element.version)
            })
            module.tf_module_versions = moduleVersions
            this.$forceUpdate()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
