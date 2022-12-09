<template>
  <div class="content">
    <WeatherCard :items="returnfavoriteDataLenght == 0 ? favList : getFavoriteData" />
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
    ...mapMutations(["addToFavorite"]),

    led() {
      return this.favList;
    },
  },
  methods: {
    getFavorites() {
      const localNotes = localStorage.getItem("favorites");
      if (localNotes) {
        this.favList = JSON.parse(localNotes);
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
  },
};
</script>
