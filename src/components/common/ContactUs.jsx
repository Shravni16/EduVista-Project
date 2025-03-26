// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import {apiConnector} from "../../services/apiconnector"
// import { contactusEndpoints } from "../../services/apis";
// import countryCodes from "../../data/countrycode.json"

// function ContactUs(){
//     const [loading,setLoading]=useState(false);

//     const {register,handleSubmit,reset,formState:{errors,isSubmitSuccessful}}=useForm();

//     useEffect(()=>{
//      if(isSubmitSuccessful){
//         reset({
//             email:"",
//             firstName:"",
//             lastName:"",
//             message:"",
//             phoneNo:"",
//             countryCode:"+91"
//         })
//      }
//     },[reset,isSubmitSuccessful])


// async function submitContactForm(data){
// console.log("Form Submitted Data",data);
// try{
// setLoading(true);
// // const response=await apiConnector("POST",contactusEndpoints.CONTACT_US_API,data);
// const response={status:"OK"};
// console.log("Logging Response of sent message ",response);
// setLoading(false);
// }catch(error){
// console.log("Error :",error.message);
// setLoading(false);
// }
//     }
//     return(
//         <form onSubmit={handleSubmit(submitContactForm)}>
//              <div>
//                 {/* First Name */}
//                 <div>
//                     <label htmlFor="firstName">First Name</label>
//                     <input
//                     type="text"
//                     name="firstName"
//                     id="firstName"
//                     placeholder="Enter First Name"
//                     {...register("firstName",{required:true})}
//                     />
//                     {
//                         errors.firstName && (
//                             <span>
//                                 Please enter Your Name
//                             </span>
//                         )
//                     }
//                 </div>
//                 {/* Last Name */}
//                 <div>
//                     <label htmlFor="lastName">Last Name</label>
//                     <input
//                     type="text"
//                     name="lastName"
//                     id="lastName"
//                     placeholder="Enter Last Name"
//                     {...register("lastName")}
//                     />
                   
//                 </div>
//              </div>

//              {/* Email */}
//              <div>
//              <label htmlFor="email">Email Address</label>
//                     <input
//                     type="text"
//                     name="email"
//                     id="email"
//                     placeholder="Enter email"
//                     {...register("email",{required:true})}
//                     />
//                     {
//                         errors.email && (
//                             <span>
//                                 Please enter Your Email
//                             </span>
//                         )
//                     }
//              </div>

//              {/* Phone Number  */}
//              <div>
//                 <label htmlFor="phoneNo">Phone Number</label>
//                 <div>
//                     <select
//                     name="dropdown"
//                     id="dropdown"
//                     {
//                         ...register("countryCode",
//                         {required:true})
//                     }
//                     >
//                         <option value="+91" selected>+91 - India</option>
//                         {
// countryCodes.map((element,index)=>{
//     return (
//         <option key={index} value={element.code}  >
//             {element.code}-{element.country}
//         </option>
//     )
// })
//                         }

//                     </select>
//                 </div>
//                 <input
//                 type="number"
//                 name="phoneNo"
//                 id="phoneNo"
//                 placeholder="12345 67890"
//                 {...register("phoneNo",{required:true,
//                 maxLength:{value:10,message:"Invalid Phone number"},
//                 minLength:{value:8,message:"Invalid Phone number"}
//                 })}
//                 />
//                 <div>
//                     {
//                         errors.phoneNo && (
//                             <span>Enter correct phone no.</span>
//                         )
//                     }

//                 </div>
//              </div>

//              {/* Message */}
//              <div>
//              <label htmlFor="message">Message</label>
//                     <textarea
//                     type="text"
//                     name="message"
//                     id="message"
//                     placeholder="Enter message"
//                     cols="30"
//                     rows="7"
//                     {...register("message",{required:true})}
//                     />
//                     {
//                         errors.message && (
//                             <span>
//                                 Please enter Your message
//                             </span>
//                         )
//                     }
//              </div>

//              <button type="submit">Send Messag</button>
//         </form>
//     );
// }

// export default ContactUs;
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoints } from "../../services/apis";
import countryCodes from "../../data/countrycode.json";
import "./contactUs.css"; // Importing the CSS file

function ContactUs() {
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: "",
                countryCode: "+91",
            });
        }
    }, [reset, isSubmitSuccessful]);

    async function submitContactForm(data) {
        // console.log("Form Submitted Data", data);
        try {
            setLoading(true);
          const response = await apiConnector("POST", contactusEndpoints.CONTACT_US_API, data);
            // const response = { status: "OK" };
            // console.log("Logging Response of sent message ", response);
            setLoading(false);
        } catch (error) {
            console.log("Error :", error.message);
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(submitContactForm)} className="contact-form">
            {/* First Name and Last Name */}
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter First Name"
                        className="input-field"
                        {...register("firstName", { required: true })}
                    />
                    {errors.firstName && <span className="error-text">Please enter Your Name</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter Last Name"
                        className="input-field"
                        {...register("lastName")}
                    />
                </div>
            </div>

            {/* Email */}
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    className="input-field"
                    {...register("email", { required: true })}
                />
                {errors.email && <span className="error-text">Please enter Your Email</span>}
            </div>

            {/* Country Code and Phone Number */}
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="dropdown">Country Code</label>
                    <select name="dropdown" id="dropdown" className="input-field" {...register("countryCode", { required: true })}>
                        <option value="+91" selected>+91 - India</option>
                        {countryCodes.map((element, index) => {
                            return (
                                <option key={index} value={element.code}>
                                    {element.code} - {element.country}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNo">Phone Number</label>
                    <input
                        type="number"
                        name="phoneNo"
                        id="phoneNo"
                        placeholder="12345 67890"
                        className="input-field"
                        {...register("phoneNo", {
                            required: true,
                            maxLength: { value: 10, message: "Invalid Phone number" },
                            minLength: { value: 8, message: "Invalid Phone number" },
                        })}
                    />
                    {errors.phoneNo && <span className="error-text">Enter correct phone no.</span>}
                </div>
            </div>

            {/* Message */}
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                    name="message"
                    id="message"
                    placeholder="Enter message"
                    className="input-field"
                    cols="30"
                    rows="7"
                    {...register("message", { required: true })}
                />
                {errors.message && <span className="error-text">Please enter Your message</span>}
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
            </button>
        </form>
    );
}

export default ContactUs;
