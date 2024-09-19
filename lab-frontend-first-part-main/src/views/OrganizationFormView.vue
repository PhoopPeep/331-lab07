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
    <div class="form-container">
        <h1>Create an Organization</h1>
        <form @submit.prevent="saveOrganization" class="organization-form">
            <div class="form-group">
                <label>Title</label>
                <input v-model="organizer.title" type="text" placeholder="Title" class="field" />
            </div>
            <div class="form-group">
                <label>Organization Name</label>
                <input v-model="organizer.organizer" type="text" placeholder="Organization Name" class="field" />
            </div>

            <div class="form-group">
                <label>Location</label>
                <input v-model="organizer.location" type="text" placeholder="Location" class="field" />
            </div>

            <button class="button" type="submit">Submit</button>
        </form>

        <pre>{{ organizer }}</pre>
    </div>
</template>

<style scoped>
.form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
}

.organization-form {
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
    font-size: 16px;
}

.button {
    background-color: #007BFF;
    color: #fff;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
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
}
</style>
