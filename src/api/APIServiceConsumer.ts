import { showNotificationFromAPIError } from 'utils/showNotificationFromAPIError'
import { isAbsoluteURL } from 'utils/isAbsoluteURL'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { APIError } from 'api/APIError'
import qs from 'qs'
import { APIService } from 'api/APIService'

type RequestOptions = {
  preventErrorPopup?: boolean,
} & AxiosRequestConfig

type APIErrorResponse = {
  statusCode: string,
  message: string,
}

const isAPIErrorResponse = (e: AxiosError): e is AxiosError<APIErrorResponse> =>
  !!(e?.response?.data as Record<string, unknown>)?.statusCode

export abstract class APIServiceConsumer {

  protected getBasePath(): string {
    return window.appConfig.BACKEND_ADDRESS
  }

  protected getAxios(): AxiosInstance {
    return APIService.getClient()
  }

  protected normilizePath(path: string): string {
    if (isAbsoluteURL(path)) {
      return path.replace(/\/+$/, '')
    }
    return (`${this.getBasePath()}/${path.replace(/^\/+/, '')}`).replace(/\/+$/, '')
  }

  protected async request<T>(path: string, config?: AxiosRequestConfig, options: RequestOptions = {}): Promise<T> {
    const { preventErrorPopup, ...axiosOptions } = options
    try {
      const response: AxiosResponse<T> = await this.getAxios()(this.normilizePath(path), { ...config, ...axiosOptions })
      return response.data
    } catch (e) {
      if (axios.isAxiosError(e) && isAPIErrorResponse(e)) {
        const response = e.response!.data
        const error = new APIError(response.message, e.response!.status)
        if (!preventErrorPopup) {
          showNotificationFromAPIError(error)
        }
        throw error
      } else {
        const error = new APIError((e as Error).message, -1)
        showNotificationFromAPIError(error)
      }
      throw e
    }
  }

  protected parseBody(body: FormData | Record<string, unknown> | undefined): AxiosRequestConfig {
    if (!body) {
      return {}
    }
    if (body instanceof FormData) {
      return {
        data: body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    }
    return {
      data: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }

  protected get<T>(path: string, params: Record<string, unknown> = {}, options?: RequestOptions): Promise<T> {
    const [basePath, pathParams] = path.split('?')
    let fullParams = { ...params }
    if (pathParams) {
      fullParams = { ...qs.parse(pathParams), ...fullParams }
    }
    const searchString = qs.stringify(fullParams)
    let fullPath = basePath
    if (searchString.length) {
      fullPath += `?${searchString}`
    }

    return this.request<T>(fullPath, {
      method: 'GET',
    }, options)
  }

  protected post<T>(path: string, body?: FormData | Record<string, unknown>, options?: RequestOptions): Promise<T> {
    return this.request(path, {
      method: 'POST' as const,
      ...this.parseBody(body),
    }, options)
  }

  protected put<T>(path: string, body?: FormData | Record<string, unknown>, options?: RequestOptions): Promise<T> {
    return this.request(path, {
      method: 'PUT',
      ...this.parseBody(body),
    }, options)
  }

  protected patch<T>(path: string, body?: FormData | Record<string, unknown>, options?: RequestOptions): Promise<T> {
    return this.request(path, {
      method: 'PATCH',
      ...this.parseBody(body),
    }, options)
  }

  protected delete<T>(path: string, body?: FormData | Record<string, unknown>, options?: RequestOptions): Promise<T> {
    return this.request(path, {
      method: 'DELETE',
      ...this.parseBody(body),
    }, options)
  }

}
