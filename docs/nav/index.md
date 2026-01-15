---
layoutClass: m-nav-layout
outline: [2, 3, 4]
---

<script setup>
import { NAV_DATA } from './data'
</script>
<style src="./index.scss"></style>

# 常用网站

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

<br />

<!-- ::: tip
Themes by [maomao](https://github.com/maomao1996)
::: -->
