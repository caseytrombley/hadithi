<template>
  <div>
    <label class="form-label d-flex flex-column justify-content-center">
      <button class="btn btn-link" @click="toggleDisplay">Generate Password</button>
    </label>
    <div class="input-group mb-3" v-if="isVisible">
      <div class="input-group-prepend">
        <span class="input-group-text" @click="handleGenerate">
          <em class="bi bi-arrow-clockwise"></em>
        </span>
      </div>
      <input type="text" id="generated_password" class="form-control" v-model="password" readonly/>
      <div class="input-group-append">
        <span class="input-group-text" @click="copyToClipboard">
          <em class="bi bi-clipboard"></em>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PasswordGenerator",
  props: {
    dataKey: {
      type: String
    },
    size: {
      type: Number,
      default: 12
    },
    characters: {
      type: String,
      default: 'a-z,A-Z,0-9,#'
    }
  },
  data() {
    return {
      password: '',
      isVisible: false
    };
  },
  methods: {
    toggleDisplay(){
      this.isVisible = !this.isVisible;
      if(!this.isVisible){
        this.password = '';
        this.handleGeneratedInput(this.dataKey, this.password);
      }
    },
    handleGenerate() {
      this.password = this.generatePassword();
    },
    generatePassword() {
      let charactersArray = this.characters.split(',');
      let CharacterSet = '';
      let password = '';

      if (charactersArray.indexOf('a-z') >= 0) {
        CharacterSet += 'abcdefghijklmnopqrstuvwxyz';
      }
      if (charactersArray.indexOf('A-Z') >= 0) {
        CharacterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      }
      if (charactersArray.indexOf('0-9') >= 0) {
        CharacterSet += '0123456789';
      }
      if (charactersArray.indexOf('#') >= 0) {
        CharacterSet += '!@#$%^&';
      }

      for (let i = 0; i < this.size; i++) {
        password += CharacterSet.charAt(Math.floor(Math.random() * CharacterSet.length));
      }

      return password;
    },
    handleGeneratedInput(key, input) {
      this.$emit("handleGeneratedInput", {
        key: key,
        value: input
      });
    },
    copyToClipboard() {
      // Get the text
      const copyText = document.getElementById("generated_password");

      // Select the text field
      copyText.select();
      copyText.setSelectionRange(0, 99999); // For mobile devices

      if(copyText.value){
        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);

        //Emit password
        this.handleGeneratedInput(this.dataKey, this.password);

        // Alert the copied text
        this.$toast(`Generated password: ${copyText.value} was copied to password field!`);
      }
    }
  }
}
</script>

<style scoped>
</style>
