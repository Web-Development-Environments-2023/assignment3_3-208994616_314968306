<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          
          <b-nav-item>
            <router-link :to="{ name: 'main' }">Home</router-link>
          </b-nav-item>

          <b-nav-item>
            <router-link :to="{ name: 'search' }">Search</router-link>
          </b-nav-item>

          <b-nav-item>
            <router-link :to="{ name: 'about' }">About Us</router-link>
          </b-nav-item>
          
          <b-nav-item-dropdown text="User Pages" right v-if="$root.store.username">
            <b-dropdown-group>
              <b-dropdown-item>
                <router-link :to="{ name: 'favorites' }">Favorites</router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <router-link :to="{ name: 'myRecipes' }">My Recipes</router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <router-link :to="{ name: 'family' }">Family Recipes</router-link>
              </b-dropdown-item>
            </b-dropdown-group>
          </b-nav-item-dropdown>

          <b-nav-item v-if="$root.store.username">
              <button @click="openNewRecipeModal">New Recipe</button>
          </b-nav-item>
          
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-item>
            Hello guest:
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{ name: 'register' }">Register</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{ name: 'login' }">Login</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em>{{ $root.store.username }}</em>
            </template>
            <b-dropdown-item @click="Logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view />
      <b-modal id="new-recipe-modal" ref="newRecipeModal" title="Add New Personal Recipe" size="xl" ok-only hide-footer>
        <NewRecipeModal />
      </b-modal>
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
    async Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      const response = await this.axios.post(
        this.$root.store.server_domain + "/Logout"
      );
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    async openNewRecipeModal() {
      this.$refs.newRecipeModal.show();
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
  color: #0b0b0b;
  min-height: 100vh;
}

/* Styles for the navigation bar */
#app .navbar-nav a.nav-link {
  //color: #333;
  font-size: 25px;
}

#app .navbar-nav .dropdown-menu {
  margin-top: 0;
}

.dropdown-menu .dropdown-item {
  white-space: normal;
  display: block;
}

</style>