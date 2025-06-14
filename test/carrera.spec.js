import request from 'supertest';

const api = request('http://localhost:3001');

// Demigra y hacer un seed primero.
// Este test funciona si tiene un seed la base.... 
describe('Carrera', () => {
  let id = 1;

  test('DELETE /carrera/:id', async () => {
    const response = await api.delete('/carreras/' + id);
    expect(response.status).toBe(200);
  });

  test('DELETE /carrera/:id', async () => {
    const response = await api.delete('/carreras/' + id);
    expect(response.status).toBe(404);
  });

  test('GET /carrera', async () => {
    const response = await api.get('/carreras');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        carreras: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            nombre_carrera: expect.any(String)
          }),
        ]),
      })
    );
  });

  test('POST /carrera', async () => {
    const response = await api.post('/carreras').send({
      nombre_carrera: 'Tecnicatura en informaticaaaaaaa',
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        carrera: expect.objectContaining({
          nombre_carrera: expect.any(String),
          updatedAt: expect.any(String),
          createdAt: expect.any(String)
        }),
      })
    );
  });

  test('PUT /carrera/:id', async () => {
    const response = await api.put('/carreras/' + id).send({
      nombre_carrera: 'Tecnicatura en informatica',
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        carrera: expect.objectContaining({
          createdAt: expect.any(String),
          id: expect.any(Number),
          nombre_carrera: expect.any(String),
          updatedAt: expect.any(String),
        }),
      })
    );
  });

  test('GET /carrera', async () => {
    const response = await api.get('/carreras/' + id);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        carrera: expect.objectContaining({
          id: expect.any(Number),
          nombre_carrera: expect.any(String),
        }),
      })
    );
  });
  
});