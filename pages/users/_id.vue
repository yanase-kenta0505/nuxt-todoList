<template>
  <v-card class="overflow-hidden">
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

      <h2>TODO LIST</h2>

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
        <v-btn icon @click="dialogStateChange">
          <v-icon v-show="!dialogState" class="mx-auto"
            >mdi-dots-vertical</v-icon
          >
          <v-icon v-show="dialogState" class="mx-auto">mdi-close-thick</v-icon>
        </v-btn>

        <v-card v-show="dialogState" max-width="200" tile style="z-index:900">
          <v-list dense flat>
            <v-subheader>MENU</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </div>
    </v-app-bar>

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

          <v-list-item-content class="ml-10">
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
    <!-- <v-btn color="success" class="mt-10" @click="signOut">SIGNOUT</v-btn> -->
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: null,
      dialogState: false,
      items: [
        { text: "LOGOUT", icon: "mdi-logout" },
        { text: "INFOMATION", icon: "mdi-phone" },
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
    }
  }
};
</script>

<style scoped>
#dialog-box {
  width: 200px;
  text-align: right;
}
h2 {
  position: absolute;
  top: 100px;
  left: 250px;
  color: rgb(221, 221, 240);
}

.v-app-bar >>> .v-toolbar__extension {
  width: 80%;
}

.v-list-item__title {
  padding-left: 20px;
}
</style>
