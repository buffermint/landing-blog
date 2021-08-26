<template>
  <section class="py-6">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <!-- Form -->
          <div class="input-group input-group-lg">
            <!-- Prepend -->
            <div class="input-group-prepend">
              <span class="input-group-text border-0 pr-1">
                <i class="fe fe-search"></i>
              </span>
            </div>

            <!-- Input -->
            <input
              id="search"
              v-model="query"
              type="text"
              class="form-control border-0 px-1"
              aria-label="Search our blog..."
              placeholder="Search our blog..."
              @input="handleInput"
            />

            <!-- Append -->
            <div class="input-group-append" v-if="query !== ''">
              <span class="input-group-text border-0 py-0 pl-1 pr-3">
                <!-- Text -->
                <span
                  class="
                    h6
                    text-uppercase text-muted
                    d-none d-md-block
                    mb-0
                    mr-5
                  "
                >
                  {{ count }} RESULTS
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- / .row -->
    </div>
  </section>
</template>

<script>
export default {
  props: ["value", "count"],
  data() {
    return {
      query: this.value,
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", this.query);
    },
    submitForm() {},
  },
};
</script>
