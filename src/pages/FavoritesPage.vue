<template>
  <div class="container" id="favoritePage">
    <h1 class="title">My Favorite Recipes</h1>
    <div class="row">
      <div class="col">
        <RecipePreviewList
                  class="RandomRecipes center" 
                  :getRecipes="getFavoriteRecipes" 
                  :getWatched="getLastWatchedRecipes"
                  :getFavorites="getFavoriteRecipes"
                  :created=false
                  >
        </RecipePreviewList>
      </div>
    </div>
    
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
  margin-bottom: 1vw;
  font-weight: bold;
  margin-top: 1.5vw;
  text-align: center;
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
  