import React,{useState,useEffect,useRef} from 'react'
import banner from '../../../assets/images/ban_img.jpeg'

export default function ShopPageBanner() {
   const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full max-w-full overflow-x-hidden px-4 sm:px-6 py-8 sm:py-10">
      <div
        ref={ref}
        className="relative w-full max-w-full overflow-hidden shadow-lg"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(0.96) translateY(32px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Image */}
        <img
          src={banner}
          alt="Banner"
          className="block w-full max-w-full h-auto"
          style={{
            transform: visible ? "scale(1)" : "scale(1.05)",
            transition: "transform 0.9s ease",
          }}
        />
      </div>
    </div>
  );
}
