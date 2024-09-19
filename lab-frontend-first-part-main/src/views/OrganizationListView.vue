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
  <div class="organization-list-container">
    <h1>Organizations</h1>
    <div class="flex flex-col items-center">
      <OrganizationCard v-for="organization in organizations" :key="organization.id" :organization="organization" />
    </div>
  </div>
</template>

<style scoped>
.organization-list-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}
</style>
