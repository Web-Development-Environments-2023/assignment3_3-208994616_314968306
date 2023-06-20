<template>
  <div class="container" id="mainPage">
    <div class="column" id="left">
      <RecipePreviewList title="My Favorite Recipes" 
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
  