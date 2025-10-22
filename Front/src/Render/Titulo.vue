<!-- eslint-disable vue/multi-word-component-names -->
<template>
    
        <h1
          :id="dados[$cms('id')]" v-html="dados[$cms('content')]"
        >
        </h1>
      
  </template>
  <script setup>
  import { $cms } from '@/helpers/cmsProviderHelper';
  const props = defineProps(['dados'])
  </script>
  