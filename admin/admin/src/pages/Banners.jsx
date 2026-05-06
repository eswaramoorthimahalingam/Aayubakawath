import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getHomeBanners,
  createHomeBanner,
  deleteHomeBanner,
  getOfferBanners,
  createOfferBanner,
  deleteOfferBanner,
  getCategoryBanners,
  createCategoryBanner,
  deleteCategoryBanner,
} from "../services/bannerService";
import { getAllCategories } from "../services/categoryService";
import { Card, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useToast } from "../context/ToastContext";
import { Image, Trash2, Upload } from "lucide-react";

const tabs = [
  { key: "home", label: "Home Hero" },
  { key: "offer", label: "Offer Banner" },
  { key: "category", label: "Category Banner" },
];

const bannerHooks = {
  home: {
    get: getHomeBanners,
    create: createHomeBanner,
    delete: deleteHomeBanner,
    queryKey: "homeBanners",
  },
  offer: {
    get: getOfferBanners,
    create: createOfferBanner,
    delete: deleteOfferBanner,
    queryKey: "offerBanners",
  },
  category: {
    get: getCategoryBanners,
    create: createCategoryBanner,
    delete: deleteCategoryBanner,
    queryKey: "categoryBanners",
  },
};

const bannerMeta = {
  home: {
    title: "Home page top banner",
    subtitle:
      "Use this tab to choose and update the images shown in the first carousel on the public home page.",
    uploadLabel: "Upload home banner",
    emptyLabel: "No home page banners uploaded yet",
    placementLabel: "Live placement",
    placementValue: "Home page > top hero slider",
    tips: [
      "Recommended style: Futura Regular, white background, black text, and #829b1c used only as a light accent.",
      "Best results come from wide desktop banners such as 2048x473 or 1920x600.",
      "Upload more than one image here if you want the home page hero to rotate through multiple banners.",
    ],
  },
  offer: {
    title: "Offer banner",
    subtitle:
      "These banners are shown in the promotional full-width offer section on the storefront.",
    uploadLabel: "Upload offer banner",
    emptyLabel: "No offer banners uploaded yet",
    placementLabel: "Live placement",
    placementValue: "Home page > offer banner section",
    tips: [
      "Keep the message bold and simple with a clear offer or coupon.",
      "Use wide artwork and keep important content toward the center safe zone.",
      "One strong banner usually performs better than several busy designs.",
    ],
  },
  category: {
    title: "Category page banner",
    subtitle:
      "Assign each uploaded banner to a category so it appears on the matching product listing experience.",
    uploadLabel: "Upload category banner",
    emptyLabel: "No category banners uploaded yet",
    placementLabel: "Live placement",
    placementValue: "Category and product listing views",
    tips: [
      "Pick the correct category before uploading the image.",
      "Use clean copy and leave breathing room around products or ingredients.",
      "Keep the visual language consistent with the main site palette.",
    ],
  },
};

export default function Banners() {
  const [activeTab, setActiveTab] = useState("home");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const hook = bannerHooks[activeTab];
  const activeMeta = bannerMeta[activeTab];

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const { data: banners = [], isLoading } = useQuery({
    queryKey: [hook.queryKey],
    queryFn: hook.get,
    enabled: true,
  });

  const createMutation = useMutation({
    mutationFn: hook.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [hook.queryKey] });
      addToast("Banner uploaded", "success");
      setImage(null);
      setPreview(null);
    },
    onError: () => addToast("Failed to upload banner", "error"),
  });

  const deleteMutation = useMutation({
    mutationFn: hook.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [hook.queryKey] });
      addToast("Banner deleted", "success");
    },
    onError: () => addToast("Failed to delete banner", "error"),
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) return;
    if (activeTab === "category" && !categoryId) {
      addToast("Please select a category", "error");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    if (activeTab === "category") formData.append("categoryId", categoryId);
    createMutation.mutate(formData);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const switchTab = (key) => {
    setActiveTab(key);
    setImage(null);
    setPreview(null);
    setCategoryId("");
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Banners
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Manage homepage, offer, and category banners
        </p>
      </div>

      <Card variant="elevated">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => switchTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <CardBody>
          <div className="mb-6 rounded-2xl border border-[#dbe3b8] bg-[#fafcf3] p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#829b1c] shadow-sm">
                <Image className="h-5 w-5" />
              </div>
              <div className="space-y-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {activeMeta.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    {activeMeta.subtitle}
                  </p>
                </div>
                <div className="rounded-xl border border-[#e5ebcc] bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#829b1c]">
                    {activeMeta.placementLabel}
                  </p>
                  <p className="mt-1 text-sm text-gray-800">
                    {activeMeta.placementValue}
                  </p>
                </div>
                <div className="space-y-2">
                  {activeMeta.tips.map((tip) => (
                    <div key={tip} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#829b1c]" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Upload Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-gray-300 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4 block mx-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
              {activeTab === "category" && (
                <div className="mb-4 max-w-md mx-auto text-left">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                    Category
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg mx-auto mb-4"
                />
              )}
              <Button
                type="submit"
                variant="primary"
                loading={createMutation.isPending}
                disabled={!image || (activeTab === "category" && !categoryId)}
                icon={<Upload className="w-4 h-4" />}
              >
                {activeMeta.uploadLabel}
              </Button>
            </div>
          </form>

          {/* Banner Grid */}
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-56 bg-gray-100 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : banners.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm">
              {activeMeta.emptyLabel}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden group"
                >
                  <img
                    src={banner.image}
                    alt="Banner"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#829b1c]">
                        {activeTab === "home"
                          ? `Slide ${index + 1}`
                          : activeTab === "offer"
                            ? "Offer section"
                            : "Category banner"}
                      </span>
                      <span className="text-sm text-gray-500">Banner Image</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(banner.id)}
                      loading={deleteMutation.isPending}
                      icon={<Trash2 className="w-3.5 h-3.5 text-red-500" />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
