<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Home</router-link>
      <span class="link-space"></span>
      <router-link :to="{ name: 'about' }">About Us</router-link>
      <span class="link-space"></span>
      <router-link :to="{ name: 'search' }">Search</router-link>
      <span class="link-space2"></span>
      <span v-if="!$root.store.username" class="guest-text">
        Hello Guest!
        <span class="link-space2"></span>
        <router-link :to="{ name: 'register' }">Register</router-link>
        <span class="link-space"></span>
        <router-link :to="{ name: 'login' }">Login</router-link>
      </span>
      <span v-else class="username-text">
        {{ "Welcome " + $root.store.username + "!"}}

        <span class="link-space"></span>

        <span class="dropdown">
          <select @change="handleDropdownChange">Personal
            <option value="" disabled selected>Personal</option>
            <option value="favorites">
              <router-link :to="{ name: 'favorites' }">Favorites</router-link>
            </option>
            <option value="myRecipes">
              <router-link :to="{ name: 'myRecipes' }">My Recipes</router-link>
            </option>
            <option value="family">
              <router-link :to="{ name: 'family' }">Family Area</router-link>
            </option>
          </select>
        </span>

        <span class="link-space"></span>

        <button @click="openNewRecipeModal">New Recipe</button>

        <span class="link-space2"></span>

        <button class="logout-button" @click="Logout">Logout</button>
      </span>
    </div>
    <router-view />
    <b-container class="container">
      <b-modal id="new-recipe-modal" title="New Recipe" @hidden="openNewRecipeModal">
        <NewRecipeModal />
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import NewRecipeModal from "@/components/AddNewRecipeModal.vue";
export default {
  name: "App",
  components: {
    NewRecipeModal
  },
  methods: {
    handleDropdownChange(event) {
      const selectedOption = event.target.value;
      if (selectedOption === "favorites") {
        this.$router.push({ name: "favorites" });
      } else if (selectedOption === "myRecipes") {
        this.$router.push({ name: "myRecipes" });
      } else if (selectedOption === "family") {
        this.$router.push({ name: "family" });
      }
    },
    async Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      const response = await this.axios.post(
          this.$root.store.server_domain +"/Logout"
        );
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    async openNewRecipeModal() {
      this.$bvModal.show('new-recipe-modal');
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  min-height: 30vh;
  background-image: url("https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"); 
  background-size: cover;
  background-repeat: no-repeat;
}


#nav {
  background-color: #CD853F;
  padding: 0.1vw;
  color: black;
  letter-spacing: 0.05vw;
}

#nav a {
  font-weight: bold;
  font-size: 2vw;
  color: black;
}

#nav a.router-link-exact-active {
  color: black;
}

.guest-text,
.username-text {
  font-weight: bold;
  font-size: 2.5vw;
  font-family: inherit;
  color: white;
}

.link-space {
  margin-right: 1.5vw; /* Adjust the spacing as needed */
}

.link-space2 {
  margin-right: 3vw; /* Adjust the spacing as needed */
}

.logout-button {
  /* Add your desired styles for the Logout button here */
  background-color: white;
  font-weight: bold;
  color: black;
  padding: 0.02vw 0.3vw;
  border: none;
  border-radius: 0.2vw;
  font-size: 2vw;
  cursor: pointer;
}

/* Customize the dropdown style */
.dropdown {
  /* Add your desired styles for the dropdown here */
  color: #42b983; /* Red text color */
  background-color: black; /* Light gray background color */
  padding: 0.1vw 0.1vw;
  font-size: 2vw;
  cursor: pointer;
}

.dropdown select {
  /* Add your desired styles for the select element here */
  color: #CD853F; /* Blue text color */
  background-color: black; /* White background color */
  font-weight: bold;
  font-size: 1.2vw;
  border: none;
  outline: none;
  font-size: 2vw;
}

.dropdown select option {
  /* Add your desired styles for the options here */
  color: #2c3e50; /* Green text color */
  font-weight: bold;
  font-size: 1.2vw;
  background-color: #f0f0f0; /* Light gray background color */
}


</style>
