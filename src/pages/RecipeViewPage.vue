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
              <div>Ready in {{ recipe.CookingTime }} minutes</div>
              <div>Likes: {{ recipe.Likes }}</div>
              <div>servings: {{ recipe.servings }}</div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.ingredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            <div class="mb-3">
              <div>Gluten Free: {{ recipe.GlutenFree ? 'Yes' : 'No' }}</div>
              <div>Vegan: {{ recipe.isVegan ? 'Yes' : 'No' }}</div>
              <div>Vegetarian: {{ recipe.isVegetarian ? 'Yes' : 'No' }}</div>
            </div>
            Instructions:
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
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
  async created() {
    try {
      let response;
      try {
        response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/showFullRecipe/" + this.$route.params.recipeId
        );
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      let {
        id,
        title,
        image,
        CookingTime,
        Likes,
        GlutenFree,
        isVegan,
        isVegetarian,
        ingredients,
        instructions,
        servings
    } = response.data;
      let _instructions = instructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);
      let _recipe = {
        instructions,
        _instructions,
        ingredients,
        Likes,
        CookingTime,
        image,
        GlutenFree,
        isVegan,
        isVegetarian,
        servings,
        title
      };

      this.recipe = _recipe;
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
/* .recipe-header{

} */
</style>
