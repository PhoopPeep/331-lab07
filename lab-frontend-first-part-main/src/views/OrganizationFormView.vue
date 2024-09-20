<script setup lang="ts">
import type { Organizer } from '@/types';
import { ref } from 'vue';
import OrganizationService from '@/services/OrganizationService';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';

const organizer = ref<Organizer>({
    id: 0,
    title: '',
    location: '',
    organizer: ''
})

const router = useRouter()
const store = useMessageStore()
function saveOrganization() {
    OrganizationService.saveOrganization(organizer.value)
        .then((response) => {
            router.push({ name: 'organization-detail-view', params: { id: response.data.id } })
            store.updateMessage('Successfully added new organization: ' + response.data.title)
            setTimeout(() => {
                store.resetMessage()
            }, 3000)
        })
        .catch(() => {
            router.push({ name: 'network-error-view' })
        })
}
</script>

<template>
    <div class="max-w-2xl mx-auto p-8">
        <h1 class="text-center text-2xl font-bold mb-6 text-gray-800">Create an Organization</h1>
        <form @submit.prevent="saveOrganization" class="flex flex-col space-y-4">
            <div>
                <label class="font-semibold mb-1 block text-gray-600">Title</label>
                <input v-model="organizer.title" type="text" placeholder="Title" class="w-full p-3 border border-gray-300 rounded-md" />
            </div>

            <div>
                <label class="font-semibold mb-1 block text-gray-600">Organization Name</label>
                <input v-model="organizer.organizer" type="text" placeholder="Organization Name" class="w-full p-3 border border-gray-300 rounded-md" />
            </div>

            <div>
                <label class="font-semibold mb-1 block text-gray-600">Location</label>
                <input v-model="organizer.location" type="text" placeholder="Location" class="w-full p-3 border border-gray-300 rounded-md" />
            </div>

            <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-lg font-semibold">Submit</button>
        </form>

        <pre class="bg-gray-800 text-white p-4 mt-6 rounded-md">{{ organizer }}</pre>
    </div>
</template>

<style scoped>
</style>
