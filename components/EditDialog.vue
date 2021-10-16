<template>
  <v-app>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500" persistent no-click-animation>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on">
            mdi-pencil
          </v-icon>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Privacy Policy
          </v-card-title>

          <v-card-actions class="d-flex justify-center">
            <div id="todo-box" class="d-flex flex-column ">
              <div>
                <v-text-field
                  label="Todo-Item"
                  counter
                  maxlength="10"
                  :value="[changedText ? editTodoItem : selectedTodoText]"
                  @input="editTodoItemAction($event)"
                ></v-text-field>
              </div>
              <div>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="[changedDate ? date : selectedTodoDate]"
                      label="Dedline"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @input="changeDateAction"
                  ></v-date-picker>
                </v-menu>
              </div>
              <div class="d-flex justify-center">
                <v-btn color="error" text @click="cancel">
                  Cancel
                </v-btn>

                <v-btn color="primary" text @click="changeTodo">
                  Change
                </v-btn>
              </div>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import moment from "moment";
export default {
  props: {
    koreageru: {
      type: Number
    }
  },
  data() {
    return {
      dialog: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      changedDate: false,
      changedText: false,
      editTodoItem: ""
    };
  },
  
  computed: {
    selectedTodoDate() {
      return this.$store.getters["db/todos"][this.koreageru].date;
    },
    selectedTodoText() {
      return this.$store.getters["db/todos"][this.koreageru].todo;
    }
  },
  methods: {
    changeDateAction() {
      this.changedDate = true;
      this.menu2 = false;
    },
    changeTodo() {
      // console.log(this.date);
      // console.log(this.editTodoItem);
      // console.log(this.changedText);
      this.$store.dispatch("db/edit", {
        id: this.$store.getters["db/todos"][this.koreageru].id,
        todoText: this.changedText ? this.editTodoItem : this.selectedTodoText,
        dedline: this.date,
        uid: this.$store.state.uid
      });
      this.editTodoItem = "";
      this.changedDate = false;
      this.changedText = false;
      this.dialog = false;
    },
    cancel() {
      this.dialog = false;
      this.changedDate = false;
      this.changedText = false;
    },
    editTodoItemAction(event) {
      this.editTodoItem = event;
      this.changedText = true;
    }
  }
};
</script>

<style scoped>
#todo-box {
  width: 70%;
}
</style>
