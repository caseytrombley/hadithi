<template>
  <a
      v-if="isLink"
      class="button"
      :class="{solid: 'solid'}"
      v-bind="$attrs"
  >
    <slot></slot>
  </a>
  <button
      v-else-if="isAction"
      class="button-action"
  >
    <component :is="`b-icon-${icon}`" /> <slot></slot>
  </button>
  <button
      v-else-if="isActionIcon"
      class="button-action-icon"
  >
    <component :is="`b-icon-${icon}`" />
    <b-badge class="badge bg-success rounded-pill">
      <slot name="count"></slot><span class="visually-hidden"><slot name="label"></slot></span>
    </b-badge>
    <slot></slot>
  </button>
  <button
      v-else
      class="button"
      :class="[{solid: solid}, variant]"
      v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    isLink: {
      type: Boolean,
      default: false,
    },
    isAction: {
      type: Boolean,
      default: false,
    },
    isActionIcon: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: 'info',
    },
    solid: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: null,
    }
  },
}
</script>

<style lang="scss" scoped>
.button {
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 12px 32px;
  border-radius: 50px;
  transition: 0.3s;
  line-height: 1;
  color: $orange;
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
  margin-top: 6px;
  border: 2px solid $orange;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: $orange;
    color: #ffffff;
    text-decoration: none;
  }

  &.solid {
    color: #ffffff;
    background: $orange;
    border-color: $orange;

    &:hover {
      background: #ffffff;
      color: $orange;
    }
  }

  &.outline-primary {
    color: $orange;
    background: transparent !important;
    border-color: $orange;

    &:hover {
      background: transparent !important;
      color: #ffffff;
      border-color: #ffffff;
    }
  }
}

.button-action {
  border: 0;
  background: none;
  font-size: .875rem;
  color: $tan;
  padding: .5rem;

  .bi {
    margin-right: .25rem;
    color: $tan;
    fill: $tan;
  }

  &:hover,
  &:focus,
  &:active {
    color: #222222;
  }

  @media (min-width: 576px) {
    font-size: 1rem;
  }
}

.button-action-icon {
  border: 0;
  background: none;
  font-size: 1rem;
  color: $tan;
  padding: .25rem;

  .bi {
    font-size: 1.5rem;
    color: $tan;
    fill: $tan;
  }

  .badge {
    position: absolute;
    top: 7px;
    left: 120%;
    padding: .25rem .35rem;
    font-size: .65rem;
    transform: translate(-50%, -50%) !important;
  }

  &:hover,
  &:focus,
  &:active {
    color: #222222;
  }

  @media (min-width: 576px) {
    font-size: 1rem;
  }
}
</style>