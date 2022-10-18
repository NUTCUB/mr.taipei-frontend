<template>
  <div class="wrapper">
    <nuxt />
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.wrapper {
  background:#333;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 1000;

  width: 100%;
  height: 100%;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>
