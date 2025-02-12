<template>
  <div class="tag" :class="`theme-${theme}`">
    <span><slot></slot></span>
  </div>
</template>
<script>
export default {
  name: "LabelTag",
  props: {
    theme: {
      type: String,
      default: 'default'
    },
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/_variables.scss";
.tag {
  &.theme-default {
    $height: 24px;
    $color: $green;

    display: inline-block;
    position: relative;
    top: -1px;
    width: auto;
    height: $height;
    margin-left: $height;
    padding: 0 10px 0 5px;
    font-size: 16px;
    font-weight: 400;
    line-height: $height;
    color: $white;
    background-color: $color;
    border-radius: 3px 4px 4px 3px;
    border-left: 1px solid $color;
    vertical-align: middle;

    &::before {
      display: block;
      position: absolute;
      content: '';
      left: calc(($height*-1)/2);
      width: 0;
      height: 0;
      border-top: calc($height/2) solid transparent;
      border-bottom: calc($height/2) solid transparent;
      border-right: calc($height/2) solid $color;
    }

    @media (max-width: 767px) {

      $height: 20px;

      height: 20px;
      font-size: 14px;
      line-height: 18px;

      &::before {
        left: calc(($height*-1)/2);
        border-top: calc($height/2) solid transparent;
        border-bottom: calc($height/2) solid transparent;
        border-right: calc($height/2) solid $color;
      }
    }
  }

  &.theme-corner-label {
    $height: 35px;
    $color: $green;

    position: absolute;
    width: 0;
    height: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: $height;
    border-top: $height $color solid;
    border-left: $height $color solid;
    border-right: $height transparent solid;
    border-bottom: $height transparent solid;
    color: $white;

    span {
      position: relative;
      display: block;
      top: -18px;
      left: -24px;
      word-wrap: initial;
      transform: rotate(-45deg);

    }
  }

  &.theme-corner-badge {
    $height: 24px;
    $color: $orange;

    position: absolute;

    span {
      position: relative;
      display: block;
      top: calc($height / 3);
      left: calc($height / 7);
      font-size: 16px;
      font-weight: 400;
      color: $white;
      word-wrap: initial;
      transform: rotate(-45deg);
    }

    &::before {
      position: absolute;
      display: block;
      content: "";
      text-align: center;
      width: 100px;
      height: $height;
      left: -50px;
      top: -10px;
      transform-origin: 50% 50%;
      transform: translate(20px, 20px) rotate(-45deg);
      box-shadow: 1px 1px 1px rgba(0,0,0,.15);
      background: $color;
    }
  }
}

</style>
