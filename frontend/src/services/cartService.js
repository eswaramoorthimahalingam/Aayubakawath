import axiosInstance from "../utils/axiosInstance"

export const getCart = async () => {
  const { data } = await axiosInstance.get("/cart")
  return data
}

export const getCartCount = async () => {
  const { data } = await axiosInstance.get("/cart/count")
  return data
}

export const addToCart = async ({ productId, quantity = 1 }) => {
  const { data } = await axiosInstance.post("/cart", { productId, quantity })
  return data
}

export const updateCartItem = async ({ id, quantity }) => {
  const { data } = await axiosInstance.put(`/cart/${id}`, { quantity })
  return data
}

export const removeFromCart = async (id) => {
  const { data } = await axiosInstance.delete(`/cart/${id}`)
  return data
}

export const clearCart = async () => {
  const { data } = await axiosInstance.delete("/cart")
  return data
}
