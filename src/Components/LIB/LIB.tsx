import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import bumbleProfile from "../../Assets/bumbleProfile.jpg";
import hingeProfile from "../../Assets/hingeProfile.jpg";
import instaProfile from "../../Assets/instaProfile.png";
import twitterProfile from "../../Assets/twitterProfile.png";
import useWindowDimensions from "../../Hooks/UseWindowDimensions";
import LIBCard from "../LIBCard";
import PageFrame from "../PageFrame";
import "./index.css";
const LIB = () => {
  const { width } = useWindowDimensions();

  return (
    <>
      <div className="w-full py-[120px] h-full flex flex-row items-center justify-center rounded-3xl ">
        <PageFrame>
          <div className="flex flex-col w-full h-full items-center justify-center">
            <div className="text-brown900 text-[36px] sm:text-[42px] md:text-[52px] lg:text-[74px] xl:text-[90px] 2xl:text-[110px] font-CocogooseBold text-center">
              link in bio{" "}
              <span className="bg-brown200 px-6 py-2 rounded-md ">DATING</span>
            </div>
            <Swiper
              autoplay={{
                waitForTransition: false,
                delay: 1500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              centeredSlides={width <= 640 ? true : false}
              slidesPerView={"auto"}
              freeMode={true}
              loop={true}
              modules={[Autoplay, Pagination]}
              className="w-full flex flex-row py-8 px-2 mt-10"
            >
              <SwiperSlide>
                <LIBCard imageUri={hingeProfile} />
              </SwiperSlide>
              <SwiperSlide>
                <LIBCard imageUri={instaProfile} />
              </SwiperSlide>
              <SwiperSlide>
                <LIBCard imageUri={bumbleProfile} />
              </SwiperSlide>
              <SwiperSlide>
                <LIBCard imageUri={twitterProfile} />
              </SwiperSlide>
              <SwiperSlide>
                <LIBCard imageUri={hingeProfile} />
              </SwiperSlide>
              <SwiperSlide>
                <LIBCard imageUri={instaProfile} />
              </SwiperSlide>
              <SwiperSlide>
                <LIBCard imageUri={bumbleProfile} />
              </SwiperSlide>
              <SwiperSlide>
                <LIBCard imageUri={twitterProfile} />
              </SwiperSlide>
            </Swiper>
          </div>
        </PageFrame>
      </div>
    </>
  );
};

export default LIB;
