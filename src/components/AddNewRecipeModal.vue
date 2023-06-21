<template>
  <b-container class="container">
      <div>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group id="input-group-title" label="Title:" label-for="input-1">
                <b-form-input id="input-1" v-model="form.title" placeholder="Enter title" required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-image" label="Image:" label-for="input-2"
                description="insert image link from the internet.">
                <b-form-input id="input-2" v-model="form.image" placeholder="Insert image link" required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-prep-time" label="Preparation Time (Minutes):" label-for="input-5">
                <b-form-input id="input-5" v-model="form.time" type="number"
                    placeholder="Enter preparation time" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-servings" label="Number of Servings:" label-for="input-6">
                <b-form-input id="input-6" v-model="form.servings" type="number" placeholder="Enter servings"
                    required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-ingredients" label="Ingredients:" label-for="input-7">
                <b-form-input id="input-7" v-model="form.ingredients" placeholder="Enter Ingredients" required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-instructions" label="Instructions:" label-for="input-8">
                <b-form-input id="input-8" v-model="form.instructions" placeholder="Enter Instructions"
                    required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" class="justify-content-center">
                <b-form-checkbox v-model="form.vegetarian" value="true">vegetarian</b-form-checkbox>
                <b-form-checkbox v-model="form.vegan" value="true">vegan</b-form-checkbox>
                <b-form-checkbox v-model="form.glutenFree" value="true">gluten free</b-form-checkbox>
            </b-form-group>

            <div class="row justify-content-center">
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </div>
        </b-form>
      </div>
    </b-container>
</template>

<script>
import { required, alpha, integer, url } from "vuelidate/lib/validators";

export default {
  name: "NewRecipeModal",
  components: {

  },
  data() {
      return {
          showModal: true,
          form: {
              title: "",
              image: "",
              time: null,
              servings: null,
              ingredients: "",
              instructions: "",
              vegetarian: false,
              vegan: false,
              glutenFree: false,
          },
      };
  },
  validations: {
    form: {
      recipeName: {
        required,
        alpha,
      },
      recipeImg: {
        url,
        required,
      },
      cookingTime: {
        integer,
        required,
      },
      servings: {
        integer,
        required,
      },
      ingredients: {
        required,
      },
      instructions: {
        required,
      },

    },
  },
  methods: {
      onSubmit(event) {
          event.preventDefault()
          this.AddRecipe();
      },
      async AddRecipe() {
          try {
              const response = await this.axios.post(
                  this.$root.store.server_domain + `/users/addNewRecipe`,
                  {
                      RecipeName: this.form.title,
                      CookingTime: this.form.time,
                      RecipeImg: this.form.image,
                      isVegan: this.form.vegan,
                      isVegetarian: this.form.vegetarian,
                      GlutenFree: this.form.glutenFree,
                      ingredients: this.form.ingredients,
                      instructions: this.form.instructions,
                      servings: this.form.servings
                  }
              );
              this.$root.toast("Add New Recipe", "Recipe was added successfully", "success");
              this.onReset();
          } catch (error) {
              console.log(error);
          }
      },

      onReset(event) {
          // event.preventDefault()
          // Reset our form values
          this.form.title = '',
              this.form.image = '',
              this.form.time = null,
              this.form.servings = null,
              this.form.ingredients = '',
              this.form.instructions = '',
              this.form.vegetarian = false,
              this.form.vegan = false,
              this.form.glutenFree = false,
              // Trick to reset/clear native browser form validation state
              this.show = false
          this.$nextTick(() => {
              this.show = true
          })
      },
  },
};
</script>

<style scoped>
.btn {
  margin: 0 10px;
}
.card {
  width: 15vmax;
}
</style>