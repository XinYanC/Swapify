import { apiGet } from './client'

export const getHello = () => apiGet('/hello')
export const getEndpoints = () => apiGet('/endpoints')
