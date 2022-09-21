<script>
import "tailwindcss/tailwind.css"
import Nav from "../components/nav.svelte"

/* eslint-disable immutable/no-let */
export let segment
/* eslint-enable immutable/no-let */

const dev = process.env.NODE_ENV === "development"
const scriptSrc = dev
  ? `'self' 'unsafe-eval' localhost:* http://localhost:*`
  : `'self' *.${process.env.HOST}:* https://*.${process.env.HOST}:*`
const connectSrc = dev
  ? `ws://localhost:* http://localhost:*`
  : `wss://*.${process.env.HOST}:* https://*.${process.env.HOST}:*`
</script>

<svelte:head>
  <meta
    http-equiv="Content-Security-Policy"
    content="default-src 'self' gap: https://ssl.gstatic.com; script-src {scriptSrc}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com:*; img-src 'self' data:; media-src *; font-src https://fonts.gstatic.com:*; connect-src {connectSrc}; child-src *"
  />
</svelte:head>

<template>
  <Nav {segment} />

  <main>
    <slot />
  </main>
</template>

<style>
main {
  position: relative;
  max-width: 56em;
  background-color: white;
  padding: 2em;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
