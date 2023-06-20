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

// import _ from 'lodash';
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















<!-- <template>
  <div id="wrapper">
    <div id="openModalDiv"></div>
    <h1></h1>
    <b-container class="container">
      <b-form @submit="onSave">
        <b-row>
          <b-col>
            <b-form-group id="input-group-name" label-cols-sm="3" label="Recipe Name:" label-for="RecipeName">
              <b-form-input id="RecipeName" v-model="form.RecipeName" type="text"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-row>
              <b-col>
                <b-form-group id="input-group-vegan" label-for="isVegan">
                  <input id="isVegan" v-model="form.isVegan" type="checkbox" />
                  <label for="isVegan" class="checkboxes">Vegan</label>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group id="input-group-vegetarian" label-for="isVegetarian">
                  <input id="isVegetarian" v-model="form.isVegetarian" type="checkbox" />
                  <label for="isVegetarian" class="checkboxes">Vegetarian</label>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group id="input-group-glutenFree" label-for="GlutenFree">
                  <input id="GlutenFree" v-model="form.GlutenFree" type="checkbox" />
                  <label for="GlutenFree" class="checkboxes">Gluten Free</label>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="4">
            <b-form-group id="input-group-CookingTime" label-cols-sm="5" label="Ready In Minutes:" label-for="CookingTime">
              <b-form-input id="CookingTime" v-model="form.CookingTime" type="number"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="input-group-RecipeImg" label-cols-sm="2" label="RecipeImg URL:" label-for="RecipeImg">
              <b-form-input id="RecipeImg" v-model="form.RecipeImg" type="text"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="4">
            <b-form-group id="input-group-servings" label-cols-sm="5" label="Servings amount:" label-for="servings">
              <b-form-input id="servings" v-model="form.servings" type="number"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2">
            <label>Ingredients:</label>
          </b-col>
          <b-col cols="8">
            <b-button variant="outline-primary" @click="onAddIngredient">Add Ingredient</b-button>
          </b-col>
        </b-row>
        <ol>
          <li v-for="(ingredient, index) in form.ingredients" :key="index" class="copy-row">
            <b-col cols="12">
              <b-row>
                <b-col cols="5">
                  <b-form-group :id="'input-group-ingredientName-' + index" label-cols-sm="6" label="Ingredient Name:" :label-for="'ingredientName-' + index" >
                    <b-form-input :id="'ingredientName-' + index" type="text" v-model="ingredient.ingredientName"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="4">
                  <b-form-group :id="'input-group-measuringTool-' + index" label-cols-sm="6" label="Measuring Tool:" :label-for="'measuringTool-' + index" >
                    <b-form-input :id="'measuringTool-' + index" type="text" v-model="ingredient.measuringTool"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="2">
                  <b-form-group :id="'input-group-amount-' + index" label-cols-sm="6" label="Amount:" :label-for="'amount-' + index" >
                    <b-form-input :id="'amount-' + index" type="number" v-model="ingredient.amount"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
          </li>
        </ol>
        <b-row>
          <b-col cols="2">
            <label>Instructions:</label>
          </b-col>
          <b-col cols="8">
            <b-button variant="outline-primary" @click="onAddInstruction">Add Step</b-button>
          </b-col>
        </b-row>
        <ol>
          <li v-for="(instruction, index) in form.instructions" :key="index" class="copy-row">
            <b-form-input v-model="form.instructions[index]" type="text" class="instruction-class"></b-form-input>
          </li>
        </ol>
        <b-button type="submit" variant="primary" class="mx-auto w-100">Save Recipe</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { required, alpha, integer, url } from "vuelidate/lib/validators";

export default {
  name: "NewRecipeModal",
  data() {
    return {
      form: {
        RecipeName: "",
        CookingTime: "",
        ingredients: [],
        RecipeImg: "",
        isVegan: false,
        isVegetarian: false,
        GlutenFree: false,
        instructions: [],
        servings: "",
      },
    };
  },
  validations: {
    form: {
      recipeName: {
        required,
        alpha,
      },
      cookingTime: {
        integer,
        required,
      },
      recipeImg: {
        url,
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
    async onSave() {
      if (!this.$v.$invalid) {
        try {
          const response = await this.axios.post(this.$root.store.server_domain + "/users/addNewRecipe", this.form);
          if (response.status !== 200) {
            throw new Error("you have a problem");
          } else {
            // TODO A SUCCESS MESSAGE
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$v.$touch();
        for (const field in this.$v.form.$params) {
          if (!this.$v.form[field].$dirty && this.$v.form[field].required) {
            console.log(`${field} is required.`);
          } else {
            console.log("something went wrong with the new recipe form");
          }
        }
      }
    },
    onAddIngredient() {
      this.form.ingredients.push({ ingredientName: "", measuringTool: "", amount: "" });
    },
    onAddInstruction() {
      this.form.instructions.push("");
    },
  },
  computed: {
    numberOfIng() {
      return this.form.ingredients.length;
    },
    numberOfInstructions() {
      return this.form.instructions.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.blur {
  -webkit-filter: blur(5px);
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  cursor: default;
}
#div-add {
  background-color: #469bcf;
  text-align: center;
}
.btn-secondary {
  background-color: #587dc1;
}
</style> -->
