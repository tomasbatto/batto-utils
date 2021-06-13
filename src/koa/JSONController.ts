import { Context } from 'koa'
import IError from '../error/IError'

export default class JSONController {
  public static jsonMessageResponse(
    ctx: Context,
    code: number,
    message: string
  ): void {
    return JSONController.jsonResponse<{ message: string }>(ctx, code, {
      message,
    })
  }
  public static jsonResponse<T>(ctx: Context, code: number, body?: T): void {
    ctx.status = code
    if (body) {
      ctx.type = 'application/json'
      ctx.body = body
    }
    return
  }

  public ok<T>(ctx: Context, body?: T) {
    if (!!body) {
      return JSONController.jsonResponse<T>(ctx, 200, body)
    } else {
      return JSONController.jsonResponse<T>(ctx, 200, body)
    }
  }

  public created<T>(ctx: Context, body: T) {
    return JSONController.jsonResponse<T>(ctx, 201, body)
  }

  public clientError(ctx: Context, message?: string) {
    return JSONController.jsonMessageResponse(
      ctx,
      400,
      message ? message : 'Client Error'
    )
  }

  public unauthorized(ctx: Context, message?: string) {
    return JSONController.jsonMessageResponse(
      ctx,
      401,
      message ? message : 'Unauthorized'
    )
  }

  public paymentRequired(ctx: Context, message?: string) {
    return JSONController.jsonMessageResponse(
      ctx,
      402,
      message ? message : 'Payment required'
    )
  }

  public forbidden(ctx: Context, message?: string) {
    return JSONController.jsonMessageResponse(
      ctx,
      403,
      message ? message : 'Forbidden'
    )
  }

  public notFound(ctx: Context, message?: string) {
    return JSONController.jsonMessageResponse(
      ctx,
      404,
      message ? message : 'Not found'
    )
  }

  public conflict(ctx: Context, message?: string) {
    return JSONController.jsonMessageResponse(
      ctx,
      409,
      message ? message : 'Conflict'
    )
  }

  public tooMany(ctx: Context, message?: string) {
    return JSONController.jsonMessageResponse(
      ctx,
      429,
      message ? message : 'Too many requests'
    )
  }

  public todo(ctx: Context) {
    return JSONController.jsonMessageResponse(ctx, 400, 'TODO')
  }

  public fail(ctx: Context, error: IError) {
    return JSONController.jsonResponse(ctx, 500, error.toJSON())
  }
}
