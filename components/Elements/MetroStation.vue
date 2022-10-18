<template>
  <div class="wrapper">
    <div
      class="station"
      :style="{
        boxShadow: '0px 0px 0px 2px inset ' + color,
        borderRadius: '8px',
      }"
    >
      <span class="line">{{ line }}</span>
      <span class="lineNumber">{{ lineNumber }}</span>
    </div>
    <div class="exitWrapper">
      <span class="exit">{{ exit }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'red',
    },
    code: {
      type: String,
      default: '#',
    },
    exit: {
      type: String,
      default: '出口 1',
    },
  },
  computed: {
    line() {
      let matchs = this.code.match(/\d+/)
      if (matchs == null) {
        return this.code
      }
      return this.code.replace(matchs[0], '')
    },
    lineNumber() {
      let matchs = this.code.match(/\d+/)
      if (matchs == null) {
        return this.code
      }
      return matchs[0]
    },
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.station {
  display: flex;
  width: fit-content;
  height: fit-content;

  flex-direction: column;
  align-items: center;

  background: white;
  padding: 8px 4px;
}

.line {
  font-weight: bold;
  font-size: 0.8rem;
  line-height: 0.6rem;
}
.lineNumber {
  font-size: 1.2rem;
  line-height: 1.1rem;
  font-weight: bold;
}

.exitWrapper {
  width: 0;
  height: 0;
  display: flex;
  justify-content: center;
}
.exit {
  color: #aaaaaa;
  white-space: nowrap;
}
</style>
