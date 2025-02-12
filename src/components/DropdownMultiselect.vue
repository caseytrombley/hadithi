<template>
  <div class="d-flex justify-content-start flex-column">
    <div
      class="p-2 dropdown-toggle text-left border rounded col-12 border-secondary"
      type="button"
      aria-expanded="false"
      @click="showOptions"
    >
      {{ componentLabel }}
    </div>
    <div v-if="show">
      <ul class="p-0">
        <li
          v-for="(option, index) in options"
          class="d-flex dropdown-item mt-1"
          :key="index"
        >
          <div class="">
            <input
              @change="addToSelected"
              v-model="option.value"
              type="checkbox"
              :value="option.name"
              class="m-1"
            />{{ option.name }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "DropdownMultiselect",
  props: {
    meta: {
      type: Object,
      default() {
        return {};
      },
    },
    options: Array,
    componentLabel: String,
    componentIndex: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      show: false,
      optionCheckedValue: false,
      selected: {},
    };
  },
  methods: {
    showOptions() {
      this.show = !this.show;
    },
    addToSelected(e) {
      this.selected[e.target.value] = e.target.checked;
      this.emitSelectedOptions();
    },
    emitSelectedOptions() {
      this.meta["selected"] = this.selected;
      this.$emit("selected", this.meta);
    },
  },
};
</script>
<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
