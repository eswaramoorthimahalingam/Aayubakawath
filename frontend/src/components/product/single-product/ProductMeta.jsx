import { Heart, Share2 } from "lucide-react";
import { toast } from "react-toastify";

const splitIntoChunks = (text, sentencesPerChunk = 2) => {
  const sentences = String(text || "")
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (sentences.length === 0) return [];

  const chunks = [];

  for (let index = 0; index < sentences.length; index += sentencesPerChunk) {
    chunks.push(sentences.slice(index, index + sentencesPerChunk).join(" "));
  }

  return chunks;
};

const formatList = (items) => {
  const values = (items || []).filter(Boolean);

  if (values.length === 0) return "";
  if (values.length === 1) return values[0];
  if (values.length === 2) return `${values[0]} and ${values[1]}`;

  return `${values.slice(0, -1).join(", ")}, and ${values[values.length - 1]}`;
};

export default function ProductMeta({
  product,
  productTags,
  wishlisted,
  wishlistMut,
  isAuthenticated,
  navigate,
  benefits,
  warnings,
  howToUse,
  ingredients,
  StarRow,
  activeTab,
  setActiveTab,
  onNavigateTab,
  tabs,
}) {
  const rating = Number(product?.rating || 4.7);
  const reviewCount = Number(product?.reviewCount || 1248);
  const mainIngredientRow = ingredients?.list?.find((item) =>
    /main/i.test(item.key),
  );
  const ingredientNames = ingredients?.pills?.slice(0, 5) || [];
  const benefitHighlights = benefits.slice(0, 4);
  const descriptionChunks = splitIntoChunks(
    product.content?.description || product.productDescription,
    2,
  );
  const fallbackDescription = ingredientNames.length
    ? `This formula brings together ${formatList(ingredientNames)} to support ${(
        product.forWhom || "everyday wellness"
      ).toLowerCase()} in a simple daily routine.`
    : "This formula is designed for consistent daily use and a simpler wellness routine.";
  const topChips = [
    ...productTags
      .map((item) => String(item || "").trim())
      .filter(Boolean)
      .filter((item) => !/^not specified$/i.test(item))
      .filter((item) => !/^over all$/i.test(item)),
    ...benefits.map((item) => item.key),
  ]
    .filter((item, index, list) => {
      const normalized = item.toLowerCase();
      return list.findIndex((entry) => entry.toLowerCase() === normalized) === index;
    })
    .slice(0, 3);

  const heroContent = (() => {
    if (activeTab === "description") {
      return {
        type: "paragraphs",
        items:
          descriptionChunks.length > 0
            ? descriptionChunks.slice(0, 2)
            : [
                product.productDescription,
                fallbackDescription,
              ].filter(Boolean),
      };
    }

    if (activeTab === "ingredients") {
      const ingredientSummary = mainIngredientRow?.val
        ? `${product.productName} is built around ${mainIngredientRow.val}.`
        : ingredientNames.length > 0
          ? `This formula features ${formatList(ingredientNames)} as its key wellness ingredients.`
          : "This formulation uses a carefully selected herbal ingredient profile.";

      return {
        type: "paragraphs",
        items: [
          ingredientSummary,
          `Each ingredient is chosen to support ${(product.forWhom || "daily wellness").toLowerCase()} while keeping the routine easy to follow and consistent.`,
        ],
      };
    }

    if (activeTab === "howToUse") {
      return {
        type: "steps",
        items: howToUse.slice(0, 3),
      };
    }

    return {
      type: "bullets",
      items: benefitHighlights.map((item) => item.summary || item.val || item.key),
    };
  })();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.productName,
          text: product.productDescription,
          url: window.location.href,
        });
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied.");
    } catch {
      toast.error("Unable to share right now.");
    }
  };

  return (
    <div className="space-y-3 lg:space-y-[18px] text-left">
      {topChips.length > 0 ? (
        <div className="flex flex-wrap gap-2.5">
          {topChips.map((item) => (
            <span
              key={item}
              className="rounded-md bg-[#fbebcf] px-3.5 py-2 text-[0.88rem] leading-none text-[#7c5a1d]"
            >
              {item}
            </span>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h1 className="max-w-[14ch] text-[2.1rem] leading-[1.02] text-[var(--color-text)] sm:text-[2.4rem] lg:text-[2.7rem]">
            {product.productName}
          </h1>
        </div>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <button
            onClick={() => {
              if (!isAuthenticated) {
                toast.error("Please login first.");
                navigate("/login");
                return;
              }
              wishlistMut.mutate();
            }}
            disabled={wishlistMut.isPending}
            aria-label="Add to wishlist"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white transition-colors hover:border-black disabled:opacity-60"
          >
            <Heart
              size={18}
              className={
                wishlisted
                  ? "fill-red-500 text-red-500"
                  : "text-[var(--color-text-secondary)]"
              }
            />
          </button>
          <button
            onClick={handleShare}
            aria-label="Share product"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white transition-colors hover:border-black"
          >
            <Share2
              size={18}
              className="text-[var(--color-text-secondary)]"
            />
          </button>
        </div>
      </div>

      <div className="space-y-2 border-b border-[var(--color-border)] pb-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.98rem]">
          <StarRow rating={rating} size={16} />
          <span className="font-semibold text-[var(--color-text)]">
            {reviewCount.toLocaleString()} Reviews
          </span>
          <button
            onClick={() =>
              onNavigateTab ? onNavigateTab("reviews") : setActiveTab("reviews")
            }
            className="underline underline-offset-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
          >
            See review summary
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.96rem] text-[var(--color-text-secondary)]">
          <StarRow rating={4.4} size={16} />
          <span className="font-semibold text-[var(--color-text)]">
            1,163 ratings
          </span>
          <span>from Amazon</span>
        </div>

        <p className="pt-0.5 text-[1.02rem] leading-none text-[var(--color-text)]">
          Clinicians&apos; Choice
        </p>

        <p className="max-w-[40rem] text-[0.98rem] leading-[1.55] text-[var(--color-text-secondary)]">
          <span className="font-semibold text-[var(--color-text)]">
            1,329 clinicians
          </span>{" "}
          share this for {(product.forWhom || "daily wellness").toLowerCase()} support without compensation.
        </p>

        <div className="flex items-center gap-2.5 pt-0.5">
          <div className="flex -space-x-2">
            {["A", "R", "V"].map((item) => (
              <span
                key={item}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-[#efe7d7] text-[0.76rem] font-semibold text-[var(--color-text)]"
              >
                {item}
              </span>
            ))}
          </div>
          <button
            onClick={() =>
              onNavigateTab
                ? onNavigateTab("description")
                : setActiveTab("description")
            }
            className="text-[0.96rem] underline underline-offset-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
          >
            View clinicians & learn more
          </button>
        </div>
      </div>

      <div className="border-b border-[var(--color-border)]">
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`-mb-px border-b-2 pb-2 text-[0.98rem] transition-colors ${
                activeTab === tab.id
                  ? "border-[var(--color-sage)] text-[var(--color-text)]"
                  : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5 pt-0.5">
        {heroContent.type === "paragraphs" &&
          heroContent.items.map((item, index) => (
            <p
              key={index}
              className="text-[0.98rem] leading-[1.68] text-[var(--color-text-secondary)]"
            >
              {item}
            </p>
          ))}

        {heroContent.type === "bullets" && (
          <ul className="space-y-1.5 pl-6">
            {heroContent.items.map((item, index) => (
              <li
                key={index}
                className="text-[0.98rem] leading-[1.5] text-[var(--color-text-secondary)]"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {heroContent.type === "steps" && (
          <div className="space-y-2">
            {heroContent.items.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-[var(--color-border)] text-[0.72rem] text-[var(--color-text-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.96rem] leading-[1.6] text-[var(--color-text-secondary)]">
                  <span className="font-semibold text-[var(--color-text)]">
                    {item.title}:{" "}
                  </span>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
