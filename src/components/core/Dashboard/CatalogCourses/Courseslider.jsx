
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import CourseCard from "./CourseCard"
import { Pagination, Navigation,Autoplay } from 'swiper/modules';

function Courseslider({courses}){
    return(
        <>
        {
            courses?.length ? (
                <Swiper slidesPerView={1}
                loop={true}
                spaceBetween={0}
                pagination={true}
                modules={[Autoplay,Pagination,Navigation]}
                className="mySwiper"
                autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                }}
                navigation={true}
                breakpoints={{
                    1024:{slidesPerView:3,}
                }}>
                    {
                        courses?.map((course)=>{
                            return (
                                <SwiperSlide key={course._id} >
                                    <CourseCard Course={course}/>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>


            ):(<p>No Courses Found </p>)
        }
        </>
    )
}
export default Courseslider