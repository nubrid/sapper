<script>
// eslint-disable-next-line no-unused-vars
import TailwindCSS from "../components/tailwindcss.svelte"

/* eslint-disable immutable/no-let */
export let status
export let error
/* eslint-enable immutable/no-let */

const dev = process.env.NODE_ENV === "development"
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<template>
  <h1>{status}</h1>

  <p>{error.message}</p>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</template>

<style lang="scss">
h1,
p {
  margin: 0 auto;
}

h1 {
  font-size: 2.8em;
  font-weight: 700;
  margin: 0 0 0.5em 0;
}

p {
  margin: 1em auto;
}

@media (min-width: 480px) {
  h1 {
    font-size: 4em;
  }
}
</style>
