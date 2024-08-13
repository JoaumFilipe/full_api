import { testServer } from '../../../../shared/tests'

describe('POST /v1/cities - Success Scenarios', () => {
  test('should create a new city and return 201', async () => {
    const response = await testServer.post('/v1/cities').send({ city: 'Fortaleza', state: 'CE' })
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({ city: 'Fortaleza', state: 'CE' })
  })

  test('should return 201 if the state field contain null', async () => {
    const response = await testServer.post('/v1/cities').send({ city: 'Fortaleza', state: null })
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({ city: 'Fortaleza', state: null })
  })
})

describe('POST /v1/cities - Validation Error Scenarios', () => {
  test('should return 400 if city name is less than 3 characters', async () => {
    const response = await testServer.post('/v1/cities').send({ city: 'Fo', state: 'CE' })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual([
      {
        error: 'FST_ERR_VALIDATION',
        message: 'String must contain at least 3 character(s)',
        path: ['city'],
      },
    ])
  })

  test('should return 400 if the city field is not filled', async () => {
    const response = await testServer.post('/v1/cities').send({ state: 'CE' })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual([
      {
        error: 'FST_ERR_VALIDATION',
        message: 'Required',
        path: ['city'],
      },
    ])
  })

  test('should return 400 if the state field is longer than 2 characters', async () => {
    const response = await testServer.post('/v1/cities').send({ city: 'Fortaleza', state: 'CEE' })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual([
      {
        error: 'FST_ERR_VALIDATION',
        message: 'String must contain at most 2 character(s)',
        path: ['state'],
      },
    ])
  })

  test('should return 400 if the state field is less than 2 characters long', async () => {
    const response = await testServer.post('/v1/cities').send({ city: 'Fortaleza', state: 'C' })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual([
      {
        error: 'FST_ERR_VALIDATION',
        message: 'String must contain at least 2 character(s)',
        path: ['state'],
      },
    ])
  })

  test('should return 400 if the state field is not filled', async () => {
    const response = await testServer.post('/v1/cities').send({ city: 'Fortaleza' })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual([
      {
        error: 'FST_ERR_VALIDATION',
        message: 'Required',
        path: ['state'],
      },
    ])
  })

  test('deve retornar 400 se nenhum campo for preenchido', async () => {
    const response = await testServer.post('/v1/cities').send()
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual([
      {
        error: 'FST_ERR_VALIDATION',
        message: 'Expected object, received null',
        path: [],
      },
    ])
  })
})

describe('POST /v1/cities - Multiple Requests Test', () => {
  test('should handle multiple POST requests with unique city names', async () => {
    const requests = Array.from({ length: 10 }, (_, i) =>
      testServer.post('/v1/cities').send({ city: `Fortaleza-${i}`, state: 'CE' })
    )
    const responses = await Promise.all(requests)

    responses.forEach((response, i) => {
      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({ city: `Fortaleza-${i}`, state: 'CE' })
    })
  })
})
