<template>
  <span class="icon" @click="$emit('click', $event)">
    <i class="fas fa-angle-left fa-3x"></i>
  </span>
</template>

<script>
export default {}
</script>
<style scoped>
@import 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css';
.icon {
  color: #17e68e;
  position: absolute;
  top: 70px;
}
</style>
