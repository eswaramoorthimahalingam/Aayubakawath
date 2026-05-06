import React, { memo } from 'react'
import { FaHeart, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { ShoppingBag } from 'lucide-react'
import { getPrimaryProductImage } from '../../../utils/productImageOverrides'

export const StarRating = memo(function StarRating({ rating }) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} size={14} style={{ color: '#F59E0B' }} />)
    } else if (i - 0.5 <= rating) {
      stars.push(<FaStarHalfAlt key={i} size={14} style={{ color: '#F59E0B' }} />)
    } else {
      stars.push(<FaRegStar key={i} size={14} style={{ color: '#D9D9D9' }} />)
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>
})

const toStringList = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return []

    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed)
        if (Array.isArray(parsed)) {
          return parsed.map((item) => String(item).trim()).filter(Boolean)
        }
      } catch {
        // Fall back to comma-separated parsing.
      }
    }

    return trimmed
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

const cleanLabel = (value) => {
  const label = String(value || '').trim()

  if (!label) return ''
  if (/^not specified$/i.test(label)) return ''
  if (/^over all$/i.test(label)) return ''

  return label
}

const clampText = (value, maxLength = 96) => {
  const text = String(value || '')
    .replace(/\s+/g, ' ')
    .trim()

  if (!text) return ''
  if (text.length <= maxLength) return text

  return `${text.slice(0, maxLength).trimEnd()}...`
}

const getCardDescription = (product) => {
  const forWhom = cleanLabel(product?.forWhom)
  const rawDescription = String(product?.productDescription || '')
    .replace(/\s+/g, ' ')
    .trim()
  const firstSentence = rawDescription.split(/(?<=[.!?])\s+/)[0]

  if (firstSentence) {
    return clampText(firstSentence, 98)
  }

  if (forWhom) {
    return `Daily herbal support for ${forWhom.toLowerCase()}.`
  }

  return 'Clean daily wellness support with a simple capsule routine.'
}

export function ProductCardImage({
  product,
  hov,
  wishlisted,
  onToggleWishlist,
  adding,
  wishlistPending,
}) {
  const imageUrl = getPrimaryProductImage(product)

  return (
    <div className="relative shrink-0 bg-transparent">
      <div className="relative flex h-[13.5rem] items-center justify-center overflow-hidden bg-transparent min-[420px]:h-[15rem] sm:h-[17.75rem] xl:h-[18.5rem]">
        {imageUrl ? (
          <div className="absolute inset-0 flex items-center justify-center px-3 pb-2 pt-4 sm:px-5 sm:pb-3 sm:pt-6">
            <img
              src={imageUrl}
              alt={product.productName}
              loading="lazy"
              decoding="async"
              draggable={false}
              className={`max-h-[88%] w-auto max-w-[72%] object-contain object-center transition-transform duration-500 sm:max-h-[90%] sm:max-w-[76%] ${
                hov ? 'scale-[1.05]' : 'scale-100'
              }`}
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-[var(--color-text-muted)]">
            Product image coming soon
          </div>
        )}
      </div>

      <button
        onClick={onToggleWishlist}
        disabled={wishlistPending}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className={`absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full
          border border-[#efede8] bg-white shadow-[0_8px_22px_rgba(17,24,39,0.08)] backdrop-blur-sm transition-all duration-300 sm:right-4 sm:top-4 sm:h-12 sm:w-12
          ${wishlisted ? 'text-[var(--color-terracotta)]' : 'text-[#6d6d6d] hover:text-[var(--color-terracotta)]'}
          ${wishlistPending ? 'animate-pulse' : ''}`}
      >
        <FaHeart size={14} />
      </button>

      {adding && (
        <div className="absolute bottom-5 right-4 z-10 rounded-full bg-black px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white sm:bottom-6 sm:right-5">
          Adding
        </div>
      )}
    </div>
  )
}

export function ProductCardInfo({ product }) {
  const seedRating = (id) => {
    let hash = 0
    const str = String(id)
    for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) & 0xffff
    return (3.5 + (hash % 15) / 10).toFixed(1)
  }
  const seedReviews = (id) => {
    let hash = 0
    const str = String(id) + 'r'
    for (let i = 0; i < str.length; i++) hash = (hash * 37 + str.charCodeAt(i)) & 0xffff
    return 28 + (hash % 220)
  }

  const rating = product.rating > 0 ? product.rating : parseFloat(seedRating(product.id))
  const reviewCount = product.reviewCount > 0 ? product.reviewCount : seedReviews(product.id)
  const price = Number(product?.price || 0)
  const finalPrice = Number(product?.finalPrice || 0)
  const displayPrice =
    Number.isFinite(finalPrice) && finalPrice > 0 ? finalPrice : Number.isFinite(price) ? price : 0
  const disc =
    price > 0 && finalPrice > 0 && price > finalPrice
      ? Math.round(((price - finalPrice) / price) * 100)
      : 0
  const description = getCardDescription(product)

  return (
    <div className="px-2.5 pb-2 pt-2 sm:px-4 sm:pb-3 sm:pt-2.5">
      <div className="flex flex-col gap-2">
        <h3 className="min-h-[2.25rem] text-left font-display text-[1.02rem] font-semibold leading-[1.15] tracking-[-0.03em] text-[#090b11] line-clamp-2 sm:min-h-[2.6rem] sm:text-[1.12rem]">
          {product.productName}
        </h3>

        <p className="min-h-[3.25rem] text-left font-body text-[0.88rem] leading-[1.48] tracking-[-0.01em] text-[#4e5057] line-clamp-2 sm:min-h-[3.6rem] sm:text-[0.95rem]">
          {description}
        </p>

        <div className="flex min-h-[1rem] items-center gap-1.5">
          <StarRating rating={rating} />
          <span className="font-body text-[0.9rem] font-semibold tracking-[-0.02em] text-[#090b11]">
            ({reviewCount})
          </span>
        </div>

        <div className="flex min-h-[2rem] flex-wrap items-end gap-x-2 gap-y-1">
          {disc > 0 && (
            <span className="font-body text-[0.95rem] leading-none text-[#8c8d91] line-through">
              ₹{price.toLocaleString('en-IN')}
            </span>
          )}
          <span className="font-display text-[1.7rem] font-semibold leading-none tracking-[-0.05em] text-[#0a0c12] sm:text-[2rem]">
            From ₹{displayPrice.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  )
}

export function ProductCardActions({ onAddToCart, adding }) {
  return (
    <button
      onClick={onAddToCart}
      disabled={adding}
      className="flex min-h-[3.9rem] w-full items-center justify-center gap-2 rounded-[18px] border border-[#9aac45] bg-white px-4 py-3 text-[1rem] font-semibold tracking-[-0.02em] text-[#879d27] transition-colors duration-300 hover:border-[#8fa12a] hover:text-[#7d9220] disabled:opacity-60"
    >
      <ShoppingBag size={16} strokeWidth={2} />
      {adding ? 'Adding...' : 'Add to cart'}
    </button>
  )
}
