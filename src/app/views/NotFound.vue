<template>
  <a-row type="flex" justify="center" align="middle" id="not-found">
    <a-col :span="8">
      <div class="text-center">
        <h2>Something is Wrong</h2>
        <h1>404</h1>
        <p>
          The link you followed probably broken, or the page has been removed
        </p>
        <router-link :to="{ name: 'home' }">
          <a-button>Return to Home</a-button>
        </router-link>
      </div>
    </a-col>
  </a-row>
</template>
