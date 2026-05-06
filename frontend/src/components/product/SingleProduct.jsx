import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../../services/cartService";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../../services/wishlistService";
import { getProductById } from "../../services/productService";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import RelatedProduct from "../product/ReleatedProduct";
import ReviewSection from "../clientReview/ReviewSection";
import FAQ from "./FAQ";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  ChevronDown,
  Heart,
  Share2,
  ShoppingCart,
  Check,
  Shield,
  Leaf,
  Zap,
  Clock,
  Star,
  Info,
  AlertTriangle,
  BookOpen,
  Image as ImageIcon,
  Minus,
  Plus,
} from "lucide-react";
import ashwagandhaImg from "../../assets/images/ingredients/ashwagandha.png";
import brahmiImg from "../../assets/images/ingredients/brahmi.png";
import amlaImg from "../../assets/images/ingredients/amla.png";
import pincodeData from "../../data/pincodeData.json";

import ProductBreadcrumb from "./single-product/ProductBreadcrumb";
import ProductImageGallery from "./single-product/ProductImageGallery";
import ProductMeta from "./single-product/ProductMeta";
import ProductPackSelector from "./single-product/ProductPackSelector";
import ProductActions from "./single-product/ProductActions";
import ProductOffers from "./single-product/ProductOffers";
import ProductPincodeCheck from "./single-product/ProductPincodeCheck";
import ProductTrustBadges from "./single-product/ProductTrustBadges";
import ProductOffersStrip from "./single-product/ProductOffersStrip";
import ProductTabs from "./single-product/ProductTabs";
import ProductStickyBar from "./single-product/ProductStickyBar";
import { getProductImageSet } from "../../utils/productImageOverrides";

const OFFERS = [
  { icon: "Bank Offer", body: "10% off HDFC Cards. Min ₹500" },
  { icon: "No-cost EMI", body: "₹167/mo on orders above ₹999" },
  { icon: "Buy 2 Get 1", body: "Free on all 60-cap packs" },
  { icon: "Free Delivery", body: "On orders above ₹499" },
  { icon: "Combo Offer", body: "Buy 3 packs, get 12% off" },
];

const BENEFITS_LIST = [
  {
    key: "Energy & Stamina",
    val: "Ashwagandha and Shilajit work together to reduce fatigue and increase physical endurance — noticeable within 2–3 weeks of daily use.",
    icon: "⚡",
  },
  {
    key: "Immune Support",
    val: "Turmeric, Ginger, and Long Pepper provide potent anti-inflammatory and immunomodulatory support.",
    icon: "🛡️",
  },
  {
    key: "Stress & Sleep",
    val: "Brahmi and Ashwagandha are clinically studied adaptogens that lower cortisol and improve sleep quality.",
    icon: "🌙",
  },
  {
    key: "Digestion & Gut",
    val: "Cardamom, Mulethi, and Ginger aid in soothing the digestive tract and reducing bloating.",
    icon: "🌿",
  },
  {
    key: "Antioxidant Protection",
    val: "Saffron and Clove are among the highest ORAC-rated herbs, fighting free radicals and promoting cellular longevity.",
    icon: "✨",
  },
];

const WARNING_LIST = [
  {
    key: "Pregnancy / Nursing",
    val: "Consult your gynaecologist before use if pregnant or breastfeeding.",
  },
  {
    key: "Drug interactions",
    val: "May interact with blood thinners, thyroid medication, or immunosuppressants.",
  },
  {
    key: "Overdose",
    val: "Do not exceed the recommended dose. Excess Ashwagandha may cause drowsiness.",
  },
  {
    key: "Allergies",
    val: "Discontinue immediately if you experience rash, itching, or swelling.",
  },
  {
    key: "Children",
    val: "Not recommended for children under 18 years without medical supervision.",
  },
  {
    key: "Chronic conditions",
    val: "Consult a healthcare provider if you have diabetes, hypertension, or autoimmune disorders.",
  },
  { key: "Keep out of reach", val: "Store out of reach of children and pets." },
];

const REVIEWS = [
  {
    name: "Amit S.",
    initial: "A",
    rating: 5,
    date: "12 Jan 2025",
    text: "Absolutely love this product. Noticed a huge difference in my energy levels within 2 weeks! My sleep improved noticeably and the digestion has been great.",
    verified: true,
  },
  {
    name: "Priya V.",
    initial: "P",
    rating: 4,
    date: "3 Feb 2025",
    text: "Great taste and quality. My whole family drinks it every morning. Will definitely reorder. The immunity boost is real — no one got sick this winter!",
    verified: true,
  },
  {
    name: "Rahul M.",
    initial: "R",
    rating: 5,
    date: "20 Feb 2025",
    text: "Best Ayurvedic supplement I have ever tried. The difference in my stamina after the gym is night and day.",
    verified: true,
  },
];

const PRODUCT_INGREDIENTS = {
  "Blood Cholesterol Balance": {
    list: [
      {
        key: "Main Ingredients",
        val: "Guggul, Arjuna, Garlic, Amla, Turmeric, Ashwagandha",
      },
      {
        key: "Other Ingredients",
        val: "Hydroxypropyl Methylcellulose (HPMC), Microcrystalline Cellulose capsule",
      },
    ],
    pills: ["Guggul", "Arjuna", "Garlic", "Amla", "Turmeric", "Ashwagandha"],
    details: [
      "Guggul: Traditionally used to support healthy cholesterol levels and lipid metabolism.",
      "Arjuna: Renowned heart tonic that supports cardiovascular strength and circulation.",
      "Garlic: Helps maintain healthy cholesterol and supports heart health.",
      "Amla: Rich in antioxidants that support lipid balance and vascular protection.",
      "Turmeric: Anti-inflammatory herb that supports overall cardiovascular health.",
      "Ashwagandha: Adaptogen that helps manage stress and supports heart wellness.",
    ],
  },
  "Blood Sugar": {
    list: [
      {
        key: "Main Ingredients",
        val: "Gurmar, Bitter Gourd, Jamun Seed, Fenugreek, Jackfruit Leaf, Garcinia",
      },
      {
        key: "Other Ingredients",
        val: "Hydroxypropyl Methylcellulose (HPMC), Microcrystalline Cellulose capsule",
      },
    ],
    pills: [
      "Gurmar",
      "Bitter Gourd",
      "Jamun Seed",
      "Fenugreek",
      "Jackfruit Leaf",
      "Garcinia",
    ],
    details: [
      "Gurmar: Known as the 'sugar destroyer,' helps reduce sugar absorption and cravings.",
      "Bitter Gourd: Supports healthy glucose metabolism and insulin activity.",
      "Jamun Seed: Traditionally used to maintain healthy blood sugar levels.",
      "Fenugreek: Helps regulate glucose levels and improve metabolic function.",
      "Jackfruit Leaf: Supports glycaemic control and slows carbohydrate absorption.",
      "Garcinia: Supports metabolic balance and helps manage weight-related factors.",
    ],
  },
  "Brain Tonic": {
    list: [
      {
        key: "Main Ingredients",
        val: "Brahmi, Gotu Kola, Ashwagandha, Shankhpushpi, Jatamansi, Mulethi",
      },
      {
        key: "Other Ingredients",
        val: "Hydroxypropyl Methylcellulose (HPMC), Microcrystalline Cellulose capsule",
      },
    ],
    pills: [
      "Brahmi",
      "Gotu Kola",
      "Ashwagandha",
      "Shankhpushpi",
      "Jatamansi",
      "Mulethi",
    ],
    details: [
      "Brahmi: Powerful nootropic that enhances memory and cognitive function.",
      "Gotu Kola: Supports brain circulation and mental clarity.",
      "Ashwagandha: Helps reduce stress and improve cognitive performance.",
      "Shankhpushpi: Traditional herb for enhancing memory and focus.",
      "Jatamansi: Supports mental calmness and reduces stress-related fatigue.",
      "Mulethi: Supports nervous system health and cognitive balance.",
    ],
  },
  "General Health": {
    list: [
      {
        key: "Main Ingredients",
        val: "Ashwagandha, Amla, Giloy, Tulsi, Turmeric, Shatavari",
      },
      {
        key: "Other Ingredients",
        val: "Hydroxypropyl Methylcellulose (HPMC), Microcrystalline Cellulose capsule",
      },
    ],
    pills: ["Ashwagandha", "Amla", "Giloy", "Tulsi", "Turmeric", "Shatavari"],
    details: [
      "Ashwagandha: Supports energy, stress management, and vitality.",
      "Amla: Rich in Vitamin C, supports immunity and overall health.",
      "Giloy: Known for immune-boosting and detoxifying properties.",
      "Tulsi: Supports respiratory health and immune balance.",
      "Turmeric: Provides anti-inflammatory and antioxidant support.",
      "Shatavari: Supports hormonal balance and overall vitality.",
    ],
  },
  "Vitality Power Plus": {
    list: [
      {
        key: "Main Ingredients",
        val: "Ashwagandha, Safed Musli, Shilajit, Kaunch Beej, Gokshura",
      },
      {
        key: "Other Ingredients",
        val: "Hydroxypropyl Methylcellulose (HPMC), Microcrystalline Cellulose capsule",
      },
    ],
    pills: [
      "Ashwagandha",
      "Safed Musli",
      "Shilajit",
      "Kaunch Beej",
      "Gokshura",
    ],
    details: [
      "Ashwagandha: Enhances strength, stamina, and stress resilience.",
      "Safed Musli: Supports energy, stamina, and physical performance.",
      "Shilajit: Boosts vitality, endurance, and overall energy levels.",
      "Kaunch Beej: Supports strength, performance, and vitality.",
      "Gokshura: Promotes stamina, strength, and overall wellness.",
    ],
  },
};

const INGREDIENT_IMAGES = [ashwagandhaImg, brahmiImg, amlaImg];

const normalizeStringList = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map((item) => String(item).trim()).filter(Boolean);
        }
      } catch {
        // Fall back to comma-separated parsing below.
      }
    }
    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const buildPacks = (product) => {
  if (Array.isArray(product?.priceTiers) && product.priceTiers.length > 0) {
    return product.priceTiers.map((tier) => ({
      qty: parseInt(tier.quantity),
      price: Math.round(parseFloat(tier.finalPrice || tier.price)),
      orig: Math.round(parseFloat(tier.price)),
      perUnit:
        parseFloat(tier.finalPrice || tier.price) / parseInt(tier.quantity),
      tag: tier.label,
      duration: tier.label || `${tier.quantity} Capsules`,
      desc: tier.label
        ? `${tier.quantity} Capsules pack`
        : "Quality supplement",
    }));
  }

  const fp = parseFloat(product?.finalPrice || 0);
  const op = parseFloat(product?.price || 0);
  return [
    {
      qty: 30,
      price: Math.round(fp * 0.75),
      orig: Math.round(op * 0.75),
      perUnit: (fp * 0.75) / 30,
      tag: null,
      duration: "1 Month",
      desc: "Starter pack",
    },
    {
      qty: 60,
      price: Math.round(fp * 1.35),
      orig: Math.round(op * 1.35),
      perUnit: (fp * 1.35) / 60,
      tag: "Best Value",
      duration: "2 Months",
      desc: "Most savings",
    },
    {
      qty: 90,
      price: Math.round(fp * 1.9),
      orig: Math.round(op * 1.9),
      perUnit: (fp * 1.9) / 90,
      tag: "Most Popular",
      duration: "3 Months",
      desc: "Best results",
    },
  ];
};

const TABS = [
  { id: "benefits", label: "Benefits", Icon: Check },
  { id: "description", label: "Description", Icon: Info },
  { id: "ingredients", label: "Ingredients", Icon: Leaf },
  { id: "howToUse", label: "How to Take", Icon: BookOpen },
  { id: "warning", label: "Warnings", Icon: AlertTriangle },
  { id: "beforeAfter", label: "Before & After", Icon: ImageIcon },
  { id: "reviews", label: "Reviews", Icon: Star },
];

const StarRow = ({ rating, size = 14 }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={size}
        className={
          i <= Math.round(rating)
            ? "fill-amber-400 text-amber-400"
            : "fill-gray-200 text-gray-200"
        }
      />
    ))}
  </div>
);

const RatingBar = ({ label, value }) => (
  <div className="flex items-center gap-3 text-sm">
    <span className="text-[var(--color-text-muted)] w-8 shrink-0 text-lg">
      {label}
    </span>
    <div className="flex-1 h-1.5 bg-gray-100 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full bg-gray-400"
      />
    </div>
    <span className="text-[var(--color-text-secondary)] w-8 text-right text-xs">
      {Math.round(value)}%
    </span>
  </div>
);

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function SingleProduct() {
  const { id: productId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [activeImg, setActiveImg] = useState(0);
  const [packIdx, setPackIdx] = useState(1);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("benefits");
  const [pincode, setPincode] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState(null);
  const [showIngredientModal, setShowIngredientModal] = useState(false);
  const [activeIngredientPill, setActiveIngredientPill] = useState(null);
  const [hoveredIngredientPill, setHoveredIngredientPill] = useState(null);
  const tabsSectionRef = useRef(null);
  const [imageZoom, setImageZoom] = useState({
    active: false,
    x: 50,
    y: 50,
    panelLeft: 0,
    panelTop: 0,
    panelSize: 520,
  });

  const { data: productData, isLoading: loading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });
  const product = productData ?? null;

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: isAuthenticated,
  });

  const wishlisted = useMemo(() => {
    const items = wishlistData?.data || [];
    return items.some((w) => (w.productId || w.product?.id) === productId);
  }, [wishlistData, productId]);

  const wishlistMut = useMutation({
    mutationFn: () =>
      wishlisted ? removeFromWishlist(productId) : addToWishlist({ productId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success(
        wishlisted ? "Removed from wishlist" : "Added to wishlist!",
      );
    },
    onError: (err) => {
      if (err.response?.status === 401) {
        toast.error("Please login first.");
        navigate("/login");
      } else toast.error("Failed to update wishlist.");
    },
  });

  const productContent = product?.content;
  const benefits =
    productContent?.benefits?.length > 0
      ? productContent.benefits
      : BENEFITS_LIST;
  const warnings =
    productContent?.warnings?.length > 0
      ? productContent.warnings
      : WARNING_LIST;
  const howToUse =
    productContent?.howToUse?.length > 0
      ? productContent.howToUse
      : [
          {
            step: "01",
            title: "Morning Routine",
            desc: "Take 2 capsules with warm water or milk every morning after breakfast.",
            icon: "☀️",
          },
          {
            step: "02",
            title: "Stay Consistent",
            desc: "Use daily for a minimum of 8 weeks for optimal benefits.",
            icon: "📅",
          },
          {
            step: "03",
            title: "Stay Hydrated",
            desc: "Drink at least 2–3 litres of water daily while taking this supplement.",
            icon: "💧",
          },
          {
            step: "04",
            title: "Proper Storage",
            desc: "Store in a cool, dry place away from direct sunlight.",
            icon: "🏠",
          },
        ];
  const ingredients =
    productContent?.ingredients?.list?.length > 0
      ? productContent.ingredients
      : PRODUCT_INGREDIENTS[product?.productName] || {
          list: [],
          pills: [],
          details: [],
        };
  const beforeAfter = productContent?.beforeAfter || [];

  const addMut = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Added to cart!");
    },
    onError: (err) => {
      if (err.response?.status === 401) {
        toast.error("Please login first.");
        navigate("/login");
      } else toast.error("Failed to add to cart.");
    },
  });

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }
    addMut.mutate({ productId, quantity: qty });
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }
    addMut.mutate(
      { productId, quantity: qty },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: ["cart"] });
          navigate("/checkout");
        },
      },
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const IMAGES = getProductImageSet(product);
  const activeImageUrl = IMAGES[activeImg]?.url;
  const PACKS = product ? buildPacks(product) : [];
  const heroTabs = TABS.filter(({ id }) =>
    ["benefits", "description", "ingredients", "howToUse"].includes(id),
  );

  useEffect(() => {
    if (PACKS.length > 0) {
      setPackIdx(Math.min(1, PACKS.length - 1));
    }
  }, [productId, PACKS.length]);

  useEffect(() => {
    setActiveImg(0);
  }, [productId]);

  const pack = PACKS[packIdx] ?? {};
  const discPct = pack.orig
    ? Math.round(((pack.orig - pack.price) / pack.orig) * 100)
    : 0;

  const productTags = normalizeStringList(product?.productTags);
  const offerTags = normalizeStringList(product?.offerTags);
  const normalizeIngredientName = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  const ingredientCards = (ingredients.details || []).map((item, index) => {
    const name = item.name || item.split?.(": ")?.[0];
    const desc = item.desc || item.split?.(": ")?.[1];
    const img =
      item.image || INGREDIENT_IMAGES[index % INGREDIENT_IMAGES.length];

    return { name, desc, img, index };
  });
  const getMatchingIngredientPill = (name) => {
    const cardName = normalizeIngredientName(name);

    return (
      ingredients.pills?.find((pill) => {
        const pillName = normalizeIngredientName(pill);

        return (
          cardName === pillName ||
          cardName.includes(pillName) ||
          pillName.includes(cardName)
        );
      }) || name
    );
  };
  const previewIngredientPill = activeIngredientPill || hoveredIngredientPill;
  const selectedIngredientCards = previewIngredientPill
    ? ingredientCards.filter((item) => {
        const pillName = normalizeIngredientName(previewIngredientPill);
        const itemName = normalizeIngredientName(item.name);

        return (
          itemName === pillName ||
          itemName.includes(pillName) ||
          pillName.includes(itemName)
        );
      })
    : ingredientCards;
  const showSelectedIngredient =
    previewIngredientPill && selectedIngredientCards.length > 0;
  const handleImageZoomMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const availableWidth = window.innerWidth - rect.right - 36;
    const panelSize = Math.min(680, Math.max(420, availableWidth));

    setImageZoom({
      active: true,
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
      panelLeft: rect.right + 18,
      panelTop: Math.max(
        88,
        Math.min(rect.top, window.innerHeight - panelSize - 16),
      ),
      panelSize,
    });
  };

  const hideImageZoom = () => {
    setImageZoom((current) => ({ ...current, active: false }));
  };

  const checkPincode = () => {
    if (pincode.length !== 6) {
      setPincodeMsg({ type: "error", msg: "Enter a valid 6-digit pincode." });
      return;
    }
    const state = pincodeData[pincode];
    if (!state) {
      setPincodeMsg({
        type: "error",
        msg: "Sorry, delivery is not available to this pincode.",
      });
      return;
    }
    const FAST_STATES = ["TAMIL NADU"];
    const MEDIUM_STATES = [
      "KERALA",
      "KARNATAKA",
      "ANDHRA PRADESH",
      "TELANGANA",
    ];
    const days = FAST_STATES.includes(state)
      ? 4
      : MEDIUM_STATES.includes(state)
        ? 5
        : 7;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + days);
    const formattedDate = deliveryDate.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const stateName = state
      .split(" ")
      .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
      .join(" ");
    setPincodeMsg({
      type: "success",
      msg: `Delivery to ${stateName} by ${formattedDate}`,
      days,
      stateName,
    });
  };

  const navigateToTabSection = (tabId) => {
    setActiveTab(tabId);
    requestAnimationFrame(() => {
      tabsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-2 border-gray-400/30 border-t-gray-400"
        />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[var(--color-text)]">
        <p className="text-2xl text-[var(--color-text-muted)] tracking-tight">
          Product not found
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm text-[var(--color-text-muted)] hover:underline"
        >
          Go back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-[var(--color-text)] selection:bg-[var(--color-sage-light)]">
      <ProductBreadcrumb productName={product.productName} navigate={navigate} />

      <div className="max-w-[1460px] mx-auto px-4 lg:px-5 pt-3 lg:pt-4 pb-10 lg:pb-14">
        <div className="grid items-start gap-6 2xl:grid-cols-[minmax(0,0.92fr)_minmax(360px,1fr)] 2xl:gap-10">
          <ProductImageGallery
            product={product}
            IMAGES={IMAGES}
            activeImg={activeImg}
            setActiveImg={setActiveImg}
            activeImageUrl={activeImageUrl}
            imageZoom={imageZoom}
            handleImageZoomMove={handleImageZoomMove}
            hideImageZoom={hideImageZoom}
            discPct={discPct}
            offerTags={offerTags}
          />

          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="space-y-0"
            >
              <ProductMeta
                product={product}
                productTags={productTags}
                wishlisted={wishlisted}
                wishlistMut={wishlistMut}
                isAuthenticated={isAuthenticated}
                navigate={navigate}
                benefits={benefits}
                warnings={warnings}
                howToUse={howToUse}
                ingredients={ingredients}
                StarRow={StarRow}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onNavigateTab={navigateToTabSection}
                tabs={heroTabs}
              />
              <ProductPackSelector
                PACKS={PACKS}
                packIdx={packIdx}
                setPackIdx={setPackIdx}
              />
              <ProductActions
                qty={qty}
                setQty={setQty}
                handleAddToCart={handleAddToCart}
                handleBuyNow={handleBuyNow}
                addMut={addMut}
              />
              <ProductOffers OFFERS={OFFERS} />
              <ProductPincodeCheck
                pincode={pincode}
                setPincode={setPincode}
                pincodeMsg={pincodeMsg}
                setPincodeMsg={setPincodeMsg}
                checkPincode={checkPincode}
              />
              <ProductTrustBadges />
            </motion.div>
          </div>
        </div>
      </div>

      <ProductOffersStrip OFFERS={OFFERS} fadeInUp={fadeInUp} />

      <ProductTabs
        sectionRef={tabsSectionRef}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        TABS={TABS}
        fadeInUp={fadeInUp}
        product={product}
        benefits={benefits}
        warnings={warnings}
        howToUse={howToUse}
        beforeAfter={beforeAfter}
        ingredients={ingredients}
        ingredientCards={ingredientCards}
        getMatchingIngredientPill={getMatchingIngredientPill}
        showSelectedIngredient={showSelectedIngredient}
        selectedIngredientCards={selectedIngredientCards}
        previewIngredientPill={previewIngredientPill}
        activeIngredientPill={activeIngredientPill}
        setActiveIngredientPill={setActiveIngredientPill}
        setHoveredIngredientPill={setHoveredIngredientPill}
        setShowIngredientModal={setShowIngredientModal}
        showIngredientModal={showIngredientModal}
        StarRow={StarRow}
        RatingBar={RatingBar}
        REVIEWS={REVIEWS}
      />

      <motion.div
        {...fadeInUp}
        className="max-w-[1400px] mx-auto px-3 lg:px-4 pb-16"
      >
        <RelatedProduct />
      </motion.div>

      <ReviewSection />
      <FAQ productName={product.productName} />

      <ProductStickyBar
        pack={pack}
        handleAddToCart={handleAddToCart}
        handleBuyNow={handleBuyNow}
        addMut={addMut}
      />
    </div>
  );
}
