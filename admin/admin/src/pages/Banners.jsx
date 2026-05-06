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
import ban1 from "../../../assets/images/ban1.jpeg";

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

export default function Banners() {
  const [activeTab, setActiveTab] = useState("home");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const hook = bannerHooks[activeTab];

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const { data: banners = [], isLoading } = useQuery({
    queryKey: [hook.queryKey],
    queryFn: hook.get,
  });

  const createMutation = useMutation({
    mutationFn: hook.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [hook.queryKey] });
      addToast("Banner uploaded", "success");
      setImage(null);
      setPreview(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: hook.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [hook.queryKey] });
      addToast("Banner deleted", "success");
    },
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

    const formData = new FormData();
    formData.append("image", image);

    if (activeTab === "category") {
      formData.append("categoryId", categoryId);
    }

    createMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Banners</h1>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4 block mx-auto"
              />

              {activeTab === "category" && (
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="mb-4 border rounded-lg px-3 py-2"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}

              {preview ? (
                <div className="w-full flex justify-center mb-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full max-w-5xl h-auto object-contain rounded-xl shadow-sm"
                  />
                </div>
              ) : (
                <div className="w-full flex justify-center mb-4">
                  <img
                    src={ban1}
                    alt="Local Banner"
                    className="w-full max-w-5xl h-auto object-contain rounded-xl shadow-sm"
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={!image}
                icon={<Upload className="w-4 h-4" />}
              >
                Upload Banner
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
