import axiosInstance from '../utils/axiosInstance'

export const getOfferBars = async () => {
  const { data } = await axiosInstance.get('/offer-bars')
  return data.data || []
}

export const getOfferBanners = async () => {
  const { data } = await axiosInstance.get('/offer-banners')
  return data.data || []
}
