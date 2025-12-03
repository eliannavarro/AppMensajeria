<template>
  <div class="profile-container">
    <!-- Encabezado con título decorativo -->
    <header class="profile-header">
      <div class="header-content">
        <h1><i class="fas fa-user-circle"></i> Mi Perfil</h1>
        <p class="header-subtitle">Administra tu información personal</p>
      </div>
    </header>

    <!-- Tarjeta principal del perfil -->
    <main class="profile-main">
      <div v-if="user" class="profile-card">
        <!-- Encabezado de la tarjeta con avatar -->
        <div class="card-header">
          <div class="avatar-container">
            <!-- Avatar con color existente si está disponible, o color por defecto -->
            <div class="avatar" :style="{ backgroundColor: user.avatarColor || defaultAvatarColor }">
              {{ userInitials }}
            </div>
            <div class="avatar-status" :class="user.role.toLowerCase()"></div>
          </div>
          <div class="user-info-header">
            <h2>{{ user.name }}</h2>
            <div class="role-badge" :class="user.role.toLowerCase()">
              <i :class="roleIcon"></i> {{ user.role }}
            </div>
          </div>
        </div>

        <!-- Detalles del usuario -->
        <div class="card-body">
          <div class="info-section">
            <h3><i class="fas fa-id-card"></i> Información Personal</h3>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">
                  <i class="fas fa-user"></i> Nombre completo
                </div>
                <div class="info-value">{{ user.name }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <i class="fas fa-envelope"></i> Correo electrónico
                </div>
                <div class="info-value">{{ user.email }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <i class="fas fa-user-tag"></i> Rol de usuario
                </div>
                <div class="info-value">
                  <span class="role-tag" :class="user.role.toLowerCase()">
                    {{ user.role }}
                  </span>
                </div>
              </div>
              
            </div>
          </div>

          

         
        </div>
      </div>

      <!-- Estado cuando no hay usuario -->
      <div v-else class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-user-slash"></i>
        </div>
        <h2>Usuario no encontrado</h2>
        <p>No se encontró información del usuario en el sistema.</p>
        <div class="empty-actions">
          <button class="btn btn-primary">
            <i class="fas fa-sign-in-alt"></i> Iniciar sesión
          </button>
          <button class="btn btn-outline">
            <i class="fas fa-home"></i> Volver al inicio
          </button>
        </div>
      </div>
    </main>

    <!-- Información adicional -->
    <footer class="profile-footer">
      <p>
        <i class="fas fa-info-circle"></i> Si necesitas actualizar tu
        información, por favor contacta con el administrador del sistema.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const user = ref(null);
const defaultAvatarColor = "#4a6fa5"; // Color por defecto

// Propiedades computadas
const userInitials = computed(() => {
  if (!user.value) return "";
  return user.value.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
});

const roleIcon = computed(() => {
  if (!user.value) return "fas fa-user";
  const role = user.value.role.toLowerCase();
  if (role.includes("admin")) return "fas fa-crown";
  if (role.includes("user")) return "fas fa-user";
  if (role.includes("manager")) return "fas fa-user-tie";
  return "fas fa-user";
});

const formattedDate = computed(() => {
  const today = new Date();
  return today.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Función para editar perfil
const editProfile = () => {
  // Aquí puedes implementar la lógica para editar el perfil
  alert('Funcionalidad de editar perfil - Implementar según necesidades');
};

// Función para cambiar el color del avatar
const changeAvatarColor = () => {
  if (!user.value) return;
  
  // Generar un color aleatorio (esto es solo un ejemplo)
  const colors = [
    "#4a6fa5", // Azul principal
    "#166088", // Azul oscuro
    "#6a994e", // Verde
    "#bc4749", // Rojo
    "#b5838d", // Rosa
    "#6d597a", // Púrpura
    "#2a9d8f", // Turquesa
    "#e9c46a"  // Amarillo
  ];
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  // Actualizar el color del avatar en el objeto usuario
  user.value.avatarColor = randomColor;
  
  // Guardar en localStorage
  localStorage.setItem("user", JSON.stringify(user.value));
  
  alert(`Color de avatar cambiado a: ${randomColor}`);
};

onMounted(() => {
  // Intentar obtener usuario de localStorage
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser);
      
      // Si el usuario no tiene avatarColor, asignar uno por defecto
      if (!user.value.avatarColor) {
        user.value.avatarColor = defaultAvatarColor;
        // Guardar el color por defecto en localStorage
        localStorage.setItem("user", JSON.stringify(user.value));
      }
    } catch (e) {
      console.error("Error al cargar el usuario:", e);
    }
  } else {
    // Para propósitos de demostración, si no hay usuario en localStorage
    // se muestra uno de ejemplo CON color de avatar incluido
    user.value = {
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@ejemplo.com",
      role: "Administrador",
      avatarColor: "#4a6fa5" // Color específico para el ejemplo
    };
    
    // Guardar el usuario de ejemplo en localStorage
    localStorage.setItem("user", JSON.stringify(user.value));
  }
});
</script>

<style scoped>
/* Estilos generales */
.profile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Encabezado */
.profile-header {
  text-align: center;
  margin-bottom: 40px;
}

.header-content h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.header-content h1 i {
  color: #4a6fa5;
}

.header-subtitle {
  color: #7f8c8d;
  font-size: 1.1rem;
}

/* Tarjeta de perfil principal */
.profile-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  max-width: 900px;
  margin: 0 auto 30px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

/* Encabezado de tarjeta */
.card-header {
  background: linear-gradient(135deg, #4a6fa5 0%, #166088 100%);
  color: white;
  padding: 40px;
  display: flex;
  align-items: center;
  gap: 25px;
}

.avatar-container {
  position: relative;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  border: 5px solid rgba(255, 255, 255, 0.3);
}

.avatar-status {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 3px solid white;
}

.avatar-status.administrador {
  background-color: #2ecc71;
}

.avatar-status.usuario {
  background-color: #3498db;
}

.user-info-header h2 {
  font-size: 2.2rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
}

.role-badge.administrador {
  background-color: rgba(46, 204, 113, 0.2);
  color: #27ae60;
}

.role-badge.usuario {
  background-color: rgba(52, 152, 219, 0.2);
  color: #2980b9;
}

.role-badge i {
  font-size: 0.9rem;
}

/* Cuerpo de la tarjeta */
.card-body {
  padding: 40px;
}

.info-section, .stats-section, .actions-section {
  margin-bottom: 40px;
}

.info-section h3, .stats-section h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-section h3 i, .stats-section h3 i {
  color: #4a6fa5;
}

/* Grid de información */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.info-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #4a6fa5;
  transition: background-color 0.3s ease;
}

.info-item:hover {
  background: #edf2f7;
}

.info-label {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-value {
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Vista previa del color */
.color-preview {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid #ddd;
  display: inline-block;
}

.role-tag {
  display: inline-block;
  padding: 6px 15px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
}

.role-tag.administrador {
  background-color: #e8f6ef;
  color: #27ae60;
}

.role-tag.usuario {
  background-color: #ebf5fb;
  color: #2980b9;
}

/* Estadísticas */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #eef1f5;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, #4a6fa5, #166088);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1;
}

.stat-label {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-top: 5px;
}

/* Botones de acción */
.actions-section {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #4a6fa5, #166088);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #166088, #4a6fa5);
  box-shadow: 0 8px 20px rgba(74, 111, 165, 0.3);
}

.btn-secondary {
  background: #f8f9fa;
  color: #2c3e50;
  border: 2px solid #e0e6ed;
}

.btn-secondary:hover {
  background: #e9ecef;
  border-color: #4a6fa5;
}

.btn-outline {
  background: transparent;
  color: #4a6fa5;
  border: 2px solid #4a6fa5;
}

.btn-outline:hover {
  background: rgba(74, 111, 165, 0.1);
}

/* Estado vacío */
.empty-state {
  text-align: center;
  padding: 80px 40px;
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.empty-icon {
  font-size: 5rem;
  color: #bdc3c7;
  margin-bottom: 30px;
}

.empty-state h2 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 2rem;
}

.empty-state p {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 30px;
}

.empty-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Pie de página */
.profile-footer {
  text-align: center;
  padding: 30px;
  color: #7f8c8d;
  font-size: 0.95rem;
  max-width: 900px;
  margin: 0 auto;
}

.profile-footer i {
  color: #4a6fa5;
  margin-right: 8px;
}

/* Responsive */
@media (max-width: 768px) {
  .profile-container {
    padding: 15px;
  }
  
  .header-content h1 {
    font-size: 2rem;
    flex-direction: column;
    gap: 10px;
  }
  
  .card-header {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
    gap: 20px;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    font-size: 2rem;
  }
  
  .user-info-header h2 {
    font-size: 1.8rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .actions-section {
    justify-content: center;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>