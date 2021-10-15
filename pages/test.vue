<template>
  <v-app>
    <div class="mx-auto">
      <button @click="add">追加</button>

      <ul>
        <transition-group name="fade">
          <li
            style="cursor: pointer"
            v-for="(number, index) in numbers"
            :key="number"
            @click="remove(index)"
          >
            {{ number }}
          </li>
        </transition-group>
      </ul>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      numbers: [0, 1, 2],
      nextNumber: 3,
      show: true
    };
  },
  methods: {
    randomIndex() {
      return Math.floor(Math.random() * this.numbers.length);
    },
    add() {
      this.numbers.splice(this.randomIndex(), 0, this.nextNumber);
      this.nextNumber += 1;
    },
    remove(index) {
      this.numbers.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.fade-enter {
  opacity: 0;
  transform: translateX(-150px);
}
.fade-enter-active {
  transition: transform 3s, opacity 3s;
}
.fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.fade-leave {
  opacity: 1;
  transform: translateX(0);
}
.fade-leave-active {
  transition: transform 3s, opacity 3s;
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(150px);
}
</style>
