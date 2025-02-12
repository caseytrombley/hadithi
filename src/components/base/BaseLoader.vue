<template>
<!--  <span class="loader" :class="[{large: large}, {block: block}]" />-->

  <div class="loader" :class="[{large: large}, {block: block}]">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: 'BaseLoader',
  props: {
    large: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    }
  },
}
</script>

<style lang="scss" scoped>

.loader {
  display:inline-block;
  font-size:0;
  padding:0;

  span {
    vertical-align:middle;
    border-radius:100%;
    display:inline-block;
    width:10px;
    height:10px;
    margin:3px 2px;
    animation:loaderPulse 0.8s linear infinite alternate;

    &:nth-child(1) {
      -webkit-animation-delay:-1s;
      animation-delay:-1s;
      background:rgba(239, 101, 3, 0.6);
    }

    &:nth-child(2) {
      -webkit-animation-delay:-0.8s;
      animation-delay:-0.8s;
      background:rgba(239, 101, 3, 0.8);
    }

    &:nth-child(3) {
      -webkit-animation-delay:-0.26666s;
      animation-delay:-0.26666s;
      background:rgba(239, 101, 3, 1);
    }

    &:nth-child(4) {
      -webkit-animation-delay:-0.8s;
      animation-delay:-0.8s;
      background:rgba(239, 101, 3, 0.8);

    }

    &:nth-child(5) {
      -webkit-animation-delay:-1s;
      animation-delay:-1s;
      background:rgba(239, 101, 3, 0.4);
    }
  }

  &.block {
    display: block;
    margin: 1rem auto;
    width: max-content;
  }

  &.large {
    span {
      width: 30px;
      height: 30px;
    }
  }
}

@keyframes loaderPulse {
  from {transform: scale(0, 0);}
  to {transform: scale(1, 1);}
}
@-webkit-keyframes loaderPulse {
  from {-webkit-transform: scale(0, 0);}
  to {-webkit-transform: scale(1, 1);}
}

</style>