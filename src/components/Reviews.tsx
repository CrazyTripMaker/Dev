import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Aarav Sharma",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    review:
      "Amazing experience with Kinghills Travels! Booking was smooth and the trip was well-organized.",
  },
  {
    id: 2,
    name: "Priya Verma",
    avatar: "https://i.pravatar.cc/100?img=27",
    rating: 4,
    review:
      "Great service and friendly staff. Highly recommend for family trips!",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    avatar: "https://i.pravatar.cc/100?img=5",
    rating: 5,
    review:
      "Exceptional service and beautiful destinations. Loved the experience!",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    avatar: "https://i.pravatar.cc/100?img=9",
    rating: 5,
    review:
      "Easy booking, great customer support. Would definitely travel again!",
  },
  {
    id: 5,
    name: "Vikram Singh",
    avatar: "https://i.pravatar.cc/100?img=33",
    rating: 4,
    review:
      "Everything was smooth and timely. Good for budget tours.",
  },
  {
    id: 6,
    name: "Kiran Patel",
    avatar: "https://i.pravatar.cc/100?img=45",
    rating: 5,
    review:
      "Great quality service. Highly impressed with professionalism.",
  },
];

export default function ReviewsSection() {
  const totalReviews = reviews.length;
  const overallRating =
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews;

  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(totalReviews / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 < totalSlides ? prev + 1 : prev
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : prev
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Customer Reviews</h2>
          <div className="flex items-center justify-center mt-5 space-x-3">
            <Star className="text-yellow-400 w-8 h-8 fill-yellow-400" />
            <span className="text-3xl font-semibold">
              {overallRating.toFixed(1)}
            </span>
          </div>
          <p className="text-gray-600 mt-2">{totalReviews} Verified Reviews</p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden pb-20">

          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="w-full flex-shrink-0 flex justify-center gap-6 px-4"
              >
                {reviews
                  .slice(
                    slideIndex * itemsPerSlide,
                    slideIndex * itemsPerSlide + itemsPerSlide
                  )
                  .map((review, idx) => {
                    const isMiddle = idx === 1;
                  
                    return (
                      <div
                        key={review.id}
                        className={`
                          w-[32%] p-6 bg-white rounded-2xl shadow-lg transition-transform duration-300 cursor-pointer
                          ${isMiddle ? "scale-105 shadow-2xl" : "hover:scale-105 hover:shadow-2xl"}
                        `}
                      >
                        <div className="flex items-center space-x-4 mb-3">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-16 h-16 rounded-full shadow"
                          />
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                              {review.name}
                            </h3>

                            <div className="flex items-center mt-1">
                              {Array.from({ length: review.rating }).map(
                                (_, i) => (
                                  <Star
                                    key={i}
                                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                                  />
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 text-md leading-relaxed">
                          {review.review}
                        </p>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>

          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className={`
              absolute top-1/2 left-0 -translate-y-1/2
              p-3 rounded-full shadow bg-white hover:bg-gray-100
              ${currentIndex === 0 && "opacity-40 cursor-not-allowed"}
            `}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className={`
              absolute top-1/2 right-0 -translate-y-1/2
              p-3 rounded-full shadow bg-white hover:bg-gray-100
              ${currentIndex === totalSlides - 1 && "opacity-40 cursor-not-allowed"}
            `}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
