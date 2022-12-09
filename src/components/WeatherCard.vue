<template>
  <!-- v-if="!getError && isSearched" -->
  <div class="weather-wrapper">
    <div class="weather-main" v-for="(item, index) in items" :key="index">
      <span v-if="isMainCards" class="close" @click="openModal(index)">&#10006;</span>
      <svg
        class="heart"
        :class="{ filled: item.isFavorite }"
        @click="addToFavorite(item)"
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"
        />
      </svg>

      <h2>{{ item.city }}</h2>
      <div class="weather-feelsLike">
        Feels like
        <strong>
          {{ item.feelsLike }}
          <sup>&deg;</sup>
        </strong>
      </div>
      <div class="weather-temp">
        <div
          class="weather-icon"
          :style="[
            item.icon ? { 'background-image': 'url(http://openweathermap.org/img/wn/' + item.icon + 'd@2x.png)' } : {},
          ]"
        ></div>
        <span>{{ item.temp }}</span>
        <sup>&deg;</sup>
      </div>
      <div class="weather-description">{{ item.description }}</div>
      <button type="button" @click="getChart(item.city)">Show Chart</button>

      <Modal v-show="showModal" @close="onClose">
        <p>Are you sure you want to delete this card?</p>
        <div class="buttons-wrapper">
          <button @click="onDelete({ choosedCity, index })">Yes</button>
          <button @click="onClose">No</button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Spinner from "@/components/UI/Spinner";
import Modal from "@/components/UI/Modal.vue";

export default {
  props: {
    items: {
      type: Array,
    },
    isMainCards: Boolean,
  },
  data() {
    return {
      showModal: false,
      choosedIndex: null,
      choosedCity: this.city,
      isChartShow: false,
    };
  },
  computed: {
    ...mapGetters(["getError", "getData", "isSearched", "isLoaded", "getChartStatus", "getCurrentChartCity"]),
    checkCityOfChart() {
      this.city !== this.getCurrentChartCity ? false : true;
    },
  },
  methods: {
    ...mapMutations(["addToFavorite", "deleteWeatherCard"]),
    ...mapActions(["getRequestChart"]),

    openModal(index) {
      this.choosedIndex = index;
      this.showModal = !this.showModal;
    },
    onClose() {
      this.showModal = false;
    },
    onDelete(city, index) {
      this.deleteWeatherCard(city, index);
      this.onClose();
    },
    getChart(city) {
      this.getRequestChart(city);
      this.choosedCity = city;

      this.isChartShow = !this.isChartShow;
    },
  },
  components: {
    Spinner,
    Modal,
  },
};
</script>

<style lang="scss" scoped>
.weather-wrapper {
  display: flex;
  gap: 45px;
  justify-content: center;
  flex-wrap: wrap;

  .weather-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-radius: 25px;
    width: calc((100% / 3) - 45px);
    position: relative;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding: 25px;

    .close,
    .heart {
      position: absolute;
      top: 20px;
      right: 25px;
      font-size: 26px;
      cursor: pointer;
      line-height: 1;
    }

    .heart {
      left: 25px;

      &.filled {
        fill: red;
      }
    }

    .weather {
      &-temp {
        position: relative;
        width: 150px;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        box-shadow: 0 0 40px fade(black, 20);
        background-color: #fff;
        margin: 20px 0;
        span {
          font-size: 80px;
          font-weight: 800;
          letter-spacing: -2px;
          position: relative;
        }
        sup {
          position: relative;
          top: -21px;
          font-size: 40px;
        }
      }

      &-icon {
        position: absolute;
        top: -35px;
        left: -35px;
        width: 110px;
        height: 110px;
        background-repeat: no-repeat;
        background-size: 100%;
        filter: drop-shadow(1px 1px 0 fade(black, 3)) drop-shadow(-5px -5px 0 fade(black, 8));
      }

      &-feelsLike,
      &-description {
        font-size: 18px;
        color: var(--darkColor);
        text-transform: capitalize;
        sup {
          position: relative;
          top: 5px;
          left: -2px;
          font-size: 18px;
        }
      }
    }
  }
}

@media (max-width: 991px) {
  .weather-main {
    width: 100% !important;
  }
}
</style>
