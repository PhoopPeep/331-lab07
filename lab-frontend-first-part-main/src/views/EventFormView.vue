<script setup lang="ts">
import type { Event } from '@/types';
import { ref } from 'vue';
import EventService from '@/services/EventService';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
import BaseInput from '@/components/BaseInput.vue';

const event = ref<Event>({
    id: 0,
    category: '',
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    petsAllowed: false,
    organizer: {
        id: 0,
        name: ''
    }
})

const router = useRouter()
const store = useMessageStore()
function saveEvent() {
    EventService.saveEvent(event.value)
        .then((response) => {
            router.push({ name: 'event-detail-view', params: { id: response.data.id } })
            store.updateMessage('You are successfully add a new event for ' + response.data.title)
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
    <div class="max-w-xl mx-auto p-8">
        <h1 class="text-center text-2xl font-bold mb-6 text-gray-800">Create an Event</h1>
        <form @submit.prevent="saveEvent" class="space-y-4">
            <div class="space-y-2">
                <BaseInput v-model="event.category" type="text" label="Category" class="w-full p-3 border border-gray-300 rounded-md" />
            </div>

            <h3 class="text-lg font-semibold text-gray-700 mt-4">Name & Describe Your Event</h3>
            <div class="space-y-2">
                <BaseInput v-model="event.title" type="text" label="Title" class="w-full p-3 border border-gray-300 rounded-md" />
            </div>

            <div class="space-y-2">
                <BaseInput v-model="event.description" type="text" label="Description" class="w-full p-3 border border-gray-300 rounded-md min-h-[100px]" />
            </div>

            <h3 class="text-lg font-semibold text-gray-700 mt-4">Where is Your Event?</h3>
            <div class="space-y-2">
                <BaseInput v-model="event.location" type="text" label="Location" class="w-full p-3 border border-gray-300 rounded-md" />
            </div>

            <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-lg font-semibold mt-6">
                Submit
            </button>
        </form>

        <pre class="bg-gray-800 text-white p-4 rounded-md mt-6">{{ event }}</pre>
    </div>
</template>
