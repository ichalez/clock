# World Clock

Una aplicación de reloj mundial elegante y moderna que muestra la hora actual en tres zonas horarias: Madrid, San Francisco y Sídney.

## 🌟 Características

- **Tres zonas horarias**: Madrid (CET/CEST), San Francisco (PST/PDT), y Sídney (AEST/AEDT)
- **Relojes analógicos y digitales**: Visualización dual para cada zona horaria
- **Diseño glassmorphism**: Efectos de vidrio esmerilado con bordes suaves
- **Animaciones fluidas**: Transiciones suaves y efectos de parallax
- **Fondo animado**: Gradiente dinámico que cambia continuamente
- **Totalmente responsive**: Optimizado para móviles, tablets y escritorio
- **Actualizaciones en tiempo real**: Los relojes se actualizan cada segundo

## 🚀 Uso

Simplemente abre `index.html` en tu navegador web favorito. No se requiere instalación ni servidor.

### Opción 1: Abrir directamente
```bash
open index.html
```

### Opción 2: Usar un servidor local
```bash
# Con Python 3
python3 -m http.server 8000

# Con Node.js (npx)
npx serve
```

Luego visita `http://localhost:8000` en tu navegador.

## 🐳 Despliegue con Docker

### Opción 1: Docker Compose (Recomendado)
```bash
# Construir y ejecutar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

La aplicación estará disponible en `http://localhost:3001`

### Opción 2: Docker directo
```bash
# Construir la imagen
docker build -t world-clock .

# Ejecutar el contenedor
docker run -d -p 3001:80 --name world-clock world-clock

# Ver logs
docker logs -f world-clock

# Detener y eliminar
docker stop world-clock && docker rm world-clock
```

### 🚀 Despliegue en Coolify

1. **Conecta tu repositorio de GitHub**
   - En Coolify, crea un nuevo proyecto
   - Selecciona "Git Repository"
   - Conecta: `https://github.com/ichalez/clock`

2. **Configuración del proyecto**
   - **Build Pack**: Dockerfile
   - **Port**: 80
   - **Publish Directory**: (dejar vacío, usa Dockerfile)

3. **Variables de entorno** (opcional)
   - `TZ=Europe/Madrid`

4. **Despliega**
   - Coolify detectará automáticamente el Dockerfile
   - Construirá la imagen y desplegará el contenedor
   - La aplicación estará disponible en tu dominio configurado

### Características del contenedor Docker
- ✅ Imagen ligera basada en `nginx:alpine` (~23MB)
- ✅ Compresión gzip habilitada
- ✅ Cache de assets estáticos
- ✅ Headers de seguridad configurados
- ✅ Auto-restart en caso de fallo
- ✅ Optimizado para producción


## 🎨 Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con variables CSS, glassmorphism y animaciones
- **JavaScript (Vanilla)**: Lógica de reloj y manejo de zonas horarias
- **Google Fonts**: Tipografía Inter para un aspecto premium

## 📱 Responsive

La aplicación está optimizada para:
- 📱 Móviles (< 480px)
- 📱 Tablets (480px - 768px)
- 💻 Escritorio (> 768px)

## 🌍 Zonas Horarias

- **Madrid**: Europe/Madrid (CET/CEST)
- **San Francisco**: America/Los_Angeles (PST/PDT)
- **Sídney**: Australia/Sydney (AEST/AEDT)

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Siéntete libre de abrir issues o pull requests.

---

Hecho con ❤️ usando JavaScript vanilla
