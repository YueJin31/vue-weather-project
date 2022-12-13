import { createStore } from "vuex";
import axios from "axios";
import Chart from "chart.js";

export default createStore({
  state: {
    apiBase: "https://api.openweathermap.org/data/2.5/",
    apiKey: "fd3150a661c1ddc90d3aefdec0400de4",
    search: "",
    isError: false,
    weatherData: [],
    favoriteData: [],
    isLoad: false,
    chart: null,
    city: "",
    dates: [],
    temps: [],
    chartIsShow: false,
    currentChartCity: "",
    locale: "",
  },
  getters: {
    getWeatherMain(state) {
      const { temp, feelsLike, description, icon, info, city, isFavorite } = state.weatherData;
      return {
        temp,
        feelsLike,
        description,
        info,
        icon,
        city,
        isFavorite,
      };
    },
    getData(state) {
      return state.weatherData;
    },
    isSearched(state) {
      return state.search !== "";
    },
    getError(state) {
      return state.isError;
    },
    isMaxLenght(state) {
      return state.weatherData.length > 4 ? 1 : 0;
    },
    isLoaded(state) {
      return state.isLoad;
    },
    getChartStatus(state) {
      return state.chartIsShow;
    },
    getCurrentChartCity(state) {
      return state.currentChartCity;
    },
    getFavoriteData(state) {
      return state.favoriteData.filter((item) => item.isFavorite);
    },
    returnfavoriteDataLenght(state) {
      return state.favoriteData.length;
    },
  },
  mutations: {
    setSearch(state, search) {
      state.search = search.toLowerCase();
    },
    setWeatherData(state, data) {
      state.weatherData.push(data);
    },
    setError(state, value) {
      state.isError = value;
      state.isLoad = false;
    },
    deleteWeatherCard(state, payload) {
      state.weatherData.splice(payload.index, 1);
      state.chartIsShow = false;
    },
    addToFavorite(state, item) {
      item.isFavorite = !item.isFavorite;

      if (item.isFavorite && !state.favoriteData.includes(item)) {
        state.favoriteData.push(item);
      }
    },
    setNewList(state, list) {
      state.favoriteData = list;
    },
    addToFavoriteFromLs(state, item) {
      state.favoriteData.push(item);
    },
    changeStatus(state) {
      state.chartIsShow = true;
    },
    setCurrentChartCity(state, city) {
      state.currentChartCity = city;
    },
    setCurrentChartValue(state, payload) {
      state.chartIsShow = payload.isChartShow;
    },
  },
  actions: {
    async fetchWeatherData({ commit, state }, search) {
      try {
        commit("setSearch", search);
        state.isLoad = true;
        const response = await axios.get(`${state.apiBase}weather?q=${search}&units=metric&APPID=${state.apiKey}`);
        const newWeatherData = {
          city: response.data.name,
          temp: Math.round(response.data.main.temp),
          feelsLike: Math.round(response.data.main.feels_like),
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon.substring(0, 2),
          isFavorite: false,
        };

        state.isLoad = false;
        commit("setWeatherData", newWeatherData);
        commit("setError", false);
      } catch (error) {
        commit("setError", true);
        state.chartIsShow = false;
      }
    },
    async fetchWeatherTemp({ commit, state }, city) {
      try {
        await axios
          .get("https://api.openweathermap.org/data/2.5/forecast", {
            params: {
              q: city,
              cnt: 9,
              units: "metric",
              appid: state.apiKey,
            },
          })
          .then((response) => {
            state.dates = response.data.list.map((list) => {
              return list.dt_txt;
            });

            state.temps = response.data.list.map((list) => {
              return list.main.temp;
            });

            var ctx = document.getElementById("tempChart");
            state.chart = new Chart(ctx, {
              type: "line",
              data: {
                labels: state.dates,
                datasets: [
                  {
                    label: `Avg. Temp ${response.data.city.name}`,
                    backgroundColor: "rgba(54, 162, 235, 0.5)",
                    borderColor: "rgb(54, 162, 235)",
                    fill: false,
                    data: state.temps,
                  },
                ],
              },
              options: {
                tooltips: {
                  callbacks: {
                    label: function (tooltipItem, data) {
                      var label = data.datasets[tooltipItem.datasetIndex].label || "";

                      if (label) {
                        label += ": ";
                      }

                      label += Math.floor(tooltipItem.yLabel);
                      return label + "°C";
                    },
                  },
                },
                scales: {
                  xAxes: [
                    {
                      type: "time",
                      time: {
                        unit: "hour",
                        displayFormats: {
                          hour: "M/DD / hA",
                        },
                        tooltipFormat: "MMM. DD / hA",
                      },
                      scaleLabel: {
                        display: true,
                        labelString: "Date/Time",
                      },
                    },
                  ],
                  yAxes: [
                    {
                      scaleLabel: {
                        display: true,
                        labelString: "Temperature (°C)",
                      },
                      ticks: {
                        callback: function (value, index, values) {
                          return value + "°C";
                        },
                      },
                    },
                  ],
                },
              },
            });
          });
      } catch (error) {
        commit("setError", true);
      }
    },
    getRequestChart({ state, dispatch, commit }, city) {
      if (state.currentChartCity !== city) {
        commit("setCurrentChartCity", city);
        dispatch("fetchWeatherTemp", city);
        commit("changeStatus");
      } else {
        commit("changeStatus");
      }
    },
  },
});
