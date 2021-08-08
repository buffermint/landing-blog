<template>
  <div class="min-vh-90">
    <Search
      v-if="!galleryMode"
      v-model="query"
      :count="results ? results.length : 0"
    />

    <section>
      <div class="container">
        <div class="row" v-if="results && results.length > 0">
          <div
            class="col-12 col-md-6 col-lg-4 d-flex"
            :key="index"
            v-for="(article, index) in results"
          >
            <ArticleCard :article="article"></ArticleCard>
          </div>
        </div>
        <div v-else class="text-muted">No articles found</div>
      </div>
    </section>

    <!-- MORE
      ================================================== -->
    <section
      class="py-7 py-md-10"
      v-if="
        !galleryMode && !query && posts && filteredPosts.length < posts.length
      "
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-9 col-lg-8 col-xl-7">
            <!-- Button -->
            <a
              @click="loadMore"
              class="
                btn btn-block btn-outline-primary
                d-flex
                align-items-center
              "
            >
              <span class="mx-auto">Load more</span>
              <i class="fe fe-arrow-right"></i>
            </a>
          </div>
        </div>
        <!-- / .row -->
      </div>
      <!-- / .container -->
    </section>

    <newsletter :borderBottom="false"></newsletter>
  </div>
</template>

<script>
import Fuse from "fuse.js";
import ArticleCard from "./ArticleCard.vue";
import Search from "./Search.vue";
import Newsletter from "../Newsletter.vue";

export default {
  components: { ArticleCard, Newsletter, Search },
  props: { galleryMode: { default: false }, postCount: { default: null } },
  data() {
    return {
      recentPostCount: 6,
      fuse: null,
      searching: false,
      query: "",
      posts: null,
      filteredPosts: null,
    };
  },
  computed: {
    results() {
      return this.query
        ? this.fuse.search(this.query).map((s) => s.item)
        : this.filteredPosts;
    },
  },
  methods: {
    showInput() {
      this.searching = true;
      this.$nextTick(() => {
        this.$refs.search.focus();
      });
    },
    reset() {
      this.query = "";
      this.searching = false;
    },
    loadMore() {
      let currentCount = this.filteredPosts.length;
      this.filteredPosts.splice(0);
      this.posts
        .slice(0, currentCount + this.recentPostCount)
        .forEach((p) => this.filteredPosts.push(p));

      console.log(currentCount + this.recentPostCount, this.posts);
    },
  },
  created() {
    fetch("/index.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.fuse = new Fuse(data, {
          minMatchCharLength: 4,
          keys: ["title", "snippet", "categories"],
        });

        let newData = JSON.parse(JSON.stringify(data));
        this.posts = newData.sort(function (a, b) {
          return Date.parse(b.date) - Date.parse(a.date);
        });

        let count = this.postCount || this.recentPostCount;
        this.filteredPosts = this.posts.slice(0, count);
      });
  },
};
</script>

<style>
input[name="search"] {
  background-image: url("/assets/img/magnifying-glass.svg");
  background-position: 0.8em;
  background-repeat: no-repeat;
  border-radius: 25px;
  text-indent: 1.2em;
}

input[name="search"].transition-border {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  transition: opacity 0s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
