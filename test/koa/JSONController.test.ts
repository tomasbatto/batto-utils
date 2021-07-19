import { IError, JSONController } from '../../src'

import { createMockContext } from '@shopify/jest-koa-mocks'

class ExampleError implements IError {
  toJSON(): Record<string, any> {
    return { something: true }
  }
  toString(): string {
    return 'Error'
  }
}

describe('Koa utils: JSONController.ts', () => {
  const jsonController = new JSONController()
  it('jsonResponse: should add to context: status, body and code', () => {
    const context = createMockContext()
    const body = { something: true }
    JSONController.jsonResponse<{ something: boolean }>(context, 200, body)
    expect(context.status).toEqual(200)
    expect(context.body).toEqual(body)
    expect(context.type).toEqual('application/json')
  })
  it('jsonResponse: should add to context: status and code (no body)', () => {
    const context = createMockContext()
    JSONController.jsonResponse(context, 200)
    expect(context.status).toEqual(200)
    expect(context.body).toBeUndefined()
    expect(context.type).toBeFalsy()
  })

  it('jsonMessageResponse: should add to the context body { message:  string }', () => {
    const context = createMockContext()
    JSONController.jsonMessageResponse(context, 200, 'A Message')
    expect(context.status).toEqual(200)
    expect(context.body).toBeTruthy()
    expect((context.body as any).message).toEqual('A Message')
    expect(context.type).toEqual('application/json')
  })

  it('ok: should add to the context status 200 and a body', () => {
    const context = createMockContext()
    const body = { something: true }
    jsonController.ok<{ something: boolean }>(context, body)
    expect(context.status).toEqual(200)
    expect(context.body).toBeTruthy()
    expect(context.body).toEqual(body)
    expect(context.type).toEqual('application/json')
  })
  it('created: should add to the context status 201 and a body', () => {
    const context = createMockContext()
    const body = { something: true }
    jsonController.created<{ something: boolean }>(context, body)
    expect(context.status).toEqual(201)
    expect(context.body).toBeTruthy()
    expect(context.body).toEqual(body)
    expect(context.type).toEqual('application/json')
  })
  it('clientError: should add to the context status 400 and a body', () => {
    const context = createMockContext()
    jsonController.clientError(context)
    expect(context.status).toEqual(400)
    expect(context.body).toBeTruthy()
    expect((context.body as any).message).toEqual('Client Error')
    expect(context.type).toEqual('application/json')
  })
  it('unauthorized: should add to the context status 401 and a body', () => {
    const context = createMockContext()
    jsonController.unauthorized(context)
    expect(context.status).toEqual(401)
    expect(context.body).toBeTruthy()
    expect((context.body as any).message).toEqual('Unauthorized')
    expect(context.type).toEqual('application/json')
  })
  it('paymentRequired: should add to the context status 402 and a body', () => {
    const context = createMockContext()
    jsonController.paymentRequired(context)
    expect(context.status).toEqual(402)
    expect(context.body).toBeTruthy()
    expect((context.body as any).message).toEqual('Payment required')
    expect(context.type).toEqual('application/json')
  })

  it('forbidden: should add to the context status 403 and a body', () => {
    const context = createMockContext()
    jsonController.forbidden(context)
    expect(context.status).toEqual(403)
    expect(context.body).toBeTruthy()
    expect((context.body as any).message).toEqual('Forbidden')
    expect(context.type).toEqual('application/json')
  })
  it('notFound: should add to the context status 404 and a body', () => {
    const context = createMockContext()
    jsonController.notFound(context)
    expect(context.status).toEqual(404)
    expect(context.body).toBeTruthy()
    expect((context.body as any).message).toEqual('Not found')
    expect(context.type).toEqual('application/json')
  })
  it('conflict: should add to the context status 409 and a body', () => {
    const context = createMockContext()
    jsonController.conflict(context)
    expect(context.status).toEqual(409)
    expect(context.body).toBeTruthy()
    expect((context.body as any).message).toEqual('Conflict')
    expect(context.type).toEqual('application/json')
  })

  it('tooMany: should add to the context status 429 and a body', () => {
    const context = createMockContext()
    jsonController.tooMany(context)
    expect(context.status).toEqual(429)
    expect(context.body).toBeTruthy()
    expect((context.body as any).message).toEqual('Too many requests')
    expect(context.type).toEqual('application/json')
  })

  it('todo: should add to the context status 400 and a body', () => {
    const context = createMockContext()
    jsonController.todo(context)
    expect(context.status).toEqual(400)
    expect(context.body).toBeTruthy()
    expect((context.body as any).message).toEqual('TODO')
    expect(context.type).toEqual('application/json')
  })

  it('fail: should add to the context status 500 and a body', () => {
    const context = createMockContext()
    jsonController.fail(context, new ExampleError())
    expect(context.status).toEqual(500)
    expect(context.body).toBeTruthy()
    expect((context.body as any).something).toEqual(true)
    expect(context.type).toEqual('application/json')
  })
})
