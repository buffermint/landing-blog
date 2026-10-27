<template>
  <!-- Card -->
  <div class="card mb-6 shadow-light-lg article-card">
    <!-- Image -->
    <a class="card-img-top" :href="article.link">
      <!-- Image: the WebP copy where there is one, the original as the fallback -->
      <picture>
        <source v-if="article.webp" type="image/webp" :srcset="'/'+article.webp" />
        <img :src="'/'+article.image" :alt="article.title" class="card-img-top" loading="lazy" decoding="async" />
      </picture>
    </a>

    <!-- Body -->
    <a class="card-body" :href="article.link">
      <!-- Heading -->
      <h3>{{ article.title }}</h3>

      <!-- Text -->
      <!-- <p class="mb-0 text-muted">
                  {{ article.excerpt }}
                </p> -->
    </a>

    <!-- Meta -->
    <a class="card-meta mt-auto" href="#!">
      <!-- Divider -->
      <hr class="card-meta-divider" />

      <!-- Author -->
      <p class="h6 text-uppercase text-muted mr-2 mb-0">{{ article.author }}</p>

      <!-- Date -->
      <p class="h6 text-uppercase text-muted mb-0 ml-auto">
        <time :datetime="article.iso_date">{{ article.date }}</time>
      </p>
    </a>
  </div>
</template>

<script>
export default {
  props: ["article"],
};
</script>

<style lang="scss">
.article-card img.card-img-top {
  height: 200px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: unset;
  }
}
</style>