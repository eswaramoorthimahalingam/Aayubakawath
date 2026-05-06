import bloodSugarUpdated from '../assets/images/product-updated/blood-sugar-updated.png'
import brainTonicUpdated from '../assets/images/product-updated/brain-tonic-updated.png'
import cholesterolOgWhite from '../assets/images/product-updated/cholesterol-og-white.png'
import generalHealthOgWhite from '../assets/images/product-updated/general-health-og-white.png'
import vitalityUpdated from '../assets/images/product-updated/vitality-updated.png'

const normalizeProductName = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const PRIMARY_PRODUCT_IMAGE_OVERRIDES = {
  [normalizeProductName('Blood Cholesterol Balance')]: cholesterolOgWhite,
  [normalizeProductName('Blood Cholsterol Balance')]: cholesterolOgWhite,
  [normalizeProductName('General Health')]: generalHealthOgWhite,
  [normalizeProductName('Brain Tonic')]: brainTonicUpdated,
  [normalizeProductName('Vitality Power Plus')]: vitalityUpdated,
  [normalizeProductName('Blood Sugar')]: bloodSugarUpdated,
}

const PRODUCTS_WITH_PRIMARY_IMAGE_ONLY = new Set([
  'af437986-b590-42b6-866f-7aac60def1a5',
  '72773df4-20e0-4033-9c50-d0cae9a9ce2d',
  '317a748b-8ff8-4533-9294-a208cc004ee5',
])

export const getProductImageSet = (product) => {
  const backendImages = Array.isArray(product?.productImages) ? product.productImages : []

  if (PRODUCTS_WITH_PRIMARY_IMAGE_ONLY.has(product?.id) && backendImages[0]) {
    return [backendImages[0]]
  }

  return backendImages
}

export const getPrimaryProductImage = (product) => {
  const override = PRIMARY_PRODUCT_IMAGE_OVERRIDES[normalizeProductName(product?.productName)]

  if (override) {
    return override
  }

  const images = getProductImageSet(product)
  return images[0]?.secureUrl || images[0]?.url || ''
}
