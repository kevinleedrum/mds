<template>
  <section class="component-readme">
    <Content :page-key="$site.pages.find(p => p.path === `/components/${component}/`).key" />
  </section>
</template>

<script>
export default {
  name: 'ComponentReadme',
  props: {
    component: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.component-readme h1,
.component-readme h2:first-of-type {
  display: none; /* Hide the element heading that Stencil adds to its readme files. */
}
</style>
