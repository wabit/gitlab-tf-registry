<template>
  <v-container>
    <div>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="4">
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
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </v-container>
</template>

<script>

export default {
  name: 'AppSettings',
  components: {

  },
  data() {
    return {
      showAppToken: false,
      groupId: "",
      appToken: ""
    }
  },
  created() {
    this.getSavedValues()
  },
  methods: {
    getSavedValues(){
      if (this.$session.exists("groupId"))
        this.groupId = this.$session.get("groupId")
      if (this.$session.exists("appToken"))
      this.appToken = this.$session.get("appToken")
    },
    save() {
      this.$session.set("groupId", this.groupId)
      this.$session.set("appToken", this.appToken);
    }
  }
}
</script>
