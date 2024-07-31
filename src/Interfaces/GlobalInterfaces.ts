export interface IGetProductBody {
    pageSize: number
    pageNumber: number
    minPrice: number
    maxPrice: number
}
export interface IResponseList<T = any> {
    config?: []
    data: T
    headers?: []
    status?: number
    statusText?: string
    request?: []
    response?: any
}
export interface IResponseData {
    total: number
    count: number
    Product: any[]
}