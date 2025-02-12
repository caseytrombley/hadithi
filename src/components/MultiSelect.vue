<template>
  <div>
    <multiselect
      v-model="multiselect.value"
      :tag-placeholder="`Add this as new ${this.dataSet}`"
      :placeholder="`Search or add a ${this.dataSet}`"
      :label="labelName"
      :track-by="trackBy"
      :options="multiselect.options"
      :multiple="true"
      :taggable="taggable"
      @tag="addSelectedOption"
      @input="handleInput"
    />
  </div>
</template>
<script>
import Multiselect from "vue-multiselect";

export default {
  name: "MultiSelect",
  components: {
    Multiselect,
  },
  props: {
    labelName: {
      type: String,
      default: "name",
    },
    trackBy: {
      type: String,
      default: "code",
    },
    dataSet: {
      type: String,
    },
    taggable: {
      type: Boolean,
      default: true,
    },
    selectedOptions: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({
        value: [],
        options: [],
      }),
    },
  },
  data() {
    return {
      multiselect: this.options,
    };
  },
  mounted() {
    this.setSelectedOptions(this.selectedOptions);
  },
  methods: {
    setSelectedOptions(selectedOptions) {
      selectedOptions.map((selectedOption) =>
        this.addSelectedOption(selectedOption)
      );
    },
    addSelectedOption(tag) {
      const selectedOption = {
        name: tag,
        code: tag,
      };
      this.multiselect.options.push(selectedOption);
      this.multiselect.value.push(selectedOption);
      this.handleInput(this.getSelectedOptions());
    },
    getSelectedOptions() {
      return this.multiselect.value;
    },
    handleInput(input) {
      this.$emit("handleInput", {
        key: this.dataSet,
        values: input.map((i) => i.name),
      });
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
