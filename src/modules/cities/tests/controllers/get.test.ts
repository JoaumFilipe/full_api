import { testServer } from '../../../../shared/tests'

describe('GET /v1/cities - Success Scenarios', () => {
  test('should return cities with valid query parameters and status code 200', async () => {
    const response = await testServer
      .get('/v1/cities')
      .query({ page: 1, limit: 20, filter: 'Cidade', search: 'Rio dourado' })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ page: 1, limit: 20, filter: 'Cidade', search: 'Rio dourado' })
  })

  test('must return an empty object if you do not pass the parameters and status code 200', async () => {
    const response = await testServer.get('/v1/cities').query({})

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({})
  })

  test('should return object with limit parameter and status code 200', async () => {
    const response = await testServer.get('/v1/cities').query({ limit: 100000 })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ limit: 100000 })
  })
})

describe('GET /v1/cities - Validation Error Scenarios', () => {
  test('should return 400 if page parameter is less than 0', async () => {
    const response = await testServer.get('/v1/cities').query({ page: -10 })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual([
      {
        error: 'FST_ERR_VALIDATION',
        message: 'Number must be greater than 0',
        path: ['page'],
      },
    ])
  })

  test('should return 400 if limit parameter is less than 0', async () => {
    const response = await testServer.get('/v1/cities').query({ limit: -5 })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual([
      {
        error: 'FST_ERR_VALIDATION',
        message: 'Number must be greater than 0',
        path: ['limit'],
      },
    ])
  })

  test('should return 400 if filter parameter is empty', async () => {
    const response = await testServer.get('/v1/cities').query({ filter: '' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual([
      {
        error: 'FST_ERR_VALIDATION',
        message: 'String must contain at least 1 character(s)',
        path: ['filter'],
      },
    ])
  })

  test('should return 400 if search parameter is empty', async () => {
    const response = await testServer.get('/v1/cities').query({ search: '' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual([
      {
        error: 'FST_ERR_VALIDATION',
        message: 'String must contain at least 1 character(s)',
        path: ['search'],
      },
    ])
  })
})
