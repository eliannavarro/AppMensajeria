// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  // Obtener el rol del usuario
  const getUserRole = () => {
    return user.value?.role || null
  }

  // Verificar si es admin
  const isAdmin = () => {
    return getUserRole() === 'admin'
  }

  // Verificar si es courier
  const isCourier = () => {
    return getUserRole() === 'courier'
  }

  // Verificar si es user normal
  const isUser = () => {
    return getUserRole() === 'user'
  }

  // Login
  const login = async (userData, userToken) => {
    user.value = userData
    token.value = userToken
    localStorage.setItem('token', userToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // Logout
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // Cargar usuario desde localStorage al iniciar
  const loadUserFromStorage = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
  }

  return {
    user,
    token,
    getUserRole,
    isAdmin,
    isCourier,
    isUser,
    login,
    logout,
    loadUserFromStorage
  }
})