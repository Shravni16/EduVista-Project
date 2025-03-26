import {toast} from "react-hot-toast";

import { createSlice } from "@reduxjs/toolkit"



const initialState={
    cart:localStorage.getItem("cart")?
    JSON.parse(localStorage.getItem("cart")):[],
    totalItem:localStorage.getItem("totalItem")?
    JSON.parse(localStorage.getItem("totalItem")):0,
    totalAmount:localStorage.getItem("totalAmount")?
    JSON.parse(localStorage.getItem("totalAmount")):0,
}

const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalItem(state,action){
            state.totalItem=action.payload
        },
    
        setTotalAmount(state,action){
            state.totalAmount=action.payload
        },
        //add to cart
        //remove from car
        addToCart(state,action){
            const course=action.payload;
            const index=state.cart.findIndex((item)=> item._id== course._id);
            if(index>=0){
                toast.error("Item Already In cart");
                return ;
            }
            state.cart.push(course);
            state.totalItem++;
            state.totalAmount+=course.price;
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("totalItem",JSON.stringify(state.totalItem));
            localStorage.setItem("totalAmount",JSON.stringify(state.totalAmount));
            toast.success("Course Added to Cart")
        },
        removeFromCart(state,action){
            const course=action.payload;
            const index=state.cart.findIndex((item)=> item._id== course._id);
            if(index>=0){
                state.totalItem--;
                state.totalAmount-=course.price;
                state.cart.splice(index,1);
                localStorage.setItem("cart",JSON.stringify(state.cart));
                localStorage.setItem("totalItem",JSON.stringify(state.totalItem));
                localStorage.setItem("totalAmount",JSON.stringify(state.totalAmount));
                toast.success("Course Removed from Cart");
                return;
            }
            toast.error("Course Is not present in cart")

        },
        emptyCart(state,action){
            state.cart=[];
            state.totalAmount=0;
            state.totalItem=0;
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("totalItem",JSON.stringify(state.totalItem));
            localStorage.setItem("totalAmount",JSON.stringify(state.totalAmount));
            toast.success("CCart is empty!");
        }
    }
})

export  const {setTotalItem,setTotalAmount,addToCart,removeFromCart,emptyCart}=cartSlice.actions;
export default cartSlice.reducer;