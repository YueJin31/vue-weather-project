<template>
  <div class="weather-search">
    <div class="wrapper" @click="modal = false"></div>
    <input
      type="text"
      placeholder="Search City"
      class="search-control"
      autocomplete="off"
      @keydown.enter="getData"
      @focus="modal = true"
      :disabled="isMaxLenght"
      v-model.trim="search"
      v-model="state"
    />

    <div class="auto-list" v-if="filteredStates && modal">
      <ul>
        <li
          v-for="item in filteredStates"
          :key="item"
          @click="
            setState(item);
            getData;
          "
        >
          {{ item }}
        </li>
      </ul>
    </div>

    <div class="error" v-if="getError">No results found!</div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      search: this.$store.state.search,
      modal: false,
      state: "",
      states: ["Kharkiv", "Kyiv", "Lviv", "Dnipro", "Poltava", "Sumy", "Kherson"],
      filteredStates: [],
      err: false,
    };
  },
  computed: {
    ...mapGetters(["isSearched", "getError", "isMaxLenght"]),
  },
  methods: {
    ...mapMutations(["setNewCity"]),
    ...mapActions(["fetchWeatherData", "fetchWeatherTemp"]),

    getData() {
      this.fetchWeatherData(this.search);
      this.search = "";
      this.setNewCity(this.state);

      if (!this.getError) {
        localStorage.setItem("city-list", JSON.stringify(this.states));
      }
    },

    filterStates() {
      if (this.state.length == 0) this.filteredStates = this.states;

      this.filteredStates = this.states.filter((state) => {
        return state.toLowerCase().startsWith(this.state.toLowerCase());
      });
    },

    setNewCity(city) {
      if (!this.states.includes(city) && !this.getError) {
        this.states.push(city);
      }
    },

    setState(state) {
      this.state = state;
      this.modal = false;

      this.search = state;
      this.getData();
      this.search = this.$store.state.search;
    },

    getListCity() {
      const localNotes = localStorage.getItem("city-list");
      if (localNotes) {
        this.states = JSON.parse(localNotes);
      }
    },
  },
  mounted() {
    this.filterStates();
    this.getListCity();
    this.filterStates();
  },
  watch: {
    state() {
      this.filterStates();
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-search {
  margin-bottom: 70px;
  position: relative;

  .wrapper {
    position: absolute;
    z-index: 0;
    top: 0;
    height: 70vh;
    width: 100%;
    left: 0;
  }

  .search-control,
  .auto-list ul {
    width: 100%;
    height: 55px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border: 0px solid #000;
    border-radius: 20px;
    outline: none;
    background-color: transparent;
    font-size: 16px;
    padding: 25px;
    z-index: 999;
    position: relative;

    &::placeholder {
      color: fade(black, 60);
    }

    &:focus {
      background-color: #fff;
      font-weight: 600;
    }
  }

  .error {
    position: absolute;
    color: red;
    text-align: center;
    bottom: -60px;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 20px;
    z-index: 9;
  }

  .auto-list {
    position: relative;
    z-index: 99;
    position: absolute;
    width: 100%;
    background: #fff;

    > ul {
      height: auto;
      list-style-type: none;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      padding: 0;
      overflow: hidden;
      margin-top: 10px;
      max-height: 250px;
      overflow-y: auto;

      li {
        padding: 7px 25px;
        cursor: pointer;
        position: relative;
        transition: background 1s ease;

        &:hover {
          background: rgba(98, 98, 98, 0.27);
        }
      }
    }
  }
}
</style>
