<template>
  <div class="container" id="mainPage">
    <div class="column" id="left">
      <RecipePreviewList title="My Recipes" 
                                    class="RandomRecipes center" 
                                    :getRecipes="getCreatedRecipes" 
                                    :getCreated="getCreatedRecipes"
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
    getCreatedRecipes: async function () {
      const response = await this.axios.get(this.$root.store.server_domain + "/users/getCreatedRecipes");
      return response.data;
    }
  }
};
</script>
  