<template>
  <div class="container">
    <br />
    <h1 class="title text-center">Search Recipes</h1>
    <div>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-input v-model="form.query" placeholder="Recipe Name" required></b-form-input>
        <br/>
        <br/>
        <b-form-group label-cols-sm="3" label="Cuisine:" label-for="cuisine">
          <b-form-select id="cuisine" v-model="form.cuisine" :options="cuisines"></b-form-select>
        </b-form-group>
        <br/>
        <b-form-group label-cols-sm="3" label="Diet:" label-for="diet">
          <b-form-select id="diet" v-model="form.diet" :options="diets"></b-form-select>
        </b-form-group>
        <br/>
        <b-form-group label-cols-sm="3" label="Intolerance:" label-for="intolerance">
          <b-form-select id="intolerance" v-model="form.intolerance" :options="intolerances"></b-form-select>
        </b-form-group>
        <br/>
        <b-form-group label-cols-sm="3" id="input-group-3" label="Number of Results:" label-for="input-3">
          <b-form-select id="input-3" v-model="form.numResults" :options="foods"></b-form-select>
        </b-form-group>
        <div class="row justify-content-center"  style="display:flex">
          <b-button class="btn btn-default" type="submit" variant="primary">Search</b-button>
          <b-button class="btn btn-default" type="reset" variant="danger">Reset</b-button>
        </div>
      </b-form>
    </div>

    <div v-if="recipes.length > 0">
      Order Results By:
      <select v-model="sortby">
        <option value="likes">Likes</option>
        <option value="CookingTime">Cooking Time</option>
      </select>
      <br />
      <h4> Number of results: {{ recipes.length }}</h4>

      <b-row>
        <b-row>
          <RecipePreviewList 
                                    class="RandomRecipes center" 
                                    :getRecipes="orderedRecipes" 
                                    :getWatched="getWatchedRecipes"
                                    :getFavorites="getFavoriteRecipes"
                                    :created=false
                                    >
          </RecipePreviewList>
        </b-row>
      </b-row>
    </div>

    <div v-else-if="searched">
      <h5>
        No Recipes Found.
      </h5>
    </div>

  </div>
</template>

<script>
import cuisines from "../assets/cuisines";
import intolerances from "../assets/intolerances";
import diet from "../assets/diet";
import _ from 'lodash';
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  name: "SearchPage",
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      form: {
        query: "",
        cuisine: "",
        diet: "",
        intolerance: "",
        numResults: 0,
      },

      text: "",
      cuisines: [{ value: null, text: "", disabled: true }],
      diets: [{ value: null, text: "", disabled: true }],
      intolerances: [{ value: null, text: "", disabled: true }],
      foods: [{ text: "", value: null }, "5", "10", "15"],

      recipes: [],
      sortby: 'likes',
      searched: false,
    };
  },

  mounted() {
    this.cuisines.push(...cuisines);
    this.diets.push(...diet);
    this.intolerances.push(...intolerances);
    this.getFavoriteRecipes();
    this.getWatchedRecipes();
    if (sessionStorage.lastSearch)
      this.recipes = JSON.parse(sessionStorage.lastSearch);
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.sendRequst();
      //this.orderedRecipes();
    },

    async sendRequst() {
      try {
        const response = await this.axios.get(
          `${this.$root.store.server_domain}/users/search`,
          {
            params: {
              query: this.form.query,
              quantity: this.form.numResults,
              cuisine: this.form.cuisine,
              diet: this.form.diet,
              intolerances: this.form.intolerance,
            },
          }
        );
        const recipes_response = response.data;
        this.recipes = [];
        this.recipes.push(...recipes_response);
        this.searched = true;
        sessionStorage.setItem("lastSearch", JSON.stringify(this.recipes));
      } catch (error) {
        console.log(error);
      }
    },
    getWatchedRecipes: async function () {
      const response = await this.axios.get(this.$root.store.server_domain + "/users/watchedRecipeIds");
      return response.data;
    },
    getFavoriteRecipes: async function () {
      const response = await this.axios.get(this.$root.store.server_domain + "/users/getFavoriteIds");
      return response.data;
    },
    orderedRecipes: async function () {
      if (this.sortby == 'timetomake')
        return _.orderBy(this.recipes, 'readyInMinutes');
      else
        return _.orderBy(this.recipes, 'aggregateLikes', 'desc');
    },
    onReset(event) {
      event.preventDefault();
      this.form.query = "";
      this.form.diet = "",
      this.form.cuisine = "",
      this.form.intolerance = "",
      this.form.numResults = null,
      this.searched = false;

      //Resetting validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },

  },
};
</script>

<style scoped>
.btn {
  margin: 0 10px;
}

.results {
  text-align: center;

  display: flex;
  align-items: center;
  padding-top: 10px;
}

.recipePreview {
  display: block;
  width: 15vmax;
}
.RandomRecipes {
  margin: 3vw 8vw 2vw;
}
</style>