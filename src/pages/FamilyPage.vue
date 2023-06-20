<template>
  <div class="about-page">
    <h1>Family Recipes</h1>
    <p>
      Our family recipes are cherished heirlooms, passed down through generations, each one holding the essence of our shared history and love. With every bite, you can taste the warmth, tradition, and togetherness that define our culinary heritage.    
    </p>

    <div class="family-recipes">
      <div v-for="recipe in familyRecipes" :key="recipe.title" class="family-recipe">
        <h3>{{ recipe.title }}</h3>
        <img :src="recipe.image" :alt="recipe.title" class="image" />
        <h2>Ingredients:</h2>
        <ul>
          <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
        </ul>
        <h2>Instructions:</h2>
        <ul>
          <li v-for="instruction in recipe.instructions" :key="instruction">{{ instruction }}</li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script>
import jahnun from "../assets/jahnun.jpg"


export default {
  data() {
    return {
      familyRecipes: [
        {
          title: "HOMEMADE JACHNUN FROM SCRATCH",
          ingredients: ["8 cups all-purpose flour", "¼ cup sugar", "½ teaspoon baking powder", "2 tablespoons honey", "1 tablespoon kosher salt", "2½ cups warm water", "1 tablespoon olive oil, plus more for coating", "½ cup butter or ghee or olive oil, plus more as needed"],
          instructions: ["Place flour, sugar, baking powder, honey, and salt in a large bowl.", "Add water and stir until the dough is shaggy and the water has been absorbed.", "Knead the dough in the bowl for 2 minutes.", "Set the dough aside at room temperature to rest for 5 minutes.", "Stretch and fold the dough a few times until the dough feels nice and smooth.  Cover with a towel and set aside for 1 hour.", "Lightly oil a large container or glass casserole.  Oil your hands and coat the dough with a thin layer of oil.", "Separate the dough into 10 balls.  Roll each one into a tight ball and place in oiled container. Cover with a towel and let rest 5 minutes.", "Preheat oven to 225℉. Line a deep pot with parchment paper and lightly oil.", "For each ball generously coat with oil and flatten as thin as possible with the palm of your hands.", "Spread butter, ghee or olive oil over top.  Then beginning folding and rolling.", "Fold the left side over towards the center and then the right side.  From the narrow edge slowly roll up the dough into a tight cylinder.  Place in prepared pot in a single layer, top with parchment then add the second layer on top, across in a crosshatch pattern, repeat with a third layer.  Top with parchment and layer of raw eggs.", "Cover and seal pot tightly.  Place in oven and bake for 12 hours. The next morning remove from oven and serve with eggs, pickles and tomato dip."],
          image: jahnun
        }
      ]
    };
  }
};
</script>

<style scoped>
.about-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.about-page h1 {
  font-size: 4vw;
  margin-bottom: 1.5vw;
}

.about-page h2 {
  font-size: 2.5vw;
  margin-top: 2vw;
  margin-bottom: 1.5vw;
}

.about-page p {
  font-size: 1.4vw;
  line-height: 1.5;
}

.family-recipes {
  display: flex;
  justify-content: center;
}

.family-recipe {
  margin: 3vh;
}

.image {
  width: 30vw;
  height: 30vw;
  object-fit: cover;
}

.family-recipe h2 {
  font-size: 2vw;
}

.family-recipe h3 {
  font-size: 3vw;
}

.family-recipe ul {
  font-size: 1.5vw;
}
</style>