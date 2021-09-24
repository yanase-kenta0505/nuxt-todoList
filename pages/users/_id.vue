<template>
  <v-app>
    <template>
      <v-card class="overflow-hidden">
        <v-app-bar
          absolute
          color="#6A76AB"
          dark
          shrink-on-scroll
          prominent
          src="https://picsum.photos/1920/1080?random"
          fade-img-on-scroll
          scroll-target="#scrolling-techniques-3"
        >
          <template v-slot:img="{ props }">
            <v-img
              v-bind="props"
              gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
            ></v-img>
          </template>

          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-app-bar-title style="width:350px !important">TODO LIST</v-app-bar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>

          <template v-slot:extension>
            <v-tabs align-with-title>
              <v-tab>Private</v-tab>
              <v-tab>Bussness</v-tab>
              <v-tab>Home</v-tab>
            </v-tabs>
          </template>
        </v-app-bar>
        
        <v-sheet
          id="scrolling-techniques-3"
          class="overflow-y-auto"
          max-height="600"
        >
          <v-container style="height: 1000px;"></v-container>
        </v-sheet>
        <!-- <v-btn color="success" class="mt-10" @click="signOut">SIGNOUT</v-btn> -->
      </v-card>
    </template>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      uid: this.$store.state.uid
    };
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut", this.$router);
    }
  }
};
</script>

<style  scoped>
    .v-app-bar-title__content {
        width: 100%;
    }
</style>
