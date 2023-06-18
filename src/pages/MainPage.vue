<template>
  <div class="container">
      <h1 class="title">Saar & Lior Recipes</h1>
      <div class="row">
          <div class="col">
              <RecipePreviewList title="Explore these recipes" 
                                  class="Recipes center" 
                                  :getRandomRecipes="getRandomRecipes" 
                                  >
                  <b-button>Refresh Recipes</b-button>
              </RecipePreviewList>
          </div>
          <div class="col">
              <RecipePreviewList v-if="$root.store.username"
                                 title="Last Watched Recipes"
                                 :getLastWatchedRecipes="getLastWatchedRecipes"
                                 class="Recipes center" 
                                 ></RecipePreviewList>
              <Login v-else></Login>            
          </div>        
      </div>
  </div>
</template>

<script>
  import RecipePreviewList from "../components/RecipePreviewList";
  import Login from "./LoginPage.vue";
  
  export default {
      components: {
          RecipePreviewList,
          Login
      },
      methods: {
          getRandomRecipes: async function() {
              let response = JSON.parse(localStorage.getItem("getRandomRecipes"));
              if (!response || !this.$root.store.bypass_external_requests) {
                  console.log("before random recipes");
                  response = await this.axios.get(
                  
                      this.$root.store.server_domain + "/recipes/random"
                  );
                  localStorage.setItem("getRandomRecipes", JSON.stringify(response));
              }

              return response.data;
          },
          getLastWatchedRecipes: async function () {
              let response = JSON.parse(localStorage.getItem("getLastWatchedRecipes"));
              if (!response || !this.$root.store.bypass_external_requests) {
                  console.log("before last view");

                  response = await this.axios.get(
                      this.$root.store.server_domain + "/users/threeLastWatchedRecipes"
                  );
                  localStorage.setItem("getLastViewedRecipes", JSON.stringify(response));
              }

              return response.data;
          },
          getWatchedRecipes: async function () {
              const response = await this.axios.get(
                  this.$root.store.server_domain + "/users/threeLastWatchedRecipes"
              );
              return response.data;
          },
          getFavoriteRecipes: async function () {
              let response = JSON.parse(localStorage.getItem("getFavoriteRecipes"));
              if (!response || !this.$root.store.bypass_external_requests) {
                  response = await this.axios.get(this.$root.store.server_domain + "/users/getFavorites");
                  localStorage.setItem("getFavoriteRecipes", JSON.stringify(response));
              }
              return response.data;
          }
      }
  };
  
</script>

<style lang="scss" scoped>
.RandomRecipes {
margin: 10px 0 10px;
}
.blur {
-webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
filter: blur(2px);
}
::v-deep .blur .recipe-preview {
pointer-events: none;
cursor: default;
}
</style>


<!-- <template>
  <div class="container">
    <h1 class="title">Lior & Saar Recipes</h1>
    <RecipePreviewList title="Random Recipes" class="RandomRecipes center" />
    <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
    {{ !$root.store.username }}
    <RecipePreviewList
      title="Last Viewed Recipes"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    ></RecipePreviewList>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 3vw 0 3vw;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}

.container {
  font-family: inherit;
  font-weight: bold;
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style> -->
