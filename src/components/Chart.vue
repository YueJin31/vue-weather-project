<template>
  <canvas v-show="getChartStatus" id="tempChart"></canvas>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getChartStatus"]),
  },
};
</script>

<style scoped>
#tempChart {
  margin-top: 50px;
}
</style>
