<template>
  <div class="container">
    <div class="row">
      <div class="mt-5 d-flex align-items-center justify-content-center">
        <div class="card text-center">
          <div class="card-header">
            <p class="h3 fw-bold">Thanks for reading Hadithi</p>
            <p class="h6">
              Create your free account or sign in to continue reading.
            </p>
          </div>
          <div class="card-body">
            <div class="d-grid gap-2">
              <button
                @click="handleClick('members/sign-up')"
                class="btn btn-primary"
                type="button"
              >
                SignUp
              </button>
              <hr class="hr-text" data-content="OR" />
              <button
                @click="handleClick('members/sign-in')"
                class="btn btn-outline-primary"
                type="button"
              >
                SignIn
              </button>
            </div>
          </div>
          <div class="card-footer">
            <p class="h5 fw-bold">Become a Member</p>
            <p class="h6">
              <button class="btn btn-link" @click="handleClick('pricing')">
                See Subscription Options
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Paywall",
  methods: {
    handleClick(url) {
      this.$router.push(url);
    },
  },
};
</script>
<style scoped>
.hr-text {
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  text-align: center;
  height: 1em;
  opacity: 0.5;
}

.hr-text:before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
}

.hr-text:after {
  content: attr(data-content);
  position: relative;
  display: inline-block;
  color: black;
  padding: 0 0.5em;
  line-height: 1em;
  background-color: #fcfcfa;
}
</style>
