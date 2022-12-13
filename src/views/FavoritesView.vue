<template>
  <div class="content">
    <WeatherCard :items="getFavoriteData" />
    <Chart />
  </div>
</template>

<script>
import WeatherCard from "@/components/WeatherCard";
import Chart from "@/components/Chart";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    WeatherCard,
    Chart,
  },
  data: () => ({
    favList: null,
  }),
  computed: {
    ...mapGetters(["getFavoriteData", "getData", "setWeatherData", "returnfavoriteDataLenght"]),
    ...mapMutations(["addToFavorite", "setWeatherData"]),
  },
  methods: {
    getFavorites() {
      const localNotes = localStorage.getItem("favorites");
      if (localNotes) {
        this.favList = [];
        this.favList = JSON.parse(localNotes);
      }
    },

    setItems() {
      if (this.returnfavoriteDataLenght != 0 && this.favList) {
        this.$store.commit("addToFavorite", ...this.favList);
      } else if (this.returnfavoriteDataLenght == 0 && this.favList) {
        this.$store.commit("setNewList", this.favList);
      }
    },
  },
  watch: {
    getFavoriteData: {
      handler(updatedList) {
        const filt = updatedList.filter((item) => item.isFavorite);
        localStorage.setItem("favorites", JSON.stringify(filt));
      },
      deep: true,
    },
  },
  mounted() {
    this.getFavorites();
    this.setItems();
  },
};
</script>
