<template>
  <b-container>
      <b-row v-if="recipes.length">
          <b-row v-for="recipe in recipes" :key="recipe.id">
              <RecipePreview class="recipePreview" 
                            :recipe="recipe" 
                            :watched="watched.includes(recipe.id)" 
                            :favorite="favorites.includes(recipe.id)"
                            :addFavorite="addFavorite"
                            :addToWatched="addToWatched"
                            :created="created" />
          </b-row>
      </b-row>
      <div @click="setRecipes" class="slot-container">
          <slot></slot>
      </div>

  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue"
export default {
name: "RecipePreviewList",
components: {
  RecipePreview
},
props: {
  getRecipes: {
      type: Function,
      required: true
  },
  getWatched: {
      type: Function,
      required: true
  },
  getFavorites: {
      type: Function,
      required: true
  },
  getCreatedRecipes: {
    type: Function,
    required: false
  },
  created: {
      type: Boolean,
      required: true
  },
},
data() {
  return {
    recipes: [],
    watched: [],
    favorites: [],
  };
},
mounted() {
  this.setRecipes();
  if (this.getWatched !== undefined) 
    this.setWatchedRecipes();
  if (this.getFavorites !== undefined) 
    this.setFavoriteRecipes();
},
methods: {
  async setRecipes() {
    try {
      this.recipes = []
      this.recipes = await this.getRecipes();
    } catch (error) {
      console.log(error.response);
    }
  },
  async setWatchedRecipes() {
    try {
      if (this.$root.store.username) {
        this.watched = []
        this.watched = await this.getWatched();
      }
    } catch (error) {
      console.log(error.response);
    }
  },
  async setFavoriteRecipes() {
    try {
      if (this.$root.store.username) {
        this.favorites = []
        this.favorites = await this.getFavorites();
      }
    } catch (error) {
      console.log(error.response);
    }
  },
  async addFavorite(recipeId) {
    const response = await this.axios.post(
        this.$root.store.server_domain + "/users/addToFavorites",
        {
          recipeId: recipeId
        }
    ).then(() => this.favorites.push(recipeId));
  },
  async addToWatched(recipeId) {
    const response = await this.axios.post(
        this.$root.store.server_domain + "/users/addToWatched",
        {
          recipeId: recipeId
        }
    ).then(() => this.watched.push(recipeId));
  }
}
};
</script>

<style lang="scss" scoped>
.row {
  justify-content: center;
  padding-left: 2vw;
  padding-right: 6vw;
}

.slot-container {
  margin-top: 2vw;
  text-align: center;
}

</style>