<template> </template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      array1: [
        { username: "John", score: 36, active: true },
        { username: "Jake", score: 50, active: true },
        { username: "Bill", score: 20, active: false }
      ],
      array2: [
        { username: "John", score: 36, active: true },
        { username: "Jake", score: 50, active: true },
        { username: "tom", score: 40, active: false },
        { username: "Bill", score: 20, active: false }
      ]
    };
  },
  mounted() {
    let fruits = [
      { num: 1, name: "apple", id: "one" },
      { num: 2, name: "banana", id: "two" },
      { num: 3, name: "orange", id: "three" }
    ];

    let targets = [
      { num: 5, name: "lemon", id: "two" },
      { num: 6, name: "berry", id: "three" },
      { num: 4, name: "pain", id: "one" }
    ];

    // console.log(target.filter(x => target.find(t => t.id).includes(x.id)));

    // const a = _.filter(fruits, fruit => {
    //   return _.find(targets, function(target) {
    //     return target.id === fruit.id;
    //   });
    // });

    const b = [];
    for (let i = 0; i < fruits.length; i++) {
      let a = _.find(targets, function(target) {
        return target.id === fruits[i].id;
      });
      b.push(a)
    }
    console.log(b)

    // console.log(
    //   fruits.filter(x => !target.map(t => t.fruits_id).includes(x.id))
    // );
    // console.log(fruits);
    // console.log(target);

    // console.log(
    //   this.array2.filter(x =>
    //     this.array1.map(t => t.username).includes(x.username)
    //   )
    // );
    // console.log(
    //   this.array1.filter(x =>
    //     this.array2.map(t => t.username).includes(x.username)
    //   )
    // );

    // const array3 = [];

    // for (let i = 0; i < this.array2.length; i++) {
    //   // console.log(this.array1)
    //   const that = this.array1
    //   let c = _.find(this.array2, function(item) {
    //     if((item.username === that[i].username)){
    //       console.log('true')
    //     }else{
    //       console.log('false')
    //     }
    //     // return item.username === that[i].username;
    //   });
    //   // console.log(c)
    //   // array3.push(c)
    // }
    // console.log(array3)

    // let array = [
    //   { username: "John", score: 36, active: true },
    //   { username: "Jake", score: 50, active: true },
    //   { username: "Bill", score: 20, active: false }
    // ];

    // let b = _.find(array, function(item) {
    //   return item.score > 20;
    // });
    // // {"username":"John","score":36,"active":true}
    // console.log(b);

    // _.find(array, ["active", true]);
    // // {"username":"John","score":36,"active":true}
  }
};
</script>
