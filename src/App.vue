<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Home</router-link>
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
        {{ "Hello " + $root.store.username + "!"}}
        <span class="link-space2"></span>
        <button @click="Logout">Logout</button>
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    async Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      const response = await this.axios.post(
          this.$root.store.server_domain +"/Logout"
        );
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
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
  color: #2c3e50;
  min-height: 50vh;
}

#nav {
  background-color: black;
  padding: 2vw;
  color: white;
  letter-spacing: 0.5vw;
}

#nav a {
  font-weight: bold;
  font-size: 2vw;
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.guest-text,
.username-text {
  font-size: 2vw;
  font-family: inherit;
}

.link-space {
  margin-right: 2vw; /* Adjust the spacing as needed */
}

.link-space2 {
  margin-right: 16vw; /* Adjust the spacing as needed */
}

</style>
