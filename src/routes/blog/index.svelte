<script context="module">
export async function preload() {
  // eslint-disable-next-line immutable/no-this
  const response = await this.fetch("blog.json")
  return { posts: await response.json() }
}
</script>

<script>
/* eslint-disable immutable/no-let */
export let posts
/* eslint-enable immutable/no-let */
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<template>
  <h1>Recent posts</h1>

  <ul>
    {#each posts as post}
      <!-- we're using the non-standard `rel=prefetch` attribute to tell Sapper to load the data for the page as soon as the user hovers over the link or taps it, instead of waiting for the 'click' event -->
      <li><a rel="prefetch" href="blog/{post.slug}">{post.title}</a></li>
    {/each}
  </ul>
</template>

<style lang="scss">
ul {
  margin: 0 0 1em 0;
  line-height: 1.5;
}
</style>
