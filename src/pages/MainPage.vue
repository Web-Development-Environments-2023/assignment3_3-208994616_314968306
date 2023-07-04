<template>
  <div class="container">
      <h1 class="title">Lior & Saar Recipes</h1>
      <div class="row">
          <div class="col">
              <RecipePreviewList title="Explore these recipes"
                                  class="RandomRecipes center"
                                  :getRecipes="getRandomRecipes" 
                                  :getWatched="getWatchedRecipes"
                                  :getFavorites="getFavoriteRecipes"
                                  :created=false
                                  >
                  <b-button class="refresh-button">More Recipes</b-button>
              </RecipePreviewList>
          </div>
          <div class="col">
              <RecipePreviewList v-if="$root.store.username"
                                 title="Last Viewed Recipes"
                                 class="RandomRecipes center"
                                 :getRecipes="getLastWatchedRecipes"
                                 :getWatched="getWatchedRecipes"
                                 :getFavorites="getFavoriteRecipes"
                                 :created=false
                                 >
              </RecipePreviewList>
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
            const response = await this.axios.get(this.$root.store.server_domain + "/recipes/random");
            return response.data;
          },
          getLastWatchedRecipes: async function () {
            const response = await this.axios.get(this.$root.store.server_domain + "/users/threeLastWatchedRecipes");
            return response.data;
          },
          getWatchedRecipes: async function () {
            const response = await this.axios.get(this.$root.store.server_domain + "/users/watchedRecipeIds");
            return response.data;
          },
          getFavoriteRecipes: async function () {
            const response = await this.axios.get(this.$root.store.server_domain + "/users/getFavoriteIds");
            return response.data;
          }
      }
  };
  
</script>

<style lang="scss" scoped>

.refresh-button {
  font-size: 3vw;
  background-color: rgb(0, 191, 255);
  color: black;
  display: flex;
  justify-content: center;
}
.container h1 {
  font-size: 5vw;
  margin-bottom: 1.5vw;
  font-weight: bold;
  margin-top: 1.5vw;
  text-align: center;
  color: goldenrod;
}

.RandomRecipes {
  margin: 3vw 8vw 2vw;
}

.row {
  display: flex;
  justify-content: center;
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