<template>
  <div class="content">
    <WeatherCard :items="getFavoriteData ? favList : getFavoriteData" />
  </div>

  {{ favList }}
  {{ test }}
</template>

<script>
import WeatherCard from "@/components/WeatherCard";
import { mapGetters, mapActions } from "vuex";
import { reactive } from "@vue/reactivity";

export default {
  components: {
    WeatherCard,
  },
  data: () => ({
    favList: null,
  }),
  computed: {
    ...mapGetters(["getFavoriteData", "getData"]),

    test() {
      const obj = { ...this.favList };
      // return obj.filter((item) => item.isFavorite);
    },
  },
  methods: {
    getNotes() {
      const localNotes = localStorage.getItem("notes");
      if (localNotes) {
        this.favList = JSON.parse(localNotes);
      }
    },
  },
  watch: {
    getFavoriteData: {
      handler(updatedList) {
        const filt = updatedList.filter((item) => item.isFavorite);
        localStorage.setItem("notes", JSON.stringify(filt));
      },
      deep: true,
    },
  },
  mounted() {
    this.getNotes();
  },
};
</script>
