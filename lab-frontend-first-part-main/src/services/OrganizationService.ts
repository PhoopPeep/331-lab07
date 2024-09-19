import axios from 'axios';
import type { Organizer } from '@/types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getOrganizations() {
    return apiClient.get('/organizers');
  },
  getOrganization(id: number) {
    return apiClient.get('/organizers/' + id);
  },
  saveOrganization(organizer: Organizer) {
    return apiClient.post('/organizers', organizer);
  }
};
