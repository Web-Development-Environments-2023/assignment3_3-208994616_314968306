<template>
  <div id="wrapper">
    <div id="openModalDiv"></div>
    <h1></h1>
    <b-container class="container">
      <b-modal id="new-recipe-modal" title="" size="l" ok-only hide-footer>
        <b-form @submit="onSave">
          <b-row>
            <b-col>
              <b-form-group id="input-group-title" label-cols-sm="3" label="Title:" label-for="title">
                <b-form-input id="title" v-model="form.title" type="text"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-row>
                <b-col>
                  <b-form-group id="input-group-vegan" label-for="vegan">
                    <input id="vegan" v-model="form.vegan" type="checkbox" />
                    <label for="vegan" class="checkboxes">Vegan</label>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group id="input-group-vegetarian" label-for="vegetarian">
                    <input id="vegetarian" v-model="form.vegetarian" type="checkbox" />
                    <label for="vegetarian" class="checkboxes">Vegetarian</label>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group id="input-group-glutenFree" label-for="glutenFree">
                    <input id="glutenFree" v-model="form.glutenFree" type="checkbox" />
                    <label for="glutenFree" class="checkboxes">Gluten Free</label>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4">
              <b-form-group id="input-group-readyInMinutes" label-cols-sm="5" label="Ready In Minutes:" label-for="readyInMinutes">
                <b-form-input id="readyInMinutes" v-model="form.readyInMinutes" type="number"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="input-group-image" label-cols-sm="2" label="Image URL:" label-for="image">
                <b-form-input id="image" v-model="form.image" type="text"></b-form-input>
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
                    <b-form-group id="input-group-ingredientName" label-cols-sm="6" label="Ingredient Name:" label-for="ingredientName">
                      <b-form-input id="ingredientName" type="text" v-model="ingredient.ingredientName"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="4">
                    <b-form-group id="input-group-measuringTool" label-cols-sm="6" label="Measuring Tool:" label-for="measuringTool">
                      <b-form-input id="measuringTool" type="text" v-model="ingredient.measuringTool"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="2">
                    <b-form-group id="input-group-amount" label-cols-sm="6" label="Amount:" label-for="amount">
                      <b-form-input id="amount" type="number" v-model="ingredient.amount"></b-form-input>
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
            <li v-for="(item, index) in form.instructions" :key="index" class="copy-row">
              <b-form-input v-model="item.instruction" type="text" class="instruction-class"></b-form-input>
            </li>
          </ol>
          <b-button type="submit" variant="primary" class="mx-auto w-100">Save Recipe</b-button>
        </b-form>
      </b-modal>
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
        title: "",
        readyInMinutes: "",
        ingredients: [],
        image: "",
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        instructions: [{ instruction: '' }],
        recipeOwner: "",
      },
    };
  },
  validations: {
    form: {
      title: {
        required,
        alpha,
      },
      readyInMinutes: {
        integer,
        required,
      },
      image: {
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
      if (!this.$v.form.$invalid) {
        try {
          const response = await this.axios.post(this.$root.store.server_domain + "/users/addRecipe", this.form);
          this.$router.push("/personal");
          if (response.status !== 200) {
            throw new Error("you have a problem");
          } else {
            // TODO A SUCCESS MESSAGE
          }
        } catch (error) {}
      }
    },
    onAddIngredient() {
      this.form.ingredients.push({ ingredientName: "", measuringTool: "", amount: "" });
    },
    onAddInstruction() {
      this.form.instructions.push("");
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
</style>
