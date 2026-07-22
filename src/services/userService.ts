import { api } from '@/lib/api';

export async function saveProfile(data: { weight: number; height: number; targetDietDaily: number }) {
  const response = await api.post('/users/profile', data);
  return response.data;
}

export async function getProfile() {
  const response = await api.get('/users/profile');
  return response.data;
}