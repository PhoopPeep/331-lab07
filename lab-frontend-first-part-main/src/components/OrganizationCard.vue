<script setup lang="ts">
import { type Organizer } from '@/types';

defineProps<{
  organization: Organizer;
}>();
</script>

<template>
  <RouterLink :to="{ name: 'organization-detail-view', params: { id: organization.id } }">
    <div class="organization-card">
      <h2>{{ organization.title }}</h2>
      <span>{{ organization.organizer }} @ {{ organization.location }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.organization-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.organization-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

h2 {
  font-size: 20px;
  padding: 8px;
}

.organization-link {
  text-decoration: none;
  color: #2c3e50;
}
</style>
