<template>
<v-app>
  <v-navigation-drawer
    app
    absolute
      dark
      class="sidebar"
      permanent
  >
    <v-list
      nav
      dense
    >
      <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link>
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{item.text}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app
    absolute
    >

      <v-toolbar-title>Cool Tools{{$route.name}}</v-toolbar-title>
  </v-app-bar>

  <v-main>

    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    // HelloWorld,
  },
  mounted() {
    this.$session.set("username", "user123");
  },
  data: () => ({
    items: [
      {
        icon: 'mdi-home',
        text: 'Home',
        link: '/',
      },
      {
        icon: 'mdi-terraform',
        text: 'Terraform Modules',
        link: '/tf-modules',
      },
      {
        icon: 'mdi-cogs',
        text: 'Settings',
        link: '/Settings',
      },
    ],
  }),
}
</script>
<style scoped>
.sidebar {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 200% 200%;
  animation: gradient 5s ease infinite;
  height: 100vh;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>