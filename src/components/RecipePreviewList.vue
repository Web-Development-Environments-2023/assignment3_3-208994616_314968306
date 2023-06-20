<template>
  <b-container>
      <h3>
          {{ title }}:
      </h3>
      <b-row v-if="recipes.length">
          <b-col v-for="recipe in recipes" :key="recipe.id">
              <RecipePreview class="recipePreview" 
                            :recipe="recipe" 
                            :watched="watched.includes(recipe.id)" 
                            :favorite="favorites.includes(recipe.id)"
                            :addFavorite="addFavorite"
                            :created="created" />
          </b-col>
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
  title: {
      type: String,
      required: true
  },
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
      this.recipes = await this.getRecipes();
    } catch (error) {
      console.log(error.response);
    }
  },
  async setWatchedRecipes() {
    try {
      if (this.$root.store.username) {
        this.watched = await this.getWatched();
      }
    } catch (error) {
      console.log(error.response);
    }
  },
  async setFavoriteRecipes() {
    try {
      if (this.$root.store.username) {
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
  }

}
};
</script>

<style lang="scss" scoped>
.col {
  padding-left: 5px;
  padding-right: 5px;
}

.slot-container {
  margin-top: 10px;
  text-align: center;
}
</style>