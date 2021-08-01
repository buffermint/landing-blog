<template>
  <section
    class="py-6 position-relative"
    style="margin-left: -100%; margin-right: -100%"
  >
    <div
      class="container py-6 py-md-8 border-top border-bottom border-gray-300"
    >
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
        <div class="col-12 col-md-5">
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
                <button class="btn btn-primary" type="submit">Subscribe</button>
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
  data() {
    return { msg: null, email: "" };
  },
  methods: {
    submit() {
      fetch(
        "https://forms-eu1.hsforms.com/emailcheck/v1/json-ext?portalId=24917138&includeFreemailSuggestions=true",
        {
          headers: {
            accept: "application/json, text/javascript",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "sec-ch-ua":
              '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
          },
          referrerPolicy: "strict-origin-when-cross-origin",
          body: this.email,
          method: "POST",
          mode: "cors",
          credentials: "omit",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.email = "";
          this.msg = "Thanks for subscribing.";
        });
    },
    submitOld() {
      let url =
        "https://api.hsforms.com/submissions/v3/integration/submit/24917138/27b9a8e8-95e1-42ec-ae6b-c6430abba972";

      let data = {
        fields: [
          {
            name: "email",
            value: this.email,
          },
        ],
        legalConsentOptions: {
          consent: {
            // Include this object when GDPR options are enabled
            consentToProcess: true,
            text: "I agree to allow BufferMint to store and process my personal data.",
            communications: [
              {
                value: true,
                subscriptionTypeId: 999,
                text: "I agree to receive marketing communications from BufferMint.",
              },
            ],
          },
        },
      };

      fetch(url, {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.email = "";
          this.msg = "Thanks for subscribing.";
        });
    },
  },
};
</script>
