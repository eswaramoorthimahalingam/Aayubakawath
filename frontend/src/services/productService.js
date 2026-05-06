import axiosInstance from '../utils/axiosInstance'

export const getProducts = async () => {
  const { data } = await axiosInstance.get('/products')
  return data.data || []
}

export const getProductById = async (id) => {
  const { data } = await axiosInstance.get(`/products/${id}`)
  return data.data
}
