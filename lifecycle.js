const app = new Vue({
  el: '#app',
  data() {
    return {
      users: [],
      editUser: null
    };
  },
  methods: {
    deleteUser(id, index) {
      // Second argument in a fetch api call is config settings.
      fetch('https://jsonplaceholder.typicode.com/users/' + id, {
        method: 'DELETE'
      }).then(() => {
        this.users.splice(index, 1);
      });
    },
    updateUser(user) {
      fetch('https://jsonplaceholder.typicode.com/users/' + user.id, {
        body: JSON.stringify(user),
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(() => {
        this.editUser = null;
      });
    }
  },
  mounted() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        this.users = data;
      });
  },
  template: `
    <div>
      <li v-for="user, index in users">
        <div v-if="editUser === user.id">
          <input @keyup.13="updateUser(user)" v-model="user.name" />
          <button @click="updateUser(user)">Save</button>
        </div>
        <div v-else>
          <button @click="editUser = user.id">Edit</button>
          <button @click="deleteUser(user.id, index)">X</button>
          {{user.name}}
        </div>
      </li>
    </div>
  `
});
