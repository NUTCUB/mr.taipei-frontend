<template>
  <div
    class="notice"
    :style="{
      'background-color': this.color,
      color: this.textColor,
    }"
    @click="$emit('click', $event)"
  >
    <div class="font-size-mini mb-2">
      {{ title }}
    </div>
    <div class="flex justify-content-space-between align-items-center">
      <div class="cols align-items-center">
        <div
          class="font-size-regular icon flex flex-all-center mr-2"
          v-if="icon"
          :style="{
            'background-color': this.textColor,
            color: this.color,
          }"
        >
          <Icon :icon="icon"></Icon>
        </div>
        <span class="font-size-regular"> {{ message }} </span>
      </div>
      <div class="font-size-mini">
        {{ tips }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
    message: {
      type: String,
    },
    tips: {
      type: String,
    },
    color: {
      type: String,
      default: '#eca468',
    },
    textColor: {
      type: String,
      default: '#ffffff',
    },
  },
}
</script>

<style scoped>
.notice {
  border-radius: 12px;
  padding: 1.2rem 1.4rem;

  width: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
}

.icon {
  width: 2rem;
  height: 2rem;

  border-radius: 8px;
}
</style>
