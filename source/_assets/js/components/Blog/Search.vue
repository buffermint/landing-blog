<template>
  <section class="py-6">
    <div class="container search-container">
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
                  {{ results.length }} RESULTS
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div
          id="search-results"
          v-if="results.length > 0"
          class="search-results col-12"
        >
          <div class="search-result-list shadow-lg rounded-bottom py-3">
            <div :key="index" v-for="(article, index) in results">
              <a
                :href="article.link"
                class="text-decoration-none py-2 px-4 d-block"
              >
                <span>{{ article.title }}</span>
                <small class="float-right text-muted">{{ article.date }}</small>
                <div class="input-group-append" v-if="article.collection">
                  <span class="input-group-text border-0 py-0 pl-1 pr-3">
                    <span
                      class="
                        h6
                        text-uppercase text-muted
                        d-none d-md-block
                        mb-0
                        mr-5
                      "
                    >
                      {{ article.collection }}
                    </span>
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Fuse from "fuse.js";

export default {
  data() {
    return {
      query: "",
    };
  },
  computed: {
    results() {
      return this.query ? this.fuse.search(this.query).map((s) => s.item) : [];
    },
  },
  mounted() {
    $(document).click(function (e) {
      if (!$(e.target).closest("#search-results").length) {
        $("#search-results").fadeToggle(200);
      }
    });

    fetch("/index.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.fuse = new Fuse(data, {
          minMatchCharLength: 4,
          keys: ["title", "snippet", "categories"],
        });
      });
  },
  methods: {
    handleInput(e) {},
    submitForm() {},
  },
};
</script>
