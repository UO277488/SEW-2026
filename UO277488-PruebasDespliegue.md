# UO277488 - PruebasDespliegue.pdf

## Informe de Despliegue en la Nube
### Proyecto: SantaCruzDeTenerife-Desktop

---

## 1. Creación y configuración de la máquina virtual

### Paso 1: Acceso a Azure Portal
1. Iniciar sesión en https://portal.azure.com con las credenciales de Azure for Students
2. Seleccionar "Máquinas virtuales" → "Crear" → "Máquina virtual de Azure"

### Paso 2: Configuración básica
| Parámetro | Valor |
|-----------|-------|
| Suscripción | Azure for Students |
| Grupo de recursos | SEW-Proyecto-RG |
| Nombre de la VM | UO277488-SEW-VM |
| Región | West Europe |
| Imagen | Ubuntu Server 24.04 LTS |
| Tamaño | Standard_B1s (1 vCPU, 1 GB RAM) |
| Nombre de usuario | azureuser |
| Autenticación | Contraseña |

### Paso 3: Configuración de red
- Puerto 80 (HTTP) habilitado
- Puerto 443 (HTTPS) habilitado
- Puerto 22 (SSH) habilitado
- IP Pública asignada: (captura de pantalla de la IP)

---

## 2. Instalación del servidor web Apache

### Conexión SSH a la VM
```bash
ssh azureuser@<IP_PUBLICA>
```

### Instalación de Apache
```bash
sudo apt update
sudo apt install -y apache2
sudo systemctl enable apache2
sudo systemctl start apache2
```

### Verificación
```bash
sudo systemctl status apache2
# Active: active (running)
```

---

## 3. Instalación de PHP

### Instalación de PHP 8.2 y extensiones
```bash
sudo apt install -y php8.2 php8.2-mysql php8.2-xml php8.2-mbstring php8.2-curl libapache2-mod-php8.2
sudo systemctl restart apache2
```

### Verificación de PHP
```bash
php -v
# PHP 8.2.x
```

---

## 4. Instalación de MariaDB

### Instalación
```bash
sudo apt install -y mariadb-server mariadb-client
sudo systemctl enable mariadb
sudo systemctl start mariadb
```

### Configuración de seguridad
```bash
sudo mysql_secure_installation
# - Set root password: Sí
# - Remove anonymous users: Sí
# - Disallow root login remotely: Sí
# - Remove test database: Sí
# - Reload privilege tables: Sí
```

### Creación del usuario y base de datos
```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE IF NOT EXISTS UO277488_DB;
CREATE USER IF NOT EXISTS 'DBUSER2026'@'localhost' IDENTIFIED BY 'DBPWD2026';
GRANT ALL PRIVILEGES ON UO277488_DB.* TO 'DBUSER2026'@'localhost';
FLUSH PRIVILEGES;
```

---

## 5. Despliegue del proyecto

### Subida de archivos mediante SFTP
```bash
# Usando Bitvise SSH Client o scp
scp -r SantaCruzDeTenerife-Desktop/* azureuser@<IP_PUBLICA>:/var/www/html/
```

### Configuración de permisos
```bash
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

---

## 6. Verificación del funcionamiento

### Comprobaciones realizadas:
1. **Página principal (index.html):** ✓ Cargada correctamente
2. **Gastronomía (gastronomia.html):** ✓ Multimedia funcionando
3. **Rutas (rutas.html):** ✓ Carga de XML y mapas Leaflet
4. **Meteorología (meteorologia.html):** ✓ API de Open-Meteo respondiendo
5. **Juego (juego.html):** ✓ Preguntas y corrección funcionando
6. **Reservas (reservas.php):** ✓ PHP ejecutándose, BD conectada
7. **Ayuda (ayuda.html):** ✓ Cargada correctamente

### Capturas de pantalla realizadas:
1. VM en Azure Portal mostrando estado "Running"
2. IP pública de la VM
3. Página principal del proyecto desde navegador
4. Sección de reservas con PHP funcionando correctamente
5. Base de datos creada con tablas desde phpMyAdmin

---

## 7. Eliminación de la máquina virtual

### Pasos:
1. Azure Portal → Máquinas virtuales → UO277488-SEW-VM
2. Seleccionar "Eliminar"
3. Confirmar eliminación del grupo de recursos

### Verificación:
- VM ya no aparece en el listado de recursos
- No hay consumo de crédito activo

---

## 8. Decisiones técnicas adoptadas

| Decisión | Justificación |
|----------|---------------|
| Ubuntu Server 24.04 LTS | Última versión LTS, soporte a largo plazo, estabilidad probada |
| MariaDB en lugar de MySQL | MariaDB viene preinstalada en Ubuntu, es un fork directo de MySQL con mejor rendimiento |
| PHP 8.2 | Compatibilidad con MariaDB, características modernas, match expressions |
| Apache2 | Servidor web más popular, fácil configuración, integración con PHP |
| Standard_B1s | Tamaño mínimo suficiente para proyecto, menor coste de crédito |
