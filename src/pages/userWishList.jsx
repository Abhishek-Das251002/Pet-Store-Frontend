import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { MyWishlist, MyCartItems, CartItemQuantity } from "../components/contexts";
import useFetch from "../useFetch";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const WishList = () => {
    const {data,loading,error} = useFetch("https://pet-store-backend-8mwy86dq1-abhisheks-projects-74383ef5.vercel.app/products")
    const {wishlist, setWishlist} = useContext(MyWishlist)
    const {cartItems, setCartItems} = useContext(MyCartItems)
    const {itemQuantity, setItemQuantity} = useContext(CartItemQuantity)
    let navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
        localStorage.setItem("cart", JSON.stringify(cartItems))
    },[wishlist])

    useEffect(() => {
        localStorage.setItem("itemQuantity", JSON.stringify(itemQuantity))
    },[itemQuantity])

    function handleRemoveItem(id){
        setWishlist(wishlist.filter(prodId => prodId != id))
        toast.warn("Item Removed from Wishlist")
    }

    function handleAddCart(id){
        if(cartItems.includes(id)){
            setItemQuantity(prev => ({...prev, [id]: (prev[id] || 0) + 1}))
        }else{
            setCartItems([...cartItems, id])
        } 
        
        setWishlist(wishlist.filter(prodId => prodId != id)) 
        toast.success("Item moved to Cart")
    }

    
    return (
        <div>
            <Header/>
            {wishlist.length != 0 
            ?
            <>
            <div className="w-100 min-vh-100" style={{background: "#FAFAF8"}}>
                <div className="container">
                    <h3 className="text-center py-4 fw-bold" style={{color: "#2C786C"}}>My Wishlist</h3> 
                        <div className="row">
                                <span className="text-center">{loading && "Loading Wishlist..."}</span>
                                <span className="text-center">{error && "Error Occured while loading Wishlist"}</span>
                                {(data.filter(prod => wishlist.includes(prod._id))).map(item => (
                                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center">
                                    <div class="listCard card mt-3 position-relative" style={{maxWidth: "270px"}}>
                                        <div className="position-absolute top-0 end-0 d-flex justify-content-center align-items-center mt-3 me-3" style={{width:"40px", height: "40px"}}>
                                            <AiFillCloseCircle size={30} className="removeWishlist" onClick={() => handleRemoveItem(item._id)}/>
                                        </div>
                                        <img src={item.imageUrl} className="listCardImg object-fit-cover" alt="itemImg" onClick={() => navigate(`/products/${item._id}`)} style={{cursor: "pointer"}}/>
                                        <div class="card-body">
                                            <h5 class="card-title text-center fw-medium text-truncate" onClick={() => navigate(`/products/${item._id}`)} style={{cursor: "pointer"}}>{item.name}</h5>
                                            <p className="text-center fw-bold fs-4" style={{color: "#2C786C"}}>₹ {item.price}</p>
                                            <button className="btn btn w-100" style={{background: "#2C786C",color: "#ffffff"}} onClick={() => handleAddCart(item._id)}>Move to Cart</button>
                                        </div>
                                    </div>
                                    </div>
                                ))
                                }
                            
                        </div>
                </div>
            </div>
            </>
            :
            <p className="fs-4 text-center mt-4">There are no products in your wishlist!</p>
            }
            
        </div>
    )
}

export default WishList;