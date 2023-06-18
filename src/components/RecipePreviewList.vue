<template>
  <b-container>
      <h3>
          {{ title }}:
      </h3>
      <b-row v-if="recipes.length">
          <b-col  v-for="r in recipes" :key="r.id">
              <RecipePreview class="recipePreview" 
                            :recipe="r" 
                            :watched="watched.includes(r.id)" 
                            :favorite="favorites.includes(r.id)"
                            :addFavorite="addFavorite" />
          </b-col>
      </b-row>
      <div @click="setRecipes" class="slot-container">
          <slot></slot>
      </div>

  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
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
  }
},
data() {
  return {
    recipes: [],
    watched: [],
    favorites: []
  };
},
mounted() {
  this.setWatchedRecipes();
  this.setFavoriteRecipes();
  this.setRecipes();
  this.setPersonalRecipes();
  this.setfamilyRecipes();
},
methods: {
  
  async setRecipes() {
    try {
      this.recipes = await this.getRecipes();
      console.log(this.recipes);
    } catch (error) {
      console.log(error);
    }
  },
  async setWatchedRecipes() {
    try {
      if (this.$root.store.username) {
        this.watched = await this.getWatched();
      }
    } catch (error) {
      console.log(error);
    }
  },
  async setFavoriteRecipes() {
    try {
      const response = await this.axios.get(
      this.$root.store.server_domain + "/users/favorites",);
      const recipes = response.data;
      this.recipes = [];
      this.recipes.push(...recipes);
      }
    catch (error) {
      console.log(error);
    }
  },
  async setPersonalRecipes() {
    try {
      const response = await this.axios.get(
      this.$root.store.server_domain + "/users/personal",);
      const recipes = response.data;
      this.recipes = [];
      this.recipes.push(...recipes);
      }
    catch (error) {
      console.log(error);
    }
  },
  async setfamilyRecipes() {
   try {
      const response = await this.axios.get(
      this.$root.store.server_domain + "/users/family",);
      const recipes = response.data;
      this.recipes = [];
      this.recipes.push(...recipes);
      }
    catch (error) {
      console.log(error);
    }
  },
  async addFavorite(recipeId) {
    const response = await this.axios.post(
        this.$root.store.server_domain + "/users/favorites",
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


<!-- <template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random",
        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(recipes[0])
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style> -->
