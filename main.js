Vue.component('avenger-component', {
  props:['avenger'],
  filters: {
    ageInOneYear(age) {
      return age + 1;
    },
    avengerFullName(value) {
      return `${value.last}, ${value.first}`;
    }
  },
  methods: {
    incrementAge(avenger) {
      return avenger.age++;
    },
    decrementAge(avenger) {
      return avenger.age--;
    }
  },
  template: `
    <div>
      <h5>age: {{ avenger.age }}</h5>
      <button @click="{{incrementAge(avenger)}}">+</button>
      <button @click="{{decrementAge(avenger)}}">-</button>
      <h4>{{ avenger | avengerFullName }}</h4>
      <input v-model="avenger.first"/>
    </div>  
  `
});

const app = new Vue({
  // Need to tell view where to mount its instance
  el: '#app',
  data() {
    return {
      friends: ['Steve', 'Tony'],
      avengers: [
        {
          first: 'Steve',
          last: 'Rogers',
          age: 50
        },
        {
          first: 'Tony',
          last: 'Stark',
          age: 45
        },
        {
          first: 'Clint',
          last: 'Barton',
          age: 35
        }
      ],
      captain: {
        first: 'Steve',
        last: 'Rogers',
        age: 50
      },
      ironman: {
        first: 'Tony',
        last: 'Stark',
        age: 45
      }
    };
  },
  computed: {
    captainFullName() {
      return `${this.captain.first} ${this.captain.last}`;
    },
    ironmanFullName() {
      return `${this.ironman.first} ${this.ironman.last}`;
    },
    captainAgeInAYear() {
      return this.captain.age + 1;
    }
  },
  filters: {
    fullName(value) {
      return `${value.last}, ${value.first}`;
    }
  },
  methods: {},
  template: `
<div>
  <h1>Name: {{ ironmanFullName }}</h1>
  <h2>Age: {{ ironman.age }}</h2>
  <h1>Name: {{ captainFullName }}</h1>
  <h2>Age: {{ captain.age }}</h2>
  <h2>Age in a year: {{ captain.age | ageInOneYear }}</h2>
  <h2>Age in a year: {{ ironman.age | ageInOneYear }}</h2>
  <h2>Age in a year: {{ captainAgeInAYear }}</h2>
  <h1>Name: {{ captain | fullName }}</h1>
  <h1>Name: {{ ironman | fullName }}</h1>
  <h2 v-for="friend in friends">{{ friend }}</h2>
  <h2 v-for="avenger in avengers">{{ avenger.first }}</h2>
  <hr>
  <h3>Component is here!</h3>
  <avenger-component v-for="hero in avengers" :avenger="hero"/>
   
</div>  

  `
});
