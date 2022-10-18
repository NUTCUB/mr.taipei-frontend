<template>
  <span :class="'mdi mdi-' + icon"></span>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
    },
  },
}
</script>

<style></style>
