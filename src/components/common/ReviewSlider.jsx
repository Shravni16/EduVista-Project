
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Pagination, Navigation,Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import Reviewcard from './Reviewcard';
import { getALLRatingsAndReviews } from '../../services/operations/CourseAPI';
import { useSelector } from 'react-redux';

function ReviewSlider(){
    const [reviews,setReviews]=useState([]);
    const {token}=useSelector((state)=>state.auth);
    useEffect(()=>{
       async function getData(){
            const res=await getALLRatingsAndReviews(token);
            setReviews(res);
        }
        getData();
        
    },[])
    return(
        <div className='rs-wrap'>
            <h1 className='rs-heading'>Reviews From Learners</h1>
            {
                reviews?.length ?(<div>
                     <Swiper slidesPerView={1}
                loop={true}
                // spaceBetween={200}
                // pagination={true}
                modules={[Autoplay,Navigation]}
                className="mySwiper"
              
                autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                }}
               
                navigation={true}
                breakpoints={{
                    1024:{slidesPerView:4}
                }}>
                    {
                        reviews?.map((review)=>{
                            return (
                                <SwiperSlide key={review._id} >
                                   <Reviewcard review={review}/>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                </div>):(<div>No reviews found</div>)
            }
        </div>
    )

}
export default ReviewSlider;