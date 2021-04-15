<template>
  <button :class="[classString, 'button is-primary']">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    classString: String,
  },
};
</script>

<style lang="scss" scoped>
.addPost {
  position: absolute;
  top: 5px;
  right: 0;
}
</style>
