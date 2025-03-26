import React from "react";

function CompanyQuality({image,heading,para}){
    return (
        <div className="quality-wrapper">
            <div className="div-circle">
            <img src={image}></img>
            </div>
            <div>
                <h4 className="quality-heading">{heading}</h4>
                <p className="common-para">{para}</p>

            </div>
        </div>
    );
}
export default CompanyQuality;