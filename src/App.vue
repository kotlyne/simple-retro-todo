<script setup lang="ts">
import { useI18n } from 'vue-i18n';


const { locale } = useI18n({ useScope: 'global' })

</script>

<template>
  <main>
    <select v-model="locale">
      <option value="en">en</option>
      <option value="cn">cn</option>
    </select>
    <h1>{{ $t("msg.hello") }}</h1>
  </main>
</template>

<style scoped>
</style>
