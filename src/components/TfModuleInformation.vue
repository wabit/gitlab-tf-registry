<template>
  <div>
  <v-card height="590">
    <li class="pa-4 pb-0 font-weight-bold">
      Topics:
      <v-chip
        v-for="topic in repoInfo.topics"
        :key="topic"
        :color=generateRandomHexColor()
        class="mr-2"
        >
        {{topic}}
      </v-chip>
    </li>
    <v-row>
      <v-col>
        <v-card class="ma-4 mb-0 flexcard" height="175">
          <v-card-title>Description</v-card-title>
          <v-card-text>
            <div  class="ma-4">{{ repoInfo.description }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card class="ml-4 mt-0 flexcard" height="310">
          <v-card-title>Details</v-card-title>
          <v-card-text>
            <div class="ma-4">Stars: {{repoInfo.star_count}}</div>
            <div class="ma-4">Open Issues: {{repoInfo.open_issues_count}}</div>
            <div class="ma-4">Last Modified: {{formatDate(repoInfo.last_activity_at)}}</div>
            <v-btn
              class="ma-4"
              rounded
              color="primary"
              dark
              :href=repoInfo.web_url
              target="_blank"
            >
            <img src="https://about.gitlab.com/images/press/logo/png/gitlab-logo-100.png" style="height:20px;" >
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="mr-4 mt-0 flexcard" height="310">
          <v-card-title>Module Information</v-card-title>
          <v-card-text>
            <div class="ma-4">Provider: {{ repoInfo.tf_module_current.provider }}</div>
            <div class="ma-4">Current Version: {{ repoInfo.tf_module_current.version }}</div>
            <div class="ma-4">Comment: {{ latestCommitMessage }}</div>
            <v-btn
              class="ma-4"
              @click.stop="showProvInstructions = true"
              rounded
              color="primary"
              dark
            > Provision Instructions
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
  <v-dialog
      v-model="showProvInstructions"
      width="60%"
    >
      <v-card>
        <v-card-title class="text-h5">
          Provision Instructions
        </v-card-title>

        <v-card-text>
          Copy and paste into your Terraform configuration, insert the variables, and run Terraform init:
          <div v-highlight>
            <pre class="language-hcl">
              <code>
module "my_module_name" {
  source = "{{this.repoAddress}}"
  version = "{{this.repoInfo.tf_module_current.version}}"
}
              </code>
            </pre>
            <h3>Registry Setup</h3>
            <p>To authorize access to the Terraform registry using Terraform V1.2.0+ create the following environment variable:</p>
            <pre class="language-bash">
              <code>
export TF_TOKEN_gitlab_com = "[APPLICATION TOKEN]"
              </code>
            </pre>
            <p>For Early version you will need to create a code block in your terraform project:</p>
            <pre class="language-hcl">
              <code>
credentials "gitlab.com" {
  token = "[TOKEN]"
}
              </code>
            </pre>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            text
            @click="showProvInstructions = false"
          >
            Close
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment'

import Vue from 'vue';
import "vue-code-highlight/themes/duotone-sea.css";
import "vue-code-highlight/themes/window.css";
import 'prism-es6/components/prism-hcl';
import 'prism-es6/components/prism-bash';
import VueCodeHighlight from 'vue-code-highlight';
Vue.use(VueCodeHighlight);

Vue.use(VueCodeHighlight)

export default {
  name: 'TfModuleInformation',
  props: ['repoInfo'],
  components: {
  },
  computed: {
  },
  data () {
    return {
      colours: [
        "red",
        "pink",
        "purple",
        "indigo",
        "blue",
        "light-blue",
        "cyan",
        "teal",
        "green",
        "light-green",
        "lime",
        "amber",
        "orange",
        "deep-orange",
        "blue-grey",
      ],
      latestCommitMessage: "",
      showProvInstructions: false,
      repoAddress: "gitlab.com/" + this.repoInfo.path_with_namespace.split("/", 1) + "/" + this.repoInfo.path + "/aws",
      appToken: this.$session.get("appToken"),
    }
  },
  created() {
      this.getCommitMessage(this.repoInfo.id, this.repoInfo.tf_module_current.version)
    },
  methods: {
    getRandomColor() {
      this.randomColor = this.generateRandomHexColor();
    },
    generateRandomHexColor() {
      const numColours = this.colours.length
      const randomNumber = Math.floor(Math.random() * numColours)
      const colour = this.colours[randomNumber]
      return colour
    },
    formatDate(date) {
     const fmtDate = moment(date).fromNow()
     return fmtDate
    },
    async getCommitMessage(id, version) {
      try {
        const commitMessage = await this.$http.get(
          "https://gitlab.com/api/v4/projects/" + id + "/repository/commits/" + version,{
            headers: {
              Authorization: 'Bearer ' + this.appToken
            }
          })
        this.latestCommitMessage = commitMessage.data.message
      } catch (error) {
        console.log(error)
      }
    }
  },
}
</script>
