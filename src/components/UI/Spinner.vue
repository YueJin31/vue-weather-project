<template>
  <div class="spinner-wrapper">
    <div :style="{ width: `${width}px`, height: `${height}px` }" class="spinner" />
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 80,
    },
    height: {
      type: Number,
      default: 80,
    },
  },
};
</script>

<style lang="scss">
.spinner-wrapper {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .spinner {
    display: inline-block;

    &:after {
      content: " ";
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid #000;
      border-color: #000 transparent #000 transparent;
      animation: spin 1.2s linear infinite;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
