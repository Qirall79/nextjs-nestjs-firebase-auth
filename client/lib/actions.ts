import axios from 'axios';
import { authApi, usersApi } from './axiosApi';
import toast from 'react-hot-toast';

export const createSession = async (idToken: string) => {
  try {
    const response = await authApi.post(
      '',
      {},
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    toast.error('Error creating session');
  }
};

export const createUser = async (firstName: string, lastName: string) => {
  try {
    const response = await usersApi.post('', {
      firstName,
      lastName,
    });
    return response.data;
  } catch (error) {
    toast.error('Error creating user');
  }
};

export const upsertUser = async () => {
  try {
    const response = await usersApi.put('', {});
    return response.data;
  } catch (error) {
    toast.error('Error creating user');
  }
};

export const getSession = async () => {
  try {
    const response = await authApi.get('');
    return response.data;
  } catch (error) {
    toast.error('Error getting session');
  }
};

export const removeSession = async () => {
  try {
    const response = await authApi.delete('');
    return response.data;
  } catch (error) {
    toast.error('Error deleting session');
  }
};
