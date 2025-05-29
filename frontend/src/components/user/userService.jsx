import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export async function fetchUsers(token) {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function createUser(user, token) {
  const res = await axios.post(API_URL, user, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function updateUser(id, user, token) {
  const res = await axios.put(`${API_URL}/${id}`, user, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function deleteUser(id, token) {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
