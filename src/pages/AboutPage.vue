<template>
  <div class="about-page">
    <h1>About Us</h1>
    <p>
      Welcome to our delightful recipes site, where culinary exploration knows no bounds! With an extensive collection of long-range recipes gathered from all corners of the globe, we take pride in offering a diverse culinary experience that satisfies the taste buds of every adventurous food lover.
    </p>

    <h2>Meet Our Team</h2>
    <div class="team-members">
      <div v-for="member in team" :key="member.name" class="team-member">
        <img :src="member.image" :alt="member.name" class="image" />
        <h3>{{ member.name }}</h3>
        <p>{{ member.role }}</p>
      </div>
    </div>
    <p>
      Our esteemed partner, Saar, a culinary virtuoso, brings his exceptional expertise and passion for cooking to the forefront, ensuring each recipe is a masterpiece in its own right.
    </p>
    <p>
      As for me, Lior, a seasoned chef with an insatiable appetite for creating exquisite dishes, I am thrilled to share my culinary knowledge and insights with you.
    </p>
    <p>
      Together, Saar and I are dedicated to providing you with a treasure trove of gastronomic wonders that will transport your senses to far-flung lands with every bite. Get ready to embark on a culinary journey like no other!    </p>
    
  </div>
</template>

<script>
import chef1 from "../assets/chef1.png"
import chef2 from "../assets/chef2.png"


export default {
  data() {
    return {
      team: [
        {
          name: "Saar",
          role: "Chef",
          image: chef1
        },
        {
          name: "Lior",
          role: "Suchef",
          image: chef2
        }
      ]
    };
  }
};
</script>

<style scoped>
.about-page {
  max-width: 750px;
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

.team-members {
  display: flex;
  justify-content: center;
}

.team-member {
  text-align: center;
  margin: 3vh;
}

.image {
  width: 9vw;
  height: 17vw;
  object-fit: cover;
}

.team-member h3 {
  font-size: 3vw;
}

.team-member p {
  font-size: 2vw;
}
</style>