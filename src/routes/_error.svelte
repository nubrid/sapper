<script>
import "tailwindcss/tailwind.css"

/* eslint-disable immutable/no-let */
export let status
export let error
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
  <title>{status}</title>

  <meta
    http-equiv="Content-Security-Policy"
    content="default-src 'self' gap: https://ssl.gstatic.com; script-src {scriptSrc}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com:*; img-src 'self' data:; media-src *; font-src https://fonts.gstatic.com:*; connect-src {connectSrc}; child-src *"
  />
</svelte:head>

<template>
  <h1>{status}</h1>

  <p>{error.message}</p>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</template>

<style>
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
