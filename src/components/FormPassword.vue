<template>
  <div>
    <label class="form-label">{{ label }}</label>
    <div class="input-group mb-3">
      <input type="password" v-if="!passwordVisible" class="form-control" v-model="dataValue" @input="handleInput"/>
      <input type="text" v-if="passwordVisible" class="form-control" v-model="dataValue" @input="handleInput"/>
      <div class="input-group-append">
        <span class="input-group-text" @click="togglePasswordVisible">
          <em class="bi bi-eye-fill" v-if="!passwordVisible"></em>
          <em class="bi bi-eye-slash-fill" v-if="passwordVisible"></em>
        </span>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "FormPassword",
  props: {
    label: {
      type: String,
      default: "Password"
    },
    value: {
      type: String
    },
    dataKey: {
      type: String
    }
  },
  data() {
    return {
      passwordVisible: false,
      dataValue: this.value
    };
  },
  methods: {
    togglePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
    },
    handleInput() {
      this.$emit("handleInput", {
        key: this.dataKey,
        value: this.dataValue
      });
    }
  },
};
</script>
<style scoped></style>
