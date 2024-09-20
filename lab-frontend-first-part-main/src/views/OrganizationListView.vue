<script setup lang="ts">
import { ref, onMounted } from 'vue';
import OrganizationService from '@/services/OrganizationService';
import { type Organizer } from '@/types';
import { useRouter } from 'vue-router';
import OrganizationCard from '@/components/OrganizationCard.vue';

const organizations = ref<Organizer[] | null>(null);
const router = useRouter();

onMounted(() => {
    OrganizationService.getOrganizations()
        .then((response) => {
            organizations.value = response.data;
        })
        .catch(() => {
            router.push({ name: 'network-error-view' });
        });
});
</script>

<template>
  <div class="max-w-3xl mx-auto p-8">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Organizations</h1>
    <div class="flex flex-col items-center space-y-4">
      <OrganizationCard v-for="organization in organizations" :key="organization.id" :organization="organization" />
    </div>
  </div>
</template>

<style scoped>
</style>
