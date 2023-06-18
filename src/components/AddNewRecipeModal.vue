<template>
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
                <b-form-group id="input-group-vegetarian" label-for="vegetarian">
                  <input id="vegetarian" v-model="form.isVegetarian" type="checkbox" />
                  <label for="vegetarian" class="checkboxes">Vegetarian</label>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group id="input-group-glutenFree" label-for="glutenFree">
                  <input id="glutenFree" v-model="form.GlutenFree" type="checkbox" />
                  <label for="glutenFree" class="checkboxes">Gluten Free</label>
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
          <li v-for="index in numberOfIng" :key="index" class="copy-row">
              <b-col cols="12">
                <b-row>
                  <b-col cols="5">
                    <b-form-group id="input-group-ingredientName" label-cols-sm="6" label="Ingredient Name:" label-for="ingredientName" >
                      <b-form-input id="ingredientName" type="text" v-model="form.ingredients[index-1].ingredientName"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="4">
                    <b-form-group id="input-group-measuringTool" label-cols-sm="6" label="Measuring Tool:" label-for="measuringTool" >
                      <b-form-input id="measuringTool" type="text" v-model="form.ingredients[index-1].measuringTool"></b-form-input>
                    </b-form-group>
                  </b-col>

                  <b-col cols="2">
                    <b-form-group id="input-group-amount" label-cols-sm="6" label="Amount:" label-for="amount" >
                      <b-form-input id="amount" type="number" v-model="form.ingredients[index-1].amount"></b-form-input>
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
          <li v-for="index in numberOfInstructions" :key="index" class="copy-row">
            <b-form-input id="instructions" v-model="form.instructions[index-1]" type="text" class="instruction-class"></b-form-input>t>
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
        recipeOwner: "",
        servings: "",
      },
    };
  },
  validations: {
    form: {
      RecipeName: {
        required,
        alpha,
      },
      CookingTime: {
        integer,
        required,
      },
      RecipeImg: {
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
      console.log("name:", this.form.RecipeName)
      if (!this.$v.form.$invalid) {
        try {
          const response = await this.axios.post(this.$root.store.server_domain + "/users/addNewRecipe", this.form);
          console.log(response)
          // this.$router.push("/personal");
          if (response.status !== 200) {
            throw new Error("you have a problem");
          } else {
            // TODO A SUCCESS MESSAGE
          }
        } catch (error) {
          console.log(error)
        }
      }
      else {
        for (const field in this.$v.form.$params) {
          if (!this.$v.form[field].$dirty && this.$v.form[field].required) {
            console.log(`${field} is required.`);
          }
          else {
            console.log("something went wring with new recipe form")
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
    numberOfIng(){
      return this.form.ingredients.length;
    },
    numberOfInstructions(){
      return this.form.instructions.length;
    }
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
</style>
