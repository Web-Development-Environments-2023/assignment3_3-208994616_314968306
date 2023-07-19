<template>
    <div class="container">
      <div v-if="recipe">
        <div class="recipe-header mt-3 mb-4">
          <h1>{{ recipe.title }}</h1>
          <img :src="recipe.image" class="center" />
        </div>
        <div class="recipe-body">
          <div class="wrapper">
            <div class="wrapped">
              <div class="mb-3">
                <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
                <div>servings: {{ recipe.servings }}</div>
              </div>
              Ingredients:
              <ul>
                {{recipe.ingredients}}
              </ul>
            </div>
            <div class="wrapped">
              <div class="mb-3">
                <div>Gluten Free: {{ recipe.glutenFree ? 'Yes' : 'No' }}</div>
                <div>Vegan: {{ recipe.vegan ? 'Yes' : 'No' }}</div>
                <div>Vegetarian: {{ recipe.vegetarian ? 'Yes' : 'No' }}</div>
              </div>
              Instructions:
              <ol>
                {{ recipe.instructions }}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        recipe: null
      };
    },
    mounted() {
      try {
        this.recipe = JSON.parse(this.$route.params.recipe)
        console.log(this.recipe)
      } catch (error) {
        console.log(error);
      }
    }
  };
  </script>
  
  <style scoped>
  .wrapper {
    display: flex;
  }
  .wrapped {
    width: 50%;
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
  </style>
  