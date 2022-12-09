<template>
  <header>
    <div class="header-wrapper">
      <router-link class="header-wrapper__link" to="/"> {{ $filters.localizeFilter("HomeLink") }} </router-link>
      <router-link class="header-wrapper__link" to="/favorites">{{
        $filters.localizeFilter("FavoriteLink")
      }}</router-link>
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
header {
  padding-bottom: 150px;

  .header-wrapper {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background: #fff;

    &__link {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      color: #000;
      transition: all 0.5s ease;
      font-size: 17px;
      text-transform: uppercase;
      text-decoration: none;

      &:hover {
        color: #fff;
        background: rgba(102, 177, 241, 0.8);
        transition: all 0.5s ease;
      }
    }
  }
}
</style>
