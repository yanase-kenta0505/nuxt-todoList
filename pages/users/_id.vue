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
            <v-tab>All</v-tab>
            <v-tab>Incomplete</v-tab>
            <v-tab>complete</v-tab>
          </v-tabs>
        </template>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <div class="d-flex flex-column" id="dialog-box">
          <v-btn icon @click="dialogStateChange" class="ml-auto">
            <v-icon v-show="!dialogState">mdi-dots-vertical</v-icon>
            <v-icon v-show="dialogState">mdi-close-thick</v-icon>
          </v-btn>

          <v-card v-show="dialogState" max-width="200" tile>
            <v-list dense flat>
              <v-subheader>MENU</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item v-for="(item, i) in items" :key="i">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <!-- <v-list-item-title v-text="items[0].text" @click="hello"></v-list-item-title> -->

                    <v-list-item-title
                      v-text="item.text"
                      @click="event(i)"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </div>
      </v-app-bar>

      <!-- <all-todo /> -->
      <incomplete />

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
          <v-list-item
            v-for="draweritem in drawerItems"
            :key="draweritem.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ draweritem.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ draweritem.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-sheet
        id="scrolling-techniques-3"
        class="overflow-y-auto"
        max-height="600"
      >
        <v-container style="height: 1000px;"></v-container>
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script>
import AllTodo from "~/components/AllTodo.vue";
import Incomplete from "~/components/IncompleteTodo.vue";
export default {
  components: { AllTodo, Incomplete },
  data() {
    return {
      drawer: false,
      group: null,
      dialogState: false,
      items: [
        { text: "LOGOUT", icon: "mdi-logout" },
        { text: "INFOMATION", icon: "mdi-phone" }
      ],
      drawerItems: [
        { title: "Private", icon: "mdi-human-male" },
        { title: "Business", icon: "mdi-domain" },
        { title: "Home", icon: "mdi-human-male-female-child" }
      ]
    };
  },
  watch: {
    group() {
      this.drawer = false;
    }
  },
  methods: {
    dialogStateChange() {
      this.dialogState = !this.dialogState;
    },
    event(i) {
      console.log(i);
      if (i === 0) {
        console.log(this.$router);
        this.$store.dispatch("signOut", this.$router);
      } else {
        console.log("hello");
      }
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
