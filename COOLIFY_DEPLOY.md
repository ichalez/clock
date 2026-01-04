# Guía de Despliegue en Coolify

Esta guía te ayudará a desplegar la aplicación World Clock en tu servidor Coolify local.

## 📋 Requisitos Previos

- Servidor Coolify configurado y funcionando
- Acceso al panel de administración de Coolify
- Repositorio GitHub: `https://github.com/ichalez/clock`

## 🚀 Pasos para Desplegar en Coolify

### 1. Crear un Nuevo Proyecto

1. Accede a tu panel de Coolify
2. Haz clic en **"New Project"** o **"Add Resource"**
3. Selecciona **"Git Repository"**

### 2. Configurar el Repositorio

**URL del repositorio:**
```
https://github.com/ichalez/clock
```

**Configuración:**
- **Branch**: `main`
- **Build Pack**: `Dockerfile` (Coolify lo detectará automáticamente)
- **Port**: `80` (el puerto interno del contenedor nginx)

### 3. Variables de Entorno (Opcional)

Puedes añadir estas variables si lo deseas:

```env
TZ=Europe/Madrid
```

### 4. Configuración de Red

- **Publish Port**: Coolify asignará automáticamente un puerto o puedes configurar un dominio
- **Domain**: Configura tu dominio personalizado si lo tienes (ej: `clock.tudominio.com`)

### 5. Desplegar

1. Haz clic en **"Deploy"** o **"Start Deployment"**
2. Coolify:
   - Clonará el repositorio
   - Detectará el `Dockerfile`
   - Construirá la imagen Docker
   - Iniciará el contenedor
   - Expondrá la aplicación en el puerto/dominio configurado

### 6. Verificar el Despliegue

Una vez completado el despliegue:

1. Accede a la URL proporcionada por Coolify
2. Deberías ver la aplicación World Clock funcionando
3. Verifica que los tres relojes se actualizan en tiempo real

## 🔄 Actualizaciones Automáticas

Coolify puede configurarse para:

- **Auto-deploy on push**: Redesplegar automáticamente cuando hagas push a GitHub
- **Webhook**: Configurar un webhook de GitHub para despliegues automáticos

### Configurar Auto-Deploy

1. En la configuración del proyecto en Coolify
2. Activa **"Auto Deploy"**
3. Copia el webhook URL
4. En GitHub (`https://github.com/ichalez/clock/settings/hooks`):
   - Añade un nuevo webhook
   - Pega la URL del webhook de Coolify
   - Selecciona eventos: `push`
   - Guarda

Ahora cada vez que hagas `git push`, Coolify desplegará automáticamente la nueva versión.

## 🐳 Detalles Técnicos del Contenedor

### Imagen Base
- **nginx:alpine** - Imagen ligera (~23MB)
- Servidor web nginx optimizado para producción

### Características
- ✅ Compresión gzip habilitada
- ✅ Cache de assets estáticos (1 año)
- ✅ Headers de seguridad (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- ✅ Auto-restart en caso de fallo
- ✅ Optimizado para bajo uso de recursos

### Puertos
- **Puerto interno**: 80 (nginx)
- **Puerto externo**: Configurado por Coolify (por defecto asignado automáticamente)

## 🔧 Comandos Útiles

Si necesitas acceder al servidor donde corre Coolify:

```bash
# Ver contenedores en ejecución
docker ps | grep clock

# Ver logs del contenedor
docker logs -f <container-id>

# Reiniciar el contenedor
docker restart <container-id>

# Ver uso de recursos
docker stats <container-id>
```

## 📊 Monitoreo

Coolify proporciona:
- Estado del contenedor (running/stopped)
- Logs en tiempo real
- Uso de CPU y memoria
- Historial de despliegues

## 🆘 Solución de Problemas

### El contenedor no inicia

1. Revisa los logs en Coolify
2. Verifica que el puerto 80 esté configurado correctamente
3. Asegúrate de que el Dockerfile está en la raíz del repositorio

### La aplicación no se ve correctamente

1. Verifica que todos los archivos (index.html, style.css, script.js) están en el repositorio
2. Revisa los logs del navegador (F12 → Console)
3. Verifica que nginx está sirviendo los archivos correctamente

### Problemas con el dominio

1. Verifica la configuración DNS
2. Asegúrate de que el dominio apunta a tu servidor Coolify
3. Revisa la configuración SSL/TLS si usas HTTPS

## 🎯 Resultado Esperado

Una vez desplegado correctamente, deberías tener:

- ✅ Aplicación accesible vía web
- ✅ Tres relojes mostrando Madrid, San Francisco y Sídney
- ✅ Actualizaciones en tiempo real cada segundo
- ✅ Diseño responsive funcionando en todos los dispositivos
- ✅ Efectos visuales (glassmorphism, gradientes) funcionando correctamente

## 📝 Notas Adicionales

- **Recursos**: El contenedor usa muy pocos recursos (~10-20MB RAM)
- **Escalabilidad**: Puedes ejecutar múltiples instancias si es necesario
- **Backup**: El código está en GitHub, fácil de redesplegar
- **Mantenimiento**: Sin dependencias externas, muy bajo mantenimiento

---

¡Listo! Tu aplicación World Clock debería estar funcionando en Coolify. 🎉
