## Como levantar el proyecto de forma local

#### 1. Clonar el repo/posicionate en tu directorio del proyecto por consola.

#### 2. Instalamos los paquetes y dependencias .

```
npm i
```

#### 3. Instalamos psql

> Psql nos permite conectarnos a bases Postgres mediante la consola.

```
psql --version
```

> Si ya tienes PostgreSQL instalado, no es necesario volver a hacerlo. Puedes descargarlo manualmente si es necesario. Ten en cuenta que, incluso si tienes PostgreSQL instalado, es posible que los comandos no funcionen correctamente en tu consola. En ese caso, es necesario configurar las variables de entorno en Windows para solucionar este problema.

##### MacOS:

```
brew doctor
brew update
brew install libpq
brew link --force libpq
```

##### Linux Debian like:

```
sudo apt-get update
sudo apt-get install postgresql-client
```

#### 4. Docker

Instalamos Docker desde el siguiente link:

[Docker Docs](https://docs.docker.com/engine/install/)

Una vez instalado nos paramos en el directorio raíz del repo de ser necesario y ejecutamos:

```
docker-compose up -d
```

#### 5. Creación de la base

Nos conectamos a la base mediante la consola:

```
psql -h 127.0.0.1 -U postgres
```

> tu contraseña de usuario postgres.
```
Ejemplo:
constraseña: 1234
```
Creamos la base:

```
CREATE DATABASE unahur_desapp_dev;
```

Salimos con:

```
\q;
```
> Ahora podemos conectarnos asi: psql -h 127.0.0.1 -U postgres -d unahur_desapp_dev

Cargamos las migraciones y los datos:

```
Migraciones
npx sequelize db:migrate -> sirve para migrar.
npx sequelize db:migrate:undo:all -> sirve para desmigrar.
```
```
Datos
npx sequelize db:seed:all -> sembras la base.
npx sequelize db:seed:undo:all -> dessembras la base.
```


#### 6. Environment

Tenemos que crear una copia del archivo .env.example en .env.

Ejecutamos el código:

```
./run_dev.sh
```

#### 7. Pruebas en Insomnia

Importamos el archivo API_COMUNIDAD_V3.json

---
#### Extra: Algo que estaria bueno mejorar

Cuando diseñamos la base por un tema de PKs, que luego corregimos, tuvimos que duplicar en Postulantes y Empresas los datos de contacto como dirección, localidad, teléfono, etc. Eso estaría bueno modificarlo. El cambio requiere crear tablas, FKs y adaptar los endpoints. Además de cambios en el front.
