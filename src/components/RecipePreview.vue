
<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-preview"
  >
    <div class="recipe-body">
      <img v-if="image_load" :src="recipe.image" class="recipe-image" />
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.Likes }} likes</li>
      </ul>
    </div>
  </router-link>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
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
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
</style> 


<!-- <template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-preview"
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
        <p>Preperation time: {{ recipe.duration }} minutes</p>
        <div class="indicators" v-if="$root.store.username">
          <span class="likes" v-if="recipe.likes > 0">{{recipe.likes}}<b-icon-hand-thumbs-up /></span>
          <b-icon-eye-fill v-if="watched" />
          <b-icon-eye v-else />
          <b-icon-star-fill v-if="favorite" />
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
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
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
    }
  }
};
</script>

<style lang="scss" scoped>
.recipe-preview {
  display: inline-block;
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
      transition: transform .5s ease;

      &:hover {
        transform: scale(1.2);
      }
    }
    .card-body {
      padding: 5px;
      background-color: white;
      z-index: 1;

      .card-title {
        font-size: 18px;
        color: #1b2e3e;
        margin: 0;
      }
    }
    .card-footer {
      padding: 0 5px 10px 5px;
      background-color: unset;
      border-top: unset;

      p {
        font-size: 12px;
        color: #93a4b0;
        margin: 0;
      }

      .indicators {
        & > * {
          margin: 0 5px;
          color: black;
          font-size: 25px;
        }

        .likes {
          float: right;
          font-size: 18px;
        }
      }

      .diet-indicators {
        img {
          height: 30px;
          margin-bottom: 10px;
        }
      }
    } 
  }
}
</style> -->
