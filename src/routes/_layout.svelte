<script>
// eslint-disable-next-line no-unused-vars
import TailwindCSS from "../components/tailwindcss.svelte"
import Nav from "../components/nav.svelte"

/* eslint-disable immutable/no-let */
export let segment
/* eslint-enable immutable/no-let */
</script>

<template>
  <Nav {segment} />

  <main>
    <slot />
  </main>
</template>

<style lang="scss">
main {
  position: relative;
  max-width: 56em;
  background-color: white;
  padding: 2em;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
