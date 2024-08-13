import { testServer } from '../../../../shared/tests'

describe('DELETE /v1/cities/:id - Success Scenarios', () => {
  test('should return 200 and confirmation message when city is successfully deleted', async () => {
    const response = await testServer.delete('/v1/cities/123').send()

    expect(response.statusCode).toBe(200)
    expect(response.text).toEqual('123: Deleted')
  })
})

describe('DELETE /v1/cities/:id - Validation Error Scenarios', () => {
  test('should return 400 if ID parameter is missing', async () => {
    const response = await testServer.delete('/v1/cities/').send()

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual([
      {
        error: 'FST_ERR_VALIDATION',
        message: 'Number must be greater than 0',
        path: ['id'],
      },
    ])
  })

  test('should return 400 if ID parameter is not a number', async () => {
    const response = await testServer.delete('/v1/cities/test').send()

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual([
      {
        error: 'FST_ERR_VALIDATION',
        message: 'Expected number, received nan',
        path: ['id'],
      },
    ])
  })
})
