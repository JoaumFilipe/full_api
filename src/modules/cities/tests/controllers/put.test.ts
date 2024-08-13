import { testServer } from '../../../../shared/tests'

describe('PUT /v1/cities/:id - Success Scenarios', () => {
  test('should return status code 204 when updating city with valid data', async () => {
    const response = await testServer.put('/v1/cities/1').send({ city: 'Fortal', state: 'CE' })

    expect(response.statusCode).toBe(204)
  })

  test('should return status code 204 when updating city with state as null', async () => {
    const response = await testServer.put('/v1/cities/1').send({ city: 'Fortal', state: null })

    expect(response.statusCode).toBe(204)
  })
})

describe('PUT /v1/cities/:id - Validation Error Scenarios', () => {
  test('should return 400 if an unrecognized key is present in the request body', async () => {
    const response = await testServer
      .put('/v1/cities/1')
      .send({ city: 'Fortal', state: null, id: '' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual([
      {
        error: 'FST_ERR_VALIDATION',
        message: "Unrecognized key(s) in object: 'id'",
        path: [],
      },
    ])
  })

  test('should return 400 if request body is empty and required fields are missing', async () => {
    const response = await testServer.put('/v1/cities/1').send({})

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual([
      {
        error: 'FST_ERR_VALIDATION',
        message: 'Required',
        path: ['city'],
      },
      {
        error: 'FST_ERR_VALIDATION',
        message: 'Required',
        path: ['state'],
      },
    ])
  })

  test('should return 400 if state is null and city is required', async () => {
    const response = await testServer.put('/v1/cities/1').send({ state: null })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual([
      {
        error: 'FST_ERR_VALIDATION',
        message: 'Required',
        path: ['city'],
      },
    ])
  })

  test('should return 400 if city is provided but state is missing', async () => {
    const response = await testServer.put('/v1/cities/1').send({ city: 'Fortal' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual([
      {
        error: 'FST_ERR_VALIDATION',
        message: 'Required',
        path: ['state'],
      },
    ])
  })

  test('should return 400 if the URL is missing the city ID', async () => {
    const response = await testServer.put('/v1/cities/').send({ city: 'Fortal', state: null })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual([
      {
        error: 'FST_ERR_VALIDATION',
        message: 'Number must be greater than 0',
        path: ['id'],
      },
    ])
  })
})
