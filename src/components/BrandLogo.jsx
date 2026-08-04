import React from "react";

const BrandLogo = ({ name, logo, className = "", size = 40, style = {} }) => {
  // Fallback colors when no logo image is available
  const getBrandColors = () => {
    switch (name.toLowerCase()) {
      case "akari":
        return { primary: "#DC2626", secondary: "#111827" };
      case "bosch":
        return { primary: "#005691", secondary: "#FFFFFF" };
      case "makita":
        return { primary: "#008B9B", secondary: "#111827" };
      case "dewalt":
        return { primary: "#FFCD00", secondary: "#000000" };
      case "hikoki":
        return { primary: "#004A99", secondary: "#111827" };
      case "stihl":
        return { primary: "#FF6600", secondary: "#111827" };
      default:
        return { primary: "#4B5563", secondary: "#111827" };
    }
  };

  const colors = getBrandColors();

  // If a logo URL is provided, show the image
  if (logo && logo.trim() !== "") {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{
          width: size,
          height: size,
          overflow: "hidden",
          ...style,
        }}
      >
        <img
          src={logo}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    );
  }

  // Fallback: brand name with colored underline
  return (
    <div
      className={`flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 border border-gray-200 transition-all hover:shadow-md ${className}`}
      style={{ width: size * 3, height: size, ...style }}
    >
      <div
        className="font-bold tracking-tighter text-sm md:text-base uppercase"
        style={{ color: colors.primary }}
      >
        {name}
      </div>
      <div
        className="h-1 w-full mt-1 rounded-full"
        style={{ backgroundColor: colors.primary, opacity: 0.2 }}
      />
    </div>
  );
};

export default BrandLogo;
