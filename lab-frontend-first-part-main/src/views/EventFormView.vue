<script setup lang="ts">
import type { Event } from '@/types';
import { ref } from 'vue';
import EventService from '@/services/EventService';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';

const event = ref<Event>({
    id: 0,
    category: '',
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    petsAllowed: false,
    organizer: ''
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
    <div class="form-container">
        <h1>Create an Event</h1>
        <form @submit.prevent="saveEvent" class="event-form">
            <div class="form-group">
                <label>Category</label>
                <input v-model="event.category" type="text" placeholder="Category" class="field" />
            </div>

            <h3>Name & Describe Your Event</h3>
            <div class="form-group">
                <label>Title</label>
                <input v-model="event.title" type="text" placeholder="Title" class="field" />
            </div>

            <div class="form-group">
                <label>Description</label>
                <textarea v-model="event.description" placeholder="Description" class="field"></textarea>
            </div>

            <h3>Where is Your Event?</h3>
            <div class="form-group">
                <label>Location</label>
                <input v-model="event.location" type="text" placeholder="Location" class="field" />
            </div>

            <button class="button" type="submit">Submit</button>
        </form>

        <pre>{{ event }}</pre>
    </div>
</template>

<style scoped>
.form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
}

h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #555;
}

.event-form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-weight: 600;
    margin-bottom: 5px;
    display: block;
    color: #555;
}

.field {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.field:focus {
    border-color: #007BFF;
    outline: none;
}

textarea.field {
    resize: vertical;
    min-height: 100px;
}

.button {
    background-color: #007BFF;
    color: #fff;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
    margin-top: 20px;
}

.button:hover {
    background-color: #0056b3;
}

pre {
    background: #333;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    margin-top: 20px;
    overflow-x: auto;
    max-width: 100%;
}
</style>
