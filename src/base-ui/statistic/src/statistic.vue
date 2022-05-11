<template>
  <span class="statistic" ref="statisticRef">{{ counter.toFixed(2) }}</span>
</template>

<script lang="ts">
import gsap from "gsap"
import { defineComponent, ref, watchEffect, onMounted } from "vue"

export default defineComponent({
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const statisticRef = ref(null)
    const counter = ref(0)
    onMounted(() => {
      watchEffect(() => {
        gsap.to(counter, {
          duration: 1,
          value: props.value.toFixed(2),
        })
      })
    })
    return {
      statisticRef,
      counter,
    }
  },
})
</script>

<style scoped></style>
