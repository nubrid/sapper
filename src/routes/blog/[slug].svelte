<script context="module">
export async function preload({ params }) {
  // the `slug` parameter is available because this file is called [slug].svelte
  // eslint-disable-next-line immutable/no-this
  const response = await this.fetch(`blog/${params.slug}.json`)
  const data = await response.json()

  return response.status === 200
    ? { post: data }
    : this.error(response.status, data.message) // eslint-disable-line immutable/no-this
}
</script>

<script>
/* eslint-disable immutable/no-let */
export let post
/* eslint-enable immutable/no-let */
</script>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<template>
  <h1>{post.title}</h1>

  <div class="content">
    {@html post.html}
  </div>
</template>

<style>
/*
  By default, CSS is locally scoped to the component, and any unused styles are dead-code-eliminated. In this page, Svelte can't know which elements are going to appear inside the {{{post.html}}} block, so we have to use the :global(...) modifier to target all elements inside .content
*/
.content :global(h2) {
  font-size: 1.4em;
  font-weight: 500;
}

.content :global(pre) {
  background-color: #f9f9f9;
  box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
  padding: 0.5em;
  border-radius: 2px;
  overflow-x: auto;
}

.content :global(pre) :global(code) {
  background-color: transparent;
  padding: 0;
}

.content :global(ul) {
  line-height: 1.5;
}

.content :global(li) {
  margin: 0 0 0.5em 0;
}
</style>
