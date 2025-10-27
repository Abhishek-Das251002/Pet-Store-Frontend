import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import useFetch from "../useFetch";


export default function ProductCarousel() {

    const {data, error, loading} = useFetch("https://pet-store-backend-neon.vercel.app/products")
    
//   const products = [
//     { id: 1, name: "Product 1", price: "₹499" },
//     { id: 2, name: "Product 2", price: "₹899" },
//     { id: 3, name: "Product 3", price: "₹1299" },
//     { id: 4, name: "Product 4", price: "₹1999" },
//     { id: 5, name: "Product 5", price: "₹599" },
//     { id: 6, name: "Product 6", price: "₹799" },
//   ];

  return (
    <div className="p-3" style={{background: "linear-gradient(to right, #F9FAFB, #E9F5F1)"}}>
        <div className="container">
          {loading && "Loading..."}
          {error && error.message}
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 230,
          modifier: 1.5,
          slideShadows: true,
          scale: 0.95,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
        breakpoints={{
          320: {  // small mobiles
            slidesPerView: 0.25,
            coverflowEffect: { depth: 120 }
          },
          480: {  // larger mobiles
            slidesPerView: 0.5,
            coverflowEffect: { depth: 150 }
          },
          768: {  // tablets
            slidesPerView: 1,
            coverflowEffect: { depth: 180 }
          },
          1024: { // laptops
            slidesPerView: 2,
            coverflowEffect: { depth: 230 }
          },
          1440: { // big screens
            slidesPerView: 2.75,
            coverflowEffect: { depth: 260 }
          }
        }}
      >        
        {data.map((p) => (
          <SwiperSlide key={p.id}>
            <div class="card tProds">
            <img src={p.imageUrl} class="card-img-top tProdImg img-fluid" alt="productImg"/>
            <div class="card-body">
                <p class="card-title">{p.name}</p>
                <p class="card-text">₹{p.price}</p>
            </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </div>
  );
}
