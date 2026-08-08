import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";

const slidesData = [
  {
    id: 1,
    badgeIcon: "fas fa-star",
    badgeText: "Bánh Ngon Cho Mọi Khoảnh Khắc",
    title: "Maison Sweet Bakery",
    description:
      "Tại Maison Sweet Bakery, chúng tôi luôn chọn lọc những nguyên liệu tươi mới và chất lượng cao. Mỗi chiếc bánh đều được làm thủ công với sự tỉ mỉ, nhằm mang đến hương vị thơm ngon, tinh tế và trọn vẹn nhất cho khách hàng..",
    btnText: "Xem ngay",
    btnLink: "/products",
    btnIcon: "fas fa-shopping-bag",
    imgSrc: "/images/cake1.jpg",
    imgAlt: "Bánh kem thủ công thanh lịch của Maison Sweet Bakery",
    imgClass: "slide-image-1",
    fetchPriority: "high",
  },
  {
    id: 2,
    badgeIcon: "fas fa-heart",
    badgeText: "Trao Gửi Vị Ngọt Yêu Thương",
    title: "Bánh Tươi Mỗi Ngày - Ngọt Ngào Từng Khoảnh Khắc",
    description:
      "Bánh được làm thủ công mỗi ngày từ nguyên liệu chọn lọc, mang hương vị Pháp tinh tế cho mọi khoảnh khắc.",
    btnText: "Xem ngay",
    btnLink: "/products",
    btnIcon: "fas fa-shopping-bag",
    imgSrc: "/images/cake2.jpg",
    imgAlt: "Bánh kem tươi được làm thủ công mỗi ngày",
    imgClass: "slide-image-2",
    loading: "lazy",
  },
  {
    id: 3,
    badgeIcon: "fas fa-leaf",
    badgeText: "Thơm Ngon Từ Mẻ Bánh Mới",
    title: "Bánh Ngọt & Dessert",
    description:
      "Croissant thơm bơ, giòn nhẹ bên ngoài và mềm xốp bên trong, được nướng mới mỗi ngày.",
    btnText: "Xem ngay",
    btnLink: "/products",
    btnIcon: "fas fa-shopping-bag",
    imgSrc: "/images/cake3.jpg",
    imgAlt: "Croissant và bánh ngọt Pháp tươi mới mỗi ngày",
    imgClass: "slide-image-3",
    loading: "lazy",
  },
  {
    id: 4,
    badgeIcon: "fas fa-birthday-cake",
    badgeText: "Biến Ý Tưởng Thành Vị Ngọt",
    title: "Chiếc Bánh Mang Dấu Ấn Riêng Của Bạn",
    description:
      "Tự chọn hương vị, màu sắc và thông điệp để tạo nên chiếc bánh độc đáo cho khoảnh khắc đặc biệt.",
    btnText: "Thiết kế ngay",
    btnLink: "/contact?subject=custom",
    btnIcon: "fas fa-shopping-bag",
    imgSrc: "/images/cake4.jpg",
    imgAlt: "Bánh kem thiết kế riêng theo yêu cầu",
    imgClass: "slide-image-4",
    loading: "lazy",
  },
];

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = slidesData.length;

  const goToSlide = useCallback(
    (index) => {
      setCurrentIndex((index + totalSlides) % totalSlides);
    },
    [totalSlides],
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Tự động chuyển slide sau mỗi 5s (Auto-play)
  useEffect(() => {
    console.log(
      "[Slider] đang chạy useEffect() auto-play của component Slider !",
    );
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000);

    return () => {
      //console.log("[Slider] cleanup interval auto-play !");
      clearInterval(interval);
    };
  }, [isPaused, totalSlides]);

  // Điều hướng bằng phím mũi tên (Left/Right key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // console.log(
  //   "[Slider] component Slider render !, slide hiện tại:",
  //   currentIndex,
  // );

  return (
    <section
      className="hero-slider"
      id="heroSlider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Nút Prev */}
      <button
        className="slider-btn slider-btn-prev"
        id="sliderPrev"
        aria-label="Previous slide"
        onClick={prevSlide}
      >
        &#8249;
      </button>

      {/* Nút Next */}
      <button
        className="slider-btn slider-btn-next"
        id="sliderNext"
        aria-label="Next slide"
        onClick={nextSlide}
      >
        &#8250;
      </button>

      {/* Dots navigation */}
      <div className="slider-dots" id="sliderDots">
        {slidesData.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentIndex ? "active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Danh sách các Slide */}
      {slidesData.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentIndex ? "active" : ""}`}
        >
          <div className="slide-content">
            <span className="slide-badge">
              <i className={slide.badgeIcon}></i> {slide.badgeText}
            </span>
            <h2>{slide.title}</h2>
            {slide.description && <p>{slide.description}</p>}
            <Link to={slide.btnLink} className="btn btn-primary">
              <i className={slide.btnIcon}></i> {slide.btnText}
            </Link>
          </div>
          <div className={`slide-image ${slide.imgClass}`}>
            <img
              src={slide.imgSrc}
              alt={slide.imgAlt}
              fetchPriority={slide.fetchPriority}
              loading={slide.loading}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default Slider;
