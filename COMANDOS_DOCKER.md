# 📦 Guía Rápida de Comandos Docker y Docker Compose

Este documento recopila los comandos más comunes para construir, ejecutar, depurar y administrar los contenedores de este proyecto.  
Su propósito es servir como referencia rápida para desarrolladores que trabajen con **Docker** y **Docker Compose** dentro del entorno del backend.

---

## 🏗️ 1. Construcción de la imagen

Antes de levantar los contenedores, es necesario construir la imagen base definida en el archivo `Dockerfile`.

### Desde Visual Studio Code
1. Instala la extensión **Docker** (de Microsoft).
2. Localiza el archivo **`Dockerfile`** (sin extensión).
3. Haz clic derecho sobre el archivo y selecciona **“Build Image”**.

### Desde la terminal
Si prefieres hacerlo manualmente:
```bash
docker build -t nombre_imagen .
```

## 🚀 2. Levantar los contenedores
Para iniciar todos los servicios definidos en el archivo `docker-compose.yml`:

```bash
docker-compose up -d
```
- `-d` ejecuta los contenedores en modo detached (segundo plano).

Esto crea los contenedores, redes y volúmenes necesarios si no existen.

## 🧹 3. Eliminar contenedores y volúmenes
Para detener y eliminar todos los contenedores del proyecto junto con sus volúmenes (útil para reiniciar todo desde cero):

```bash
docker-compose down -v
```
- `down` detiene y elimina contenedores.
- `-v` borra también los volúmenes asociados, eliminando los datos persistentes.

## 🪶 4. Visualización de logs y depuración
Para revisar los registros de ejecución de todos los servicios:

```bash
docker-compose logs
```

Para revisar los logs de un servicio en específico:

```bash
docker-compose logs db           # Logs de la base de datos (MySQL)
docker-compose logs api          # Logs del backend (API Node.js)
docker-compose logs phpmyadmin   # Logs del servicio phpMyAdmin
```

Para seguir los logs en tiempo real:

```bash
docker-compose logs -f api
```
- El parámetro `-f` (follow) mantiene la salida actualizada en vivo.

## 🧭 5. Comandos útiles dentro de los contenedores

### Ver contenedores activos
```bash
docker ps
```

### Acceder a un contenedor en ejecución
```bash
docker exec -it nombre_contenedor bash
```
**Ejemplo:**

```bash
docker exec -it mysql_db_cine bash
```

### Listar archivos dentro del contenedor
```bash
docker exec -it nombre_contenedor ls -l /ruta/dentro/del/contenedor
```

### Reiniciar un contenedor
```bash
docker restart nombre_contenedor
```

## 🔄 6. Reconstrucción de imágenes
Si realizas cambios en el código o en el `Dockerfile`, es recomendable reconstruir la imagen antes de volver a levantar los servicios:

```bash
docker-compose build
docker-compose up -d
```

Para reconstruir únicamente un servicio específico:

```bash
docker-compose build api
```

## 🗑️ 7. Limpieza avanzada del entorno Docker
Si necesitas eliminar todas las imágenes, contenedores y volúmenes (por ejemplo, cuando algo se corrompe o deseas liberar espacio):

```bash
docker system prune -a --volumes
```
⚠️ **Advertencia:** este comando borra todos los recursos no utilizados por Docker. Úsalo únicamente cuando estés seguro de que no los necesitas.

## 📋 8. Resumen rápido de comandos

| Acción               | Comando                             | Descripción                                  |
| -------------------- | ----------------------------------- | -------------------------------------------- |
| Construir imagen     | `docker build -t nombre .`          | Crea una imagen a partir del Dockerfile      |
| Levantar servicios   | `docker-compose up -d`              | Inicia contenedores en segundo plano         |
| Ver logs             | `docker-compose logs [servicio]`    | Muestra registros de ejecución               |
| Detener y eliminar   | `docker-compose down -v`            | Elimina contenedores y volúmenes             |
| Acceder a contenedor | `docker exec -it <nombre> bash`     | Abre una terminal dentro del contenedor      |
| Listar contenedores  | `docker ps`                         | Muestra los contenedores activos             |
| Reconstruir imágenes | `docker-compose build`              | Recompila las imágenes del proyecto          |
| Limpiar entorno      | `docker system prune -a --volumes`  | Elimina todos los recursos no usados         |


## 💡 Recomendaciones
- Asegúrate de que Docker Desktop esté ejecutándose antes de iniciar los contenedores.
- Si los servicios no se levantan correctamente, revisa los logs con `docker-compose logs -f api`.
- Usa nombres consistentes en los archivos y rutas (respetando mayúsculas/minúsculas) para evitar errores en Linux.