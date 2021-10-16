<template>
  <v-app>
    <v-card flat>
      <v-app-bar
        absolute
        color="#6A76AB"
        dark
        shrink-on-scroll
        height="150"
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

        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        <v-app-bar-title>TODO LIST</v-app-bar-title>

        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tab @click="tabItem = 'all'">All</v-tab>
            <v-tab @click="tabItem = 'incomplete'">Incomplete</v-tab>
            <v-tab @click="tabItem = 'complete'">complete</v-tab>
            <!-- <v-tab v-for="tab in tabs" :key="tab">{{tab}}</v-tab> -->
          </v-tabs>
        </template>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-app-bar>

      <all-todo v-if="tabItem === 'all'" />
      <incomplete v-if="tabItem === 'incomplete'" />
      <complete v-if="tabItem === 'complete'" />

      <v-navigation-drawer v-model="drawer" absolute bottom temporary>
        <v-list-item>
          <v-list-item-avatar>
            <!-- <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img> -->
            <v-icon>
              mdi-account-circle
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item link @click="signOut">
            <v-list-item-icon>
              <v-icon>{{ drawerItems.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ drawerItems.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-sheet
        id="scrolling-techniques-3"
        class="overflow-y-auto"
        max-height="600"
      >
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script>
import AllTodo from "~/components/AllTodo.vue";
import Incomplete from "~/components/IncompleteTodo.vue";
import Complete from "~/components/CompleteTodo.vue";
export default {
  components: { AllTodo, Incomplete, Complete },
  data() {
    return {
      drawer: false,
      group: null,
      dialogState: false,
      items: [
        { text: "LOGOUT", icon: "mdi-logout" },
        { text: "INFOMATION", icon: "mdi-phone" }
      ],
      drawerItems: { title: "LOGOUT", icon: "mdi-logout" },
      tabItem: "all"
      // tabs:['All','Incomplete','complete']
    };
  },
  watch: {
    // tabItem(){
    //   console.log(this.tabItem)
    // },
    group() {
      this.drawer = false;
    }
  },
  methods: {
    // foo(){
    //   alert('hello')
    // },
    dialogStateChange() {
      this.dialogState = !this.dialogState;
    },
    signOut() {
      console.log(this.$router);
      this.$store.dispatch("signOut", this.$router);
    }
  }
};
</script>

<style scoped>
#dialog-box .v-toolbar__content {
  margin-left: auto;
}

.v-app-bar >>> .v-app-bar-title__content {
  text-align: center;
  top: 100px;
  left: 200px;
  width: 200px !important;
  height: 50px;
  font-size: 35px;
  font-weight: bold;
  line-height: 50px;
  color: rgba(231, 223, 223, 0.8);
}

.v-app-bar >>> .v-toolbar__extension {
  width: 80%;
}

.v-list-item__title {
  padding-left: 20px;
}
</style>
