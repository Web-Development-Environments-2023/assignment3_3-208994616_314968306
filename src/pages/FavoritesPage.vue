<template>
  <div class="container" id="favoritePage">
    <h1 class="title">My Favorite Recipes</h1>
    <div class="row">
      <RecipePreviewList
                                    class="RandomRecipes center" 
                                    :getRecipes="getFavoriteRecipes" 
                                    :getWatched="getLastWatchedRecipes"
                                    :getFavorites="getFavoriteRecipes"
                                    :created=false
                                    >
      </RecipePreviewList>
    </div>
    <router-link to="/" exact>Go Home</router-link>

  </div>

</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  methods:
  {
    getFavoriteRecipes: async function () {
      const response = await this.axios.get(this.$root.store.server_domain + "/users/getFavorites");
      return response.data;
    },
    getLastWatchedRecipes: async function () {
      const response = await this.axios.get(this.$root.store.server_domain + "/users/threeLastWatchedRecipes");
      return response.data;
    },
  },
};
</script>

<style>
.container h1 {
  font-size: 5vw;
  margin-bottom: 1.5vw;
  margin-top: 1.5vw;
  text-align: center;
}
</style>
  