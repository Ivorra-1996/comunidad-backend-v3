import request from 'supertest';

const api = request('http://localhost:3001');

// Demigra y hacer un seed primero.
// Este test funciona si la base tiene un seed.... 
describe('Empresa', () => {
  let cuit = 3012837892;

  test('DELETE /empresa/:id', async () => {
    const response = await api.delete('/empresas/cuit/' + cuit);
    expect(response.status).toBe(200);
  });

  test('DELETE /empresa/:id', async () => {
    const response = await api.delete('/empresas/cuit/' + cuit);
    expect(response.status).toBe(404);
  });

  test('POST /empresa', async () => {
    const response = await api.post('/empresas/').send({
        cuit: 3012837892,
        idUsuario: 468,
        idRubro: 1,
        nombreEmpresa: "Bayer AG",
        descripcion: "Bayer AG es una empresa químico-farmacéutica alemana fundada en Barmen, Alemania en 1863. Hoy en día, tiene su sede en Leverkusen, Renania del Norte-Westfalia, Alemania.​ Es bien conocida a nivel mundial por su marca original de la aspirina.",
        pais: "Argentina",
        provincia: 50,
        ciudad: 50098,
        calle: "Doncella",
        nro: 120,
        piso: 1,
        depto: "1",
        cp: "1712",
        telefono: 1326873598,
        web: "www.bayer.com",
        nombreRepresentante: "Ezequiel",
        emailRepresentante: "EzequielDavid@gmail.com",
        logo: "Bayer.jpg"
    });
    expect(response.status).toBe(201);
    expect(response.body.id.toString()).toBe("3012837892")
  });

  test('GET /empresa/filtro', async () => {
    const response = await api.get('/empresas/?pagina=0&limite=10&ordenar=createdAt&nombreEmpresa=Bayer AG&estado=Observado');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        empresas: expect.objectContaining({
          count: expect.any(Number),
          rows: expect.arrayContaining([
            expect.objectContaining({
              id: "3012837892",
              fk_id_usuario: 468,
              fk_id_rubro: 1,
              estado: "Observado",
              nombre_empresa: "Bayer AG",
              descripcion: "Bayer AG es una empresa químico-farmacéutica alemana fundada en Barmen, Alemania en 1863. Hoy en día, tiene su sede en Leverkusen, Renania del Norte-Westfalia, Alemania.​ Es bien conocida a nivel mundial por su marca original de la aspirina.",
              pais: "Argentina",
              fk_id_provincia: 50,
              fk_id_ciudad: 50098,
              calle: "Doncella",
              nro: 120,
              piso: 1,
              depto: "1",
              cp: "1712",
              telefono: 1326873598,
              web: "www.bayer.com",
              nombre_representante: "Ezequiel",
              email_representante: "EzequielDavid@gmail.com",
              logo: "logo.jpg",
              Usuario: expect.objectContaining({
                id: 468,
                usuario: "bayer@bayer.com",
              }),
              Rubro: expect.objectContaining({
                id: 1,
                nombre_rubro: "desarrollo",
              }),
              Provincia: expect.objectContaining({
                id: 50,
                nombre: "Mendoza",
              }),
              Ciudad: expect.objectContaining({
                id: 50098,
                nombre: "San Martin",
                fk_id_provincia: 50,
              }),
              // Aca va la fecha de creacion, tener en cuenta a la hora de cambiar.
              createdAt: expect.stringMatching(/^2023-10-17T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
              updatedAt: expect.stringMatching(/^2023-10-17T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
            }),
          ]),
        }),
        totalPaginas: expect.any(Number),
      })
    );
  });
  
  test('GET /empresa/all', async () => {
    const response = await api.get('/empresas/all/?pagina=0&limite=10');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        empresas: expect.objectContaining({
          count: expect.any(Number),
          rows: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              fk_id_usuario: expect.any(Number),
              fk_id_rubro: expect.any(Number),
              estado: expect.any(String),
              nombre_empresa: expect.any(String),
              descripcion: expect.any(String),
              pais: expect.any(String),
              fk_id_provincia: expect.any(Number),
              fk_id_ciudad: expect.any(Number),
              calle: expect.any(String),
              nro: expect.any(Number),
              piso: expect.any(Number),
              depto: expect.any(String),
              cp: expect.any(String),
              telefono: expect.any(Number),
              web: expect.any(String),
              nombre_representante: expect.any(String),
              email_representante: expect.any(String),
              logo: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
              Usuario: Object({
                id: expect.any(Number),
                usuario: expect.any(String),
              }),
              Rubro: Object({
                id: expect.any(Number),
                nombre_rubro: expect.any(String),
              }),
              Provincia: Object({
                id: expect.any(Number),
                nombre: expect.any(String),
              }),
              Ciudad: Object({
                id: expect.any(Number),
                nombre: expect.any(String),
                fk_id_provincia: expect.any(Number),
              }),
            }),
          ]),
        }),
        totalPaginas: expect.any(Number),
      })
    );
  });

  test('PUT /empresas/cuit/', async () => {
    const response = await api.put('/empresas/cuit/' + cuit).send({
      estado: "Baja",
    });
    expect(response.status).toBe(200);
  });

  test('GET /empresa/cuit', async () => {
    const response = await api.get('/empresas/cuit/' + cuit);
    expect(response.status).toBe(200);
    const expectedData = {
      id: "3012837892",
      fk_id_usuario: 468,
      fk_id_rubro: 1,
      estado: "Baja",
      nombre_empresa: "Bayer AG",
      descripcion: "Bayer AG es una empresa químico-farmacéutica alemana fundada en Barmen, Alemania en 1863. Hoy en día, tiene su sede en Leverkusen, Renania del Norte-Westfalia, Alemania.​ Es bien conocida a nivel mundial por su marca original de la aspirina.",
      pais: "Argentina",
      fk_id_provincia: 50,
      fk_id_ciudad: 50098,
      calle: "Doncella",
      nro: 120,
      piso: 1,
      depto: "1",
      cp: "1712",
      telefono: 1326873598,
      web: "www.bayer.com",
      nombre_representante: "Ezequiel",
      email_representante: "EzequielDavid@gmail.com",
      logo: "logo.jpg",
      Usuario: {
        id: 468,
        usuario: "bayer@bayer.com",
      },
      Rubro: {
        id: 1,
        nombre_rubro: "desarrollo",
      },
      Provincia: {
        id: 50,
        nombre: "Mendoza",
      },
      Ciudad: {
        id: 50098,
        nombre: "San Martin",
        fk_id_provincia: 50,
      },
    };
  
    expect(response.body).toEqual(
      expect.objectContaining({
        ...expectedData,
      })
    );    
  });

  test('GET /empresa/idUsuario', async () => {
    const response = await api.get('/empresas/idUsuario/' + 468);
    expect(response.status).toBe(200);
    const expectedData = {
      id: "3012837892",
      fk_id_usuario: 468,
      fk_id_rubro: 1,
      estado: "Baja",
      nombre_empresa: "Bayer AG",
      descripcion: "Bayer AG es una empresa químico-farmacéutica alemana fundada en Barmen, Alemania en 1863. Hoy en día, tiene su sede en Leverkusen, Renania del Norte-Westfalia, Alemania.​ Es bien conocida a nivel mundial por su marca original de la aspirina.",
      pais: "Argentina",
      fk_id_provincia: 50,
      fk_id_ciudad: 50098,
      calle: "Doncella",
      nro: 120,
      piso: 1,
      depto: "1",
      cp: "1712",
      telefono: 1326873598,
      web: "www.bayer.com",
      nombre_representante: "Ezequiel",
      email_representante: "EzequielDavid@gmail.com",
      logo: "logo.jpg",
      Usuario: {
        id: 468,
        usuario: "bayer@bayer.com",
      },
      Rubro: {
        id: 1,
        nombre_rubro: "desarrollo",
      },
      Provincia: {
        id: 50,
        nombre: "Mendoza",
      },
      Ciudad: {
        id: 50098,
        nombre: "San Martin",
        fk_id_provincia: 50,
      },
    };
  
    expect(response.body).toEqual(expectedData);
  });
  
  test('PATCH /empresas/cuit/', async () => {
    const response = await api.patch('/empresas/cuit/' + cuit);
    expect(response.status).toBe(200);
});

test('GET /empresa/cuit', async () => {
  const response = await api.get('/empresas/cuit/' + cuit);
  expect(response.status).toBe(200);
  const expectedData = {
    id: "3012837892",
    fk_id_usuario: 468,
    fk_id_rubro: 1,
    estado: "Activo",
    nombre_empresa: "Bayer AG",
    descripcion: "Bayer AG es una empresa químico-farmacéutica alemana fundada en Barmen, Alemania en 1863. Hoy en día, tiene su sede en Leverkusen, Renania del Norte-Westfalia, Alemania.​ Es bien conocida a nivel mundial por su marca original de la aspirina.",
    pais: "Argentina",
    fk_id_provincia: 50,
    fk_id_ciudad: 50098,
    calle: "Doncella",
    nro: 120,
    piso: 1,
    depto: "1",
    cp: "1712",
    telefono: 1326873598,
    web: "www.bayer.com",
    nombre_representante: "Ezequiel",
    email_representante: "EzequielDavid@gmail.com",
    logo: "logo.jpg",
    Usuario: {
      id: 468,
      usuario: "bayer@bayer.com",
    },
    Rubro: {
      id: 1,
      nombre_rubro: "desarrollo",
    },
    Provincia: {
      id: 50,
      nombre: "Mendoza",
    },
    Ciudad: {
      id: 50098,
      nombre: "San Martin",
      fk_id_provincia: 50,
    },
  };

  expect(response.body).toEqual(
    expect.objectContaining({
      ...expectedData,
    })
  );    
});
  
});
