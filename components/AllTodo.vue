<template>
  <v-app>
    <v-card width="100%" id="todo-container" elevation="20" class="pb-10 ">
      <div id="todo-box" class="d-flex flex-row ml-10">
        <div>
          <v-text-field
            label="Todo-Item"
            v-model="todoItem"
            counter
            maxlength="10"
          ></v-text-field>
        </div>
        <div class="ml-10">
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
                v-model="date"
                label="Dedline"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </div>
        <div class="ml-10">
          <v-btn color="#7986" id="addBtn" @click="addTodo">Add</v-btn>
        </div>
      </div>
      <div id="todo-cards" class="mt-5 d-flex flex-wrap">
        <v-card
          v-for="(todo, index) in todos"
          :key="todo.todo"
          class="mb-5 d-flex ml-10"
          width="40%"
          max-width="380px"
          min-width="300px"
          height="50px"
          :class="{ done: todos[index].done === true }"
          id="todoItem"
        >
          <v-checkbox
            class="check mr-5 ml-2"
            @click="update(index)"
            v-model="checked[index]"
          ></v-checkbox>
          <p id="todo-card-text">
            [{{ todo.todo }}]<span class="ml-5">{{ todo.date }}</span>
          </p>
          <edit-dialog id="editDialog" :koreageru="index" />
          <v-icon id="closeIcon" @click="deleteItem(index)">mdi-close</v-icon>
        </v-card>
      </div>
    </v-card>
  </v-app>
</template>

<script>
import moment from "moment";
import EditDialog from "./EditDialog.vue";
export default {
  components: { EditDialog },
  data() {
    return {
      todoItem: "",
      done: false,
      dialog: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      checked: []
    };
  },

  computed: {
    todos() {
      return this.$store.getters["db/todos"];
    },
    ids() {
      return this.$store.getters["db/ids"];
    }
  },

  created() {
    this.$store.dispatch("db/snapshot");
    const checked = [];
    this.todos.forEach(todo => {
      // console.log(todo.done);
      checked.push(todo.done);
    });
    // console.log(checked);
    this.checked = checked;
    console.log(this.checked);
  },

  methods: {
    addTodo() {
      // console.log(this.todoItem);
      // console.log(this.date);
      // console.log(moment(this.date).format("YYYY-MM-DD"));
      // console.log(moment(Date.now()).format("YYYY-MM-DD"));
      if (this.todoItem === "") {
        return;
      } else {
        this.$store.dispatch("db/addTodo", {
          todoItem: this.todoItem,
          date: this.date,
          done: this.done
        });
      }
      this.todoItem = "";
      this.date = moment(Date.now()).format("YYYY-MM-DD");
    },
    update(index) {
      console.log(this.checked);
      // console.log(this.todos[index].done);
      this.$store.dispatch("db/update", {
        id: this.ids[index],
        done: this.todos[index].done
      });
    },
    deleteItem(index) {
      this.$store.dispatch("db/deleteItem", this.ids[index]);
    }
  }
};
</script>

<style scoped>
#todo-container {
  /* background-color: pink; */
  padding-top: 250px;
}

/* #todo-box {
  display: flex;
  margin-left: 40px;
  margin-top: 30px;
} */

.v-input {
  width: 300px;
}

#addBtn {
  margin-top: 10px;
  margin-left: 20px;
}

#todo-cards {
  widows: 80%;
}

#todo-card-text {
  height: 100%;
  text-align: center;
  line-height: 50px;
}

.check {
  width: 30px;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  padding-top: 13px;
}

.done {
  opacity: 0.3;
}

#todoItem {
  position: relative;
}
#closeIcon {
  position: absolute;
  right: 10px;
  top: 10px;
}
#editDialog {
  height: 24px;
  width: 24px;
  position: absolute;
  right: 50px;
  top: 10px;
}
</style>
