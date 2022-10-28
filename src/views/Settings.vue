<template>
  <v-container>
    <div>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="4">
              <TfModuleSettings/>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </v-container>
</template>

<script>
import TfModuleSettings from '@/components/TfModuleSettings.vue'

export default {
  name: 'HomeView',
  components: {
    TfModuleSettings
  }
}
</script>
