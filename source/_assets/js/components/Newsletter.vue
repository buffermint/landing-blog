<template>
  <section
    class="py-6 position-relative"
    :style="isInsidePost ? 'margin-left: -100%; margin-right: -100%' : ''"
  >
    <div :class="newsletterClass">
      <div v-if="msg" class="py-5 text-center">{{ msg }}</div>

      <div class="row align-items-center" v-else>
        <div class="col-12 col-md text-left">
          <!-- Heading -->
          <h3
            class="mb-1 fw-bold font-size-lg mt-0 text-black font-weight-normal"
          >
            Get our articles delivered
          </h3>

          <!-- Text -->
          <p class="fs-lg text-muted mb-6 mb-md-0 font-size-md">
            From us to your inbox weekly.
          </p>
        </div>
        <div class="col-12 col-md-6">
          <!-- Form -->
          <form @submit.prevent="submit">
            <div class="row">
              <div class="col">
                <!-- Input -->
                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter your email"
                  required
                  v-model="email"
                />
              </div>
              <div class="col-auto ms-n5">
                <!-- Button -->
                <button class="btn btn-primary" type="submit">
                  <span
                    v-if="loading"
                    class="spinner-border text-white mx-6"
                    role="status"
                    style="width: 1.5rem; height: 1.5rem"
                  >
                    <span class="visually-hidden"></span>
                  </span>
                  <span v-else>Subscribe</span>
                </button>
              </div>
            </div>
            <!-- / .row -->
          </form>
        </div>
      </div>
      <!-- / .row -->
    </div>
    <!-- / .container -->
  </section>
</template>

<script>
export default {
  props: { borderTop: { default: true }, borderBottom: { default: true } },
  data() {
    return { msg: null, email: "", isInsidePost: false, loading: false };
  },
  computed: {
    newsletterClass() {
      let c = "container py-6 py-md-8 border-gray-300";
      if (this.borderTop) c += " border-top";
      if (this.borderBottom) c += " border-bottom";
      return c;
    },
  },
  mounted() {
    this.isInsidePost = this.hasSomeParentTheID(this.$el, "post-content");
  },
  methods: {
    hasSomeParentTheID(element, id) {
      if (element.id == id) return true;
      return (
        element.parentNode && this.hasSomeParentTheID(element.parentNode, id)
      );
    },
    submit() {
      this.loading = true;
      let iframe = $(".hbspt-form iframe")[0];
      let formID = "27b9a8e8-95e1-42ec-ae6b-c6430abba972";
      let frm = iframe.contentWindow.document.querySelector(
        "form[data-form-id='" + formID + "']"
      );
      let data = new FormData(frm);
      data.append("email", this.email);
      let that = this;
      $.ajax({
        type: frm.getAttribute("method"),
        url: frm.getAttribute("action"),
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function (data) {
          that.loading = false;
          that.email = "";
          that.msg = "Thanks for subscribing.";
        },
        error: function (data) {
          that.loading = false;
          that.email = "";
          alert("Issue while submitting your newsletter.");
        },
      });
    },
  },
};
</script>
