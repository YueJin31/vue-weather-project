<template>
  <transition name="fade" mode="out-in">
    <div class="modal-overlay">
      <div class="modal">
        <span class="close-modal" @click="onClose">&#10006;</span>
        <img class="check" src="../../assets/check-icon.png" />
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  emits: ["close"],
  methods: {
    onClose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
  z-index: 999;

  .modal {
    text-align: center;
    background-color: #fff;
    width: auto;
    margin-top: 10%;
    padding: 60px;
    border-radius: 20px;
    align-self: center;
    position: relative;

    .close-modal {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: -50px;
      font-size: 30px;
      color: #fff;
    }

    .buttons-wrapper {
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    .close-img {
      width: 25px;
    }

    .check {
      width: 100px;
    }

    h6 {
      font-weight: 500;
      font-size: 28px;
      margin: 20px 0;
    }

    p {
      font-size: 16px;
      margin: 20px 0;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 991px) {
  .modal {
    padding: 15px !important;

    .close-modal {
      top: 10px !important;
      right: 20px !important;
      font-size: 25px !important;
      color: #000 !important;
    }
  }
}
</style>
