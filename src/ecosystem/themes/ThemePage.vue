<script setup lang="ts">
import ThemeHero from './ThemeHero.vue'
import ThemeList from './ThemeList.vue'
import ThemeContact from './ThemeContact.vue'
</script>

<template>
  <div class="ThemePage">
    <ThemeHero>
      <template #title>Teman</template>
      <template #lead>Kolla in dessa teman, UI-kit, och tillägg. Du kan se hur en verklig application bygg med Vue av våra partners.</template>
    </ThemeHero>

    <ThemeList />

    <ThemeContact>
      Vill du visa upp dina teman här? <a class="link" href="mailto:evan@vuejs.org?subject=Theme+affiliation">Kontakta oss!</a>
    </ThemeContact>
  </div>
</template>
