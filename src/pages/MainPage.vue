<template>
  <div class="container">
      <h1 class="title">Lior & Saar Recipes</h1>
      <div class="row">
          <div class="col">
              <h2>Explore these recipes:</h2>
              <RecipePreviewList
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
              <h2>Last Viewed Recipes:</h2>
              <RecipePreviewList v-if="$root.store.username"
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
  background-color: rgb(21, 95, 223);
  color: black;
  display: flex;
  justify-content: center;
  margin-left: 6vw;
}
.container h1 {
  font-size: 5vw;
  margin-bottom: 3vw;
  font-weight: bold;
  margin-top: 1.5vw;
  text-align: center;
  color: goldenrod;
}

.RandomRecipes {
  margin: 0.5vw 3vw 4vw;
}

.row {
  display: flex;
  justify-content: center;
}

.col h2 {
  font-size: 2vw;
  color: rgb(21, 95, 223);
  font-weight: bold;
  margin-left: 10vw;
}

.blur {
-webkit-filter: blur(5px);
filter: blur(2px);
}
::v-deep .blur .recipe-preview {
pointer-events: none;
cursor: default;
}

</style>