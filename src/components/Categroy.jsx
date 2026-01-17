import React from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import { useFetch } from "./useFetch";
import { API_URL } from "./useFetch";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Loader } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Categroy = () => {
  const { data, loading, error } = useFetch(`${API_URL}categories.php`);
  const availableCategories = data?.categories;
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <Title text="All Categories" />
        {error && <h1 className="text-red-500">{error}</h1>}
        {loading ? (
          <div className="text-center p-8 text-gray-300">
            <Loader
              size={30}
              className="animate-spin inline-block mr-2 text-blue-400"
            />
            <span>Loading....</span>
          </div>
        ) : (
          <Swiper
            slidesPerView={6}
            spaceBetween={30}
            centeredSlides={false}
            autoplay={{
              delay: 500,
              disableOnInteraction: false,
            }}
            speed={2000}
            pagination={false}
            navigation={false}
            loop={true}
            modules={[Autoplay, Pagination, Navigation]}
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              575: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 6,
              },
            }}
            className="mySwiper select-none cursor-pointer"
          >
            {availableCategories?.map((category) => (
              <SwiperSlide key={category.idCategory} className="text-center">
                <div className="overflow-hidden p-2 border-4 border-blue-400 w-36 h-36 rounded-full object-center bg-gray-300 mx-auto">
                  <Link to={`/search/category/${category.strCategory}`}>
                    <img
                      src={`${category.strCategoryThumb}`}
                      alt={`${category.strCategory}`}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </Link>
                </div>
                <Link to={`/search/category/${category.strCategory}`}>
                  <h3 className="mt-2 text-lg font-bold">
                    {category.strCategory}
                  </h3>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Categroy;
