import axiosInstance from "../utils/axiosInstance";

export const getHomeBanners = async () => {
  const { data } = await axiosInstance.get("/home-banners");
  return data.data || [];
};
