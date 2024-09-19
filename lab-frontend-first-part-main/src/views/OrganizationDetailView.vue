<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import OrganizationService from '@/services/OrganizationService';
import type { Organizer } from '@/types';

const organization = ref<Organizer | null>(null);
const route = useRoute();
const router = useRouter();

onMounted(() => {
    const id = parseInt(route.params.id as string);
    OrganizationService.getOrganization(id)
        .then((response) => {
            organization.value = response.data;
        })
        .catch(() => {
            router.push({ name: 'network-error-view' })
        });
});
</script>

<template>
    <div v-if="organization" class="organization-detail-container">
        <h1>{{ organization.title }}</h1>
        <p>{{ organization.organizer }} @ {{ organization.location }}</p>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<style scoped>
.organization-detail-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
}

p {
    font-size: 18px;
    margin-bottom: 10px;
    color: #555;
}
</style>
