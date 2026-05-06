const normalizeProductName = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const lotusMark = `
  <g transform="translate(500 382)">
    <path d="M0 -26C18 -42 34 -48 48 -50C38 -28 25 -10 0 0C-25 -10 -38 -28 -48 -50C-34 -48 -18 -42 0 -26Z" fill="#a01812"/>
    <path d="M0 -40C11 -61 28 -73 45 -78C42 -56 28 -36 8 -26L0 -22L-8 -26C-28 -36 -42 -56 -45 -78C-28 -73 -11 -61 0 -40Z" fill="#dd7d43"/>
    <path d="M0 -92C14 -92 25 -81 25 -67C25 -54 14 -43 0 -43C-14 -43 -25 -54 -25 -67C-25 -81 -14 -92 0 -92Z" fill="#93b01e"/>
  </g>
`;

const iconSugar = `
  <g transform="translate(500 586)" stroke="#2550b4" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M0 -65C35 -28 41 12 0 54C-41 12 -35 -28 0 -65Z"/>
    <path d="M0 -28C-16 -7 -17 11 -5 24C4 33 16 33 25 24C37 11 36 -7 20 -28"/>
    <circle cx="-4" cy="-9" r="6.5"/>
    <circle cx="18" cy="-1" r="6.5"/>
    <circle cx="-19" cy="13" r="6.5"/>
    <circle cx="9" cy="20" r="6.5"/>
    <path d="M2 -3L12 -1"/>
    <path d="M-10 -5L-3 -8"/>
    <path d="M-13 10L-2 16"/>
    <path d="M14 5L11 14"/>
    <path d="M-38 44C-22 46 -10 48 0 50C10 48 22 46 38 44"/>
    <path d="M-76 20C-48 40 -27 50 0 54C27 50 48 40 76 20"/>
  </g>
`;

const iconCholesterol = `
  <g transform="translate(500 586)" stroke="#2550b4" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M0 -64C34 -31 40 7 0 50C-40 7 -34 -31 0 -64Z"/>
    <path d="M-18 -2C-18 -20 -4 -34 14 -34C31 -34 45 -20 45 -2C45 26 15 42 0 58C-15 42 -46 26 -46 -2C-46 -20 -32 -34 -15 -34C-3 -34 8 -28 14 -18"/>
    <circle cx="15" cy="4" r="8"/>
    <path d="M-7 9L7 5"/>
    <path d="M22 12L30 19"/>
    <path d="M-22 20L-11 25"/>
    <path d="M-66 21C-42 39 -21 49 0 52C21 49 42 39 66 21"/>
  </g>
`;

const iconBrain = `
  <g transform="translate(500 586)" stroke="#2550b4" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M-83 36C-55 18 -30 15 -16 27C-9 17 0 12 14 14C20 2 35 -8 54 2C70 10 74 25 70 39C82 45 90 58 88 72C84 94 60 104 41 98H-31C-53 98 -72 81 -72 59C-72 50 -68 41 -61 34"/>
    <path d="M-30 82C-21 72 -21 61 -29 53C-36 45 -36 35 -28 27C-20 19 -20 9 -28 1"/>
    <path d="M-5 82C2 72 2 63 -5 55C-11 48 -10 39 -2 32C6 24 5 15 -2 7"/>
    <path d="M20 82C26 73 26 64 18 56C10 48 11 38 18 31C25 23 26 13 20 4"/>
    <path d="M44 80C52 71 53 62 46 54C39 46 39 36 46 29C53 21 54 11 47 2"/>
    <path d="M-92 64C-67 62 -44 62 -18 66"/>
    <path d="M59 69C78 69 93 67 104 62"/>
  </g>
  <path d="M374 584C393 576 412 575 431 584C451 593 469 593 488 584C507 575 526 575 545 584C564 593 583 593 602 584C620 576 636 575 650 581" stroke="#2550b4" stroke-width="4.4" stroke-linecap="round" fill="none"/>
`;

const iconVitality = `
  <g transform="translate(500 586)" stroke="#2550b4" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M0 -62C13 -32 27 -12 48 8C22 16 7 35 0 63C-7 35 -22 16 -48 8C-27 -12 -13 -32 0 -62Z"/>
    <path d="M0 -34C12 -34 22 -24 22 -12C22 0 12 10 0 10C-12 10 -22 0 -22 -12C-22 -24 -12 -34 0 -34Z"/>
    <path d="M0 8V36"/>
    <path d="M-10 36C-22 60 -37 74 -61 82"/>
    <path d="M10 36C22 60 37 74 61 82"/>
    <path d="M-30 10C-45 15 -57 26 -71 42"/>
    <path d="M30 10C45 15 57 26 71 42"/>
    <path d="M-34 83C-18 74 -8 70 0 69C8 70 18 74 34 83"/>
    <path d="M-71 82C-48 88 -22 92 0 94C22 92 48 88 71 82"/>
    <path d="M-32 106C-16 93 -7 89 0 88C7 89 16 93 32 106"/>
  </g>
`;

const iconGeneralHealth = `
  <g transform="translate(500 586)" stroke="#2550b4" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M0 -60C14 -31 28 -12 49 8C23 17 7 35 0 63C-7 35 -23 17 -49 8C-28 -12 -14 -31 0 -60Z"/>
    <path d="M0 -34C12 -34 22 -24 22 -12C22 0 12 10 0 10C-12 10 -22 0 -22 -12C-22 -24 -12 -34 0 -34Z"/>
    <path d="M0 9V38"/>
    <path d="M-14 42C-32 58 -49 68 -70 74"/>
    <path d="M14 42C32 58 49 68 70 74"/>
    <path d="M-82 -8C-55 3 -30 16 -12 31"/>
    <path d="M82 -8C55 3 30 16 12 31"/>
    <path d="M-40 85C-19 74 -8 70 0 69C8 70 19 74 40 85"/>
    <path d="M-68 80C-45 89 -22 94 0 96C22 94 45 89 68 80"/>
    <path d="M-16 111C-9 102 -4 98 0 98C4 98 9 102 16 111"/>
  </g>
`;

const vitalityCapsuleMark = `
  <path d="M492 754C497 742 505 736 510 736C515 736 519 741 519 748C519 759 510 762 500 767C492 763 486 759 486 751C486 744 489 739 494 739C497 739 500 742 502 747" fill="#ffffff" opacity="0.95"/>
`;

const buildBottleSvg = ({
  verticalTitle,
  verticalSubtitle = "",
  titleSize = 31,
  titleY = 619,
  copyLine1,
  copyLine2,
  supportLine,
  bottomLine = "DIETARY FOOD SUPPLEMENT",
  iconSvg,
  bottomMark = "",
}) => `
  <svg width="1000" height="1000" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="glassBlue" x1="500" y1="180" x2="500" y2="812" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#1f4aa9"/>
        <stop offset="0.17" stop-color="#17367f"/>
        <stop offset="0.38" stop-color="#10225b"/>
        <stop offset="0.78" stop-color="#22439b"/>
        <stop offset="1" stop-color="#0f1e53"/>
      </linearGradient>
      <linearGradient id="labelGlow" x1="350" y1="530" x2="650" y2="530" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#f7f7ff"/>
        <stop offset="0.48" stop-color="#ffffff"/>
        <stop offset="0.78" stop-color="#eef0ff"/>
        <stop offset="1" stop-color="#fafbff"/>
      </linearGradient>
      <linearGradient id="capsuleGreen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#28d4a1"/>
        <stop offset="1" stop-color="#058d74"/>
      </linearGradient>
      <linearGradient id="blueBand" x1="500" y1="700" x2="500" y2="804" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#2550b4"/>
        <stop offset="1" stop-color="#163b8f"/>
      </linearGradient>
      <pattern id="capLines" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="#0f131b"/>
        <rect x="2" width="2" height="12" fill="#293140"/>
      </pattern>
      <filter id="softShadow" x="250" y="120" width="500" height="760" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#0b1537" flood-opacity="0.18"/>
      </filter>
    </defs>

    <rect width="1000" height="1000" fill="#ffffff"/>
    <ellipse cx="500" cy="842" rx="198" ry="40" fill="#d9dfe9" fill-opacity="0.65"/>

    <g filter="url(#softShadow)">
      <rect x="328" y="122" width="344" height="120" rx="34" fill="#0a0d12"/>
      <rect x="328" y="156" width="344" height="70" rx="22" fill="url(#capLines)"/>
      <path d="M470 124H530C551 124 568 141 568 162V178C568 196 553 211 535 211H465C447 211 432 196 432 178V162C432 141 449 124 470 124Z" fill="#0f131b"/>
      <path d="M470 128H530C548 128 562 142 562 160V174C562 190 548 204 532 204H468C452 204 438 190 438 174V160C438 142 452 128 470 128Z" stroke="#3b4659" stroke-width="2"/>

      <rect x="360" y="232" width="280" height="66" rx="18" fill="url(#glassBlue)" opacity="0.96"/>
      <rect x="306" y="266" width="388" height="548" rx="78" fill="url(#glassBlue)"/>
      <rect x="306" y="266" width="388" height="548" rx="78" stroke="#244b9c" stroke-width="6"/>
      <path d="M332 286C332 276 340 268 350 268H406V812H350C340 812 332 804 332 794V286Z" fill="#ffffff" fill-opacity="0.18"/>

      <g opacity="0.98">
        <rect x="372" y="278" width="82" height="34" rx="17" transform="rotate(8 372 278)" fill="url(#capsuleGreen)"/>
        <rect x="456" y="270" width="84" height="34" rx="17" transform="rotate(-6 456 270)" fill="url(#capsuleGreen)"/>
        <rect x="536" y="282" width="82" height="34" rx="17" transform="rotate(8 536 282)" fill="url(#capsuleGreen)"/>
        <rect x="372" y="732" width="84" height="34" rx="17" transform="rotate(8 372 732)" fill="url(#capsuleGreen)"/>
        <rect x="460" y="742" width="84" height="34" rx="17" transform="rotate(-6 460 742)" fill="url(#capsuleGreen)"/>
        <rect x="548" y="732" width="82" height="34" rx="17" transform="rotate(10 548 732)" fill="url(#capsuleGreen)"/>
      </g>

      <rect x="350" y="321" width="300" height="395" rx="24" fill="url(#labelGlow)"/>
      <rect x="350" y="321" width="300" height="395" rx="24" stroke="#e3e6f6" stroke-width="3"/>

      ${lotusMark}

      <text x="500" y="445" text-anchor="middle" fill="#8b4d37" font-family="Georgia, 'Times New Roman', serif" font-size="24">Aayubakwath</text>
      <g fill="#1d46b5" font-family="'Trebuchet MS', Arial, sans-serif" font-weight="700" font-size="23">
        <text x="500" y="503" text-anchor="middle">${copyLine1}</text>
        <text x="500" y="530" text-anchor="middle">${copyLine2}</text>
      </g>

      ${iconSvg}

      <g fill="#202226" font-family="'Trebuchet MS', Arial, sans-serif">
        <text x="500" y="674" text-anchor="middle" font-size="14" font-weight="700">( ${supportLine} )</text>
        <text x="500" y="696" text-anchor="middle" font-size="14" font-weight="700">${bottomLine}</text>
      </g>

      <path d="M350 690H650V781C650 795 638 807 624 807H376C362 807 350 795 350 781V690Z" fill="url(#blueBand)"/>
      <path d="M350 710C403 721 457 727 500 727C543 727 597 721 650 710" stroke="#fbfdff" stroke-width="6" stroke-linecap="round" opacity="0.92"/>
      <path d="M380 747H435" stroke="#fbfdff" stroke-width="4" stroke-linecap="round"/>
      <path d="M565 747H620" stroke="#fbfdff" stroke-width="4" stroke-linecap="round"/>
      ${bottomMark}
      <text x="500" y="769" text-anchor="middle" fill="#ffffff" font-family="'Trebuchet MS', Arial, sans-serif" font-size="18" font-weight="700">60 Capsules</text>

      <g transform="translate(392 ${titleY}) rotate(-90)">
        <text x="0" y="0" fill="#1848b9" font-family="'Arial Black', Arial, sans-serif" font-size="${titleSize}" font-weight="900" letter-spacing="1.4">${verticalTitle}</text>
        ${verticalSubtitle ? `<text x="126" y="36" fill="#1d1d1d" font-family="'Trebuchet MS', Arial, sans-serif" font-size="20" font-weight="700">${verticalSubtitle}</text>` : ""}
      </g>
    </g>
  </svg>
`;

const buildDataUri = (svg) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

const PRODUCT_IMAGE_OVERRIDES = {};

const PRODUCTS_WITH_PRIMARY_IMAGE_ONLY = new Set([
  "af437986-b590-42b6-866f-7aac60def1a5",
  "72773df4-20e0-4033-9c50-d0cae9a9ce2d",
  "317a748b-8ff8-4533-9294-a208cc004ee5",
]);

const detectFormat = (url) => {
  if (String(url).startsWith("data:image/svg+xml")) {
    return "svg";
  }

  const cleanUrl = String(url).split("?")[0];
  const ext = cleanUrl.split(".").pop()?.toLowerCase();
  return ext || "image";
};

const toImageEntry = (url) => ({
  url,
  secureUrl: url,
  format: detectFormat(url),
  publicId: url,
});

export const getProductImageSet = (product) => {
  const override =
    PRODUCT_IMAGE_OVERRIDES[normalizeProductName(product?.productName)];

  if (override?.length) {
    return override.map(toImageEntry);
  }

  const backendImages = Array.isArray(product?.productImages)
    ? product.productImages
    : [];

  if (PRODUCTS_WITH_PRIMARY_IMAGE_ONLY.has(product?.id) && backendImages[0]) {
    return [backendImages[0]];
  }

  return backendImages;
};

export const getPrimaryProductImage = (product) => {
  const images = getProductImageSet(product);
  return images[0]?.secureUrl || images[0]?.url || "";
};
