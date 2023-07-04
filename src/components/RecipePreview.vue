<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-preview"
    @click.native="addToWatched(recipe.id)"
  >
  
     <b-card
      :title="recipe.title"
      :img-src="recipe.image"
      :img-alt="recipe.title"
      footer-tag="footer"
      class="mb-2"
    >
      <template #footer>
        <div class="diet-indicators">
          <img src="../assets/gluten.png" v-if="recipe.glutenFree" title="Gluten free" />
          <img src="../assets/vegan.png" v-if="recipe.vegan" title="Vegan" />
          <img src="../assets/vegetarian.png" v-if="recipe.vegetarian" title="Vegetarian" />
        </div> 
        <div>
          <p>Preperation time: {{ recipe.readyInMinutes }} minutes</p>
        </div>
        <div class="indicators" v-if="$root.store.username && !created">
          <span class="likes" v-if="recipe.Likes > 0">{{recipe.Likes}}<b-icon-hand-thumbs-up /></span>
          <b-icon-eye-fill v-if="watched" />
          <b-icon-eye v-else />
          <b-icon-star-fill v-if="favorite" class="favorite-icon" />
          <b-icon-star v-else @click.stop.prevent="() => addFavorite(recipe.id)" />
        </div>
      </template>
    </b-card>
  </router-link>
</template>

<script>
export default {
  name: "RecipePreview",
  mounted() {
    this.axios
    .get(this.recipe.image)
    .then((i) => {
      this.image_load = true;
    })
    .catch((error) => {
      console.log(error);
    });
  },
  data() {
    return {
      image_load: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    watched: {
      type: Boolean,
      required: true
    },
    favorite: {
      type: Boolean,
      required: true
    },
  	addFavorite: {
      type: Function,
      required: true
    },
    created: {
      type: Boolean,
      required: true
    },
    addToWatched: {
      type: Function,
      required: true
    },
  }
};
</script>

<style lang="scss" scoped>
.favorite {
  color: yellow;
}
.recipe-preview {
  width: 100%;
  height: 100%;
  text-decoration: none;

  &:hover .card-title {
    text-decoration: underline;
  }

  .card {
    border: unset;
    overflow: hidden;

    .card-img {
      width: 25vw;
      height: 25vw;
      object-fit: cover;
      transition: transform .5s ease;

      &:hover {
        transform: scale(1.2);
      }
    }
    .card-body {
      padding: 1vw;
      width: 25vw;
      background-color: black;
      z-index: 1;
      margin-bottom: 1vw;

      .card-title {
        font-size: 1.5vw;
        color: white;
        margin: 0;
      }
    }
    .card-footer {
      padding: 0 1vh 2vh 1vh;
      background-color: unset;
      border-top: unset;

      p {
        font-size: 2.5vh;
        color: #93a4b0;
        margin: 0;
      }

      .indicators {
        & > * {
          margin: 2vh 2vh 2vh;
          color: black;
          font-size: 5vh;
        }

        .likes {
          float: right;
          font-size: 3vh;
        }
      }

      .diet-indicators {
        img {
          height: 6vh;
          margin-bottom: 0.5vw;
        }
      }
    } 
  }
}

</style>
