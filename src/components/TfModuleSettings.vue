<template>
  <v-card class="pa-4">
    <div class="text-overline mb-4">
      Terraform module settings
    </div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="groupId"
          label="Group Id"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="appToken"
          label="Application Token"
          @click:append="showAppToken = !showAppToken"
          :append-icon="showAppToken ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showAppToken ? 'text' : 'password'"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn
    rounded
    color="primary"
    dark
    @click.stop="save()"
    >Save</v-btn>
    <v-btn
    rounded
    color="warning"
    dark
    @click.stop="reset()"
    >reset</v-btn>
  </v-card>
</template>

<script>

export default {
  name: 'TfModuleSettings',
  components: {

  },
  data() {
    return {
      showAppToken: false,
      groupId: '',
      appToken: ''
    }
  },
  created() {
    this.getSavedValues()
  },
  methods: {
    getSavedValues(){
      if (this.$session.get("groupId"))
        this.groupId = this.$session.get("groupId")
      if (this.$session.get("appToken"))
      this.appToken = this.$session.get("appToken")
    },
    save() {
      console.log(this.groupId)
      console.log(this.appToken)
      this.$session.set("groupId", this.groupId)
      this.$session.set("appToken", this.appToken)
      this.$emit('save')
    },
    reset() {
      this.groupId = ""
      this.appToken = ""
      this.$session.set("groupId", this.groupId)
      this.$session.set("appToken", this.appToken)
      this.$emit('reset')
    }
  }
}
</script>
