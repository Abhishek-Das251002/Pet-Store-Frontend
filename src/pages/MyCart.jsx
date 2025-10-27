import { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import { CartItemQuantity, MyCartItems,MyWishlist } from "../components/contexts";
import useFetch from "../useFetch";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Cart = () => {
    const {data,loading, error} = useFetch("https://pet-store-backend-one.vercel.app/products")
    const {cartItems, setCartItems} = useContext(MyCartItems)
    const {wishlist, setWishlist} = useContext(MyWishlist)
    const {itemQuantity, setItemQuantity} = useContext(CartItemQuantity)
    let navigate = useNavigate()


    const cartProducts = data.filter(prod => cartItems.includes(prod._id))
    const totalCartPrice = cartProducts.reduce((acc, curr) => acc += ((itemQuantity[curr._id] || 1) * curr.price),0)
    const totalCartDiscount = Math.round(cartProducts.reduce((acc, curr) => acc += ((itemQuantity[curr._id] || 1) * curr.price * (curr.discount/100)),0).toFixed(2))
    const deliveryCharges = 50
    const totalPayAmount = totalCartPrice - totalCartDiscount + deliveryCharges

    useEffect(() => {
            localStorage.setItem("wishlist", JSON.stringify(wishlist))
            localStorage.setItem("cart", JSON.stringify(cartItems))
        },[cartItems])

    useEffect(() => {
        localStorage.setItem("itemQuantity", JSON.stringify(itemQuantity))
    },[itemQuantity])

    function handleRemoveCart(id){
        setCartItems(cartItems.filter(prodId => prodId != id))
        toast.error("Item Removed from Cart!")
    }
    function moveToWishlist(id){
        setCartItems(cartItems.filter(prodId => prodId != id))
        if(wishlist.includes(id)){
            return wishlist
        }else{
            setWishlist([...wishlist,id])
        }
        toast.info("Item moved to Wishlist")
    }
    
    const handleDec = (id) => {
        setItemQuantity(prev => ({
            ...prev,
            [id]: prev[id] > 1 ? prev[id] - 1 : 1 
        }))
        toast.warn("Item Quantity Decreased")
    }

    const handleInc = (id) => {
        setItemQuantity(prev => ({
            ...prev,
            [id]: (prev[id] || 1) + 1
        }))
        toast.success("Item Quantity Increased")
    }


    return (
        <div>
            <Header/>
            {cartItems.length != 0 
            ?
            <>
            {loading
            ?
            <p className="m-5 text-center">Loading Cart...</p>
            :
            <>
            <h3 className="text-center py-4 fw-bold" style={{color: "#2C786C"}}>My Cart ({cartItems.length})</h3> 
            <div className="row d-flex justify-content-sm-center">
                <div className="col-xl-2 col-lg-1 d-none d-lg-block"></div>
                <div className="col-md-8 col-sm-8 col-12 col-lg-5 col-xl-4 mb-4">
                    {(cartProducts).map(item => 
                        <div className="card d-flex flex-row mb-3 mx-2">
                            <img src={item.imageUrl} className="cartImg img-fluid m-3" alt="prodImg" style={{maxHeight: "230px", cursor: "pointer"}} onClick={() => navigate(`/products/${item._id}`)}/>
                            <div className="card-body my-2 lh-1">
                                <h5 class="card-title fs-4" style={{cursor: "pointer"}} onClick={() => navigate(`/products/${item._id}`)}>{item.name}</h5>
                                <span className="fw-bold fs-4" style={{color: "#2C786C"}}>₹ {(Math.round(0.8 * item.price).toFixed(2))}</span> <span className="fw-medium fs-4 ms-3 text-decoration-line-through" style={{color: "#9CA3AF"}}>₹ {item.price}</span>
                                <p className="fw-bold fs-5 pt-2" style={{color: "#9CA3AF"}}>{item.discount}% off</p>
                                <div className="d-flex flex-row">
                                    <p className="mt-1">Quantity:</p>
                                    <span className="ms-2">
                                        <FiMinusCircle size={20} onClick={() => handleDec(item._id)} style={{cursor: "pointer"}}/>
                                        <span className="quantity border border-2 border-dark mx-2 px-1">
                                            {itemQuantity[item._id] || 1}
                                        </span>
                                        <FiPlusCircle size={20} onClick={() => handleInc(item._id)} style={{cursor: "pointer"}}/>
                                    </span>
                                </div>   
                                <button className="removeCartBtn text-center w-100 btn btn border border-2 mt-3" style={{background: "#ffffff", color: "#2C786C"}} onClick={() => handleRemoveCart(item._id)}>Remove From Cart</button>                          
                                <button className="removeCartBtn text-center w-100 mt-3 btn btn" style={{background: "#2C786C", color: "#ffffff"}} onClick={() => moveToWishlist(item._id)}>Move to Wishlist</button>
                            </div>
                        </div>
                    )}    
                </div>
                <div className="col-md-8 col-sm-8 col-12 col-lg-5 col-xl-4 mb-4">
                    <div class="card fs-4 mx-2">
                    <div class="card-body">
                        <p className="fw-semibold fs-4">PRICE DETAILS</p>
                    <hr />
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between mb-2">
                            <span>Price ({cartProducts.length} {cartProducts.length > 1 ? "items" : "item"})</span>
                            <span>₹{totalCartPrice}</span>
                        </div>
                        <div className="d-flex flex-row justify-content-between mb-2">
                            <span>Discount</span>
                            <span>- ₹{totalCartDiscount}</span>
                        </div>
                        <div className="d-flex flex-row justify-content-between mb-2">
                            <span>Delivery Charges</span>
                            <span>₹{deliveryCharges}</span>
                        </div>
                        <hr />
                        <div className="d-flex flex-row justify-content-between fw-semibold">
                            <span>TOTAL AMOUNT</span>
                            <span>₹{totalPayAmount}</span>
                        </div>
                        <hr />
                        <p>You will save ₹{totalCartDiscount} on this order</p>
                        <Link className="btn btn fs-4" to="/checkout" style={{background: "#2C786C", color: "#ffffff"}}>Place your Order</Link>
                    </div>
                    </div>
                    </div>    
                </div>
                <div className="col-xl-2 col-lg-1 d-none d-lg-block"></div>
            </div>
            </>
            }
            </>
            :
            <p className="text-center fs-3 mt-4">Cart is empty please add products!</p>
            }
        </div>
    )
}

export default Cart;