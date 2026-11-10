<template>
  <a-result status="404" title="Page not found" sub-title="The page you opened does not exist.">
    <template #extra>
      <router-link to="/">
        <a-button type="primary">Back to dashboard</a-button>
      </router-link>
    </template>
  </a-result>
</template>
