import RatingStars from "./RatingStars"
import "./review.css"

function Reviewcard({review}){
    return(<div className="rc-wid">
      
            <div className="rc-img-name-wrap">
                <img className="rc-img" src={review?.user?.image} alt="Tp"/>
                <div className="rc-name-email">
                  
                    <p className="rc-name">{review?.user?.firstName}{" "}{review?.user?.lastName}</p>
                    <p className="rc-email">{review?.user?.email}</p>
                </div>
                
            </div>
            <p>{review?.review}</p>
                <div className="rc-rating-stars">
                    <span>{review?.rating}</span>
                    <RatingStars Review_Count={review?.rating}/>
                </div>
       
    </div>)
}

export default Reviewcard