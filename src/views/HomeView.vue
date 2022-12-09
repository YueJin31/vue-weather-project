<template>
  <div class="content">
    <Form />
    <Spinner v-if="isLoaded" />
    <WeatherCard :items="getData" isMainCards />
    <Chart />
  </div>
</template>

<script>
import Form from "@/components/Form.vue";
import WeatherCard from "@/components/WeatherCard";
import Chart from "@/components/Chart";
import Spinner from "@/components/UI/Spinner";
import { mapGetters } from "vuex";

export default {
  components: {
    Form,
    WeatherCard,
    Chart,
    Spinner,
  },
  computed: {
    ...mapGetters(["getData", "isLoaded"]),
  },
  data: () => ({
    lastData: null,
  }),
  methods: {
    getFavorites() {
      const localNotes = localStorage.getItem("favorites");
      if (localNotes) {
        this.lastData = localNotes;
      }
    },
  },
  watch: {
    getData: {
      handler(updatedList) {
        const filt = updatedList.filter((item) => item.isFavorite);
        if (this.lastData) {
          let parse = JSON.parse(this.lastData);
          localStorage.setItem("favorites", JSON.stringify([...parse, ...filt]));
        } else {
          localStorage.setItem("favorites", JSON.stringify(filt));
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.getFavorites();
  },
};
</script>
