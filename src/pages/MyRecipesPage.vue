<template>
  <div class="container" id="myRecipesPage">
    <h1 class="title">My Recipes</h1>
    <div class="row">
      <div class="col">
        <RecipePreviewList
          class="RandomRecipes center" 
          :getRecipes="getCreatedRecipes" 
          :getWatched="emptyRecipes"
          :getFavorites="emptyRecipes"
          :created=true
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
    getCreatedRecipes: async function () {
      const response = await this.axios.get(this.$root.store.server_domain + "/users/getCreatedRecipes");
      return response.data;
    },
    emptyRecipes: async function () {
      return [];
    },
  }
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
  