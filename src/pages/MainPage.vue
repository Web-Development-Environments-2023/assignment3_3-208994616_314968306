<template>
  <div class="container">
      <h1 class="title">Lior & Saar Recipes</h1>
      <div class="row">
          <div class="col">
              <RecipePreviewList title="Explore these recipes" 
                                  class="RandomRecipes center" 
                                  :getRecipes="getRandomRecipes" 
                                  :getWatched="getLastWatchedRecipes"
                                  >
                  <b-button>Refresh Recipes</b-button>
              </RecipePreviewList>
          </div>
          <div class="col">
              <RecipePreviewList v-if="$root.store.username"
                                 title="Last Viewed Recipes"
                                 class="RandomRecipes center" 
                                 :getRecipes="getLastWatchedRecipes"
                                 :getWatched="getLastWatchedRecipes"
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
            const response = await this.axios.get(this.$root.store.server_domain + "/recipes/random"
            );
      
            return response.data;
          },
          getLastWatchedRecipes: async function () {
            const response = await this.axios.get(this.$root.store.server_domain + "/users/threeLastWatchedRecipes");
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