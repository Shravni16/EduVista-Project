import { Routes ,Route} from "react-router-dom";
import Home from "./pages/Home";
import "./app.css"
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import VerifyEmail from "./components/core/Login/VerifyEmail";
import ForgotPassword from "./components/core/Login/ForgotPassword";
import UpdatePassword from "./components/core/Login/UpdatePassword";
import AboutUs from "./components/core/About Us/AboutUs";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import PurchaseHistory from "./components/core/Dashboard/PurchaseHistory";
import ErrorPage from "./components/common/ErrorPage";
import Settings from "./components/core/Dashboard/Settings";
import Logout from "./components/core/Auth/Logout";
import Wishlist from "./components/core/Dashboard/Wishlist";
import AddCourses from "./components/core/Dashboard/AddCourses";
import Mycourses from "./components/core/Dashboard/MyCourses/Mycourses";
import EditCourse from "./components/core/Dashboard/EditCourse.jsx";
import CatalogCourses from "./components/core/Dashboard/CatalogCourses/index.jsx";
import CourseDetailPage from "./components/core/CourseDetails/CourseDetailPage.jsx";
import ViewCourse from "./components/core/Dashboard/Viewcourse/ViewCourse.jsx";
import VideoDisplay from "./components/core/Dashboard/Viewcourse/VideoDisplay.jsx";
import InstructoDashBoard from "./components/core/Dashboard/InstructorDashBoard.jsx/index.jsx";
import OpenRoute from "./components/core/Auth/OpenRoute.jsx";
import PrivateRoute from "./components/core/Auth/PrivateRoute.jsx";
import ContactUS from "./pages/ContactUS.jsx";
import ResetComplete from "./components/core/Login/ResetComplete.jsx";


function App() {
  return (
    <div className="app-wrapper">
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} ></Route>
      <Route path="/login" element={<OpenRoute><Login/></OpenRoute>} />
      <Route path="/signup" element={<OpenRoute><SignUp/></OpenRoute>} />
      <Route path="/verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>} />
      <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
      <Route path="/update-password/:token" element={<OpenRoute><UpdatePassword/></OpenRoute>}/>
      <Route path="/about" element={<AboutUs/>}/>
      <Route path="/contact" element={<ContactUS/>}/>
      <Route path="/reset-complete" element={<ResetComplete/>}/>



      <Route element={ <PrivateRoute><Dashboard/></PrivateRoute>}>
        <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
        <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
        <Route path="/dashboard/purchase-history" element={<PurchaseHistory/>}/>
        <Route path="/dashboard/logout" element={<Logout/>}/>
        <Route path="/dashboard/setting" element={<Settings/>} />
        <Route path='/dashboard/wishlist' element={<Wishlist/>}/>
        <Route path='/dashboard/add-course' element={<AddCourses/>}/>
        <Route path='/dashboard/edit-course/:id' element={<EditCourse/>}/>
        <Route path='/dashboard/my-courses' element={<Mycourses/>}/>
        <Route path="/dashboard/instructor" element={<InstructoDashBoard/>}/>
        
      </Route>
      <Route path="/catalog/:categoryName" element={<CatalogCourses/>}/>
      <Route path="/courses/:courseId" element={<CourseDetailPage/>}/>

      <Route element={<ViewCourse/>}>
      <Route path="/view-course/:courseId/section/:sectionId/subsection/:subsectionId" element={<VideoDisplay/>} />
      </Route>
      <Route path="/not-found" element={<ErrorPage/>}/>
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
