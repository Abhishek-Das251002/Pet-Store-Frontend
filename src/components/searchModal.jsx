import { useState,useContext, useEffect } from "react"
import useFetch from "../useFetch"
import { MyCartItems, MyWishlist } from "./contexts"
import { toast } from "react-toastify"
import {useNavigate } from "react-router-dom"

export default function MyModal(){
    const [searchedRes, setSearchRes] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const {data} = useFetch("https://pet-store-backend-neon.vercel.app/products")
    const {wishlist, setWishlist} = useContext(MyWishlist)
    const {cartItems, setCartItems} = useContext(MyCartItems)
    const navigate = useNavigate()

    function handleChange(e){
        const {value} = e.target
        setSearchValue(value)
        if(value){
            setSearchRes(data.filter(prod => (
                prod.name.toLowerCase().includes(value.toLowerCase()) || prod.description.toLowerCase().includes(value.toLowerCase()) || prod.petType.toLowerCase().includes(value.toLowerCase()) || prod.category.toLowerCase().includes(value.toLowerCase())
            )))
        }
    }

    function handleWishlist(product){
        if(wishlist.includes(product._id)){
            setWishlist(
            wishlist.filter(prodId => prodId != product._id)
            )
            toast.warn("Item Removed from Wishlist")
        }else{
            setWishlist([...wishlist,product._id])
            toast.success("Item added to Wishlist")
        }       
            
    }

    function handleCart(product){
        setCartItems([...cartItems, product._id])
        toast.success('Item added to Cart')
    }

    function handleNavigate(path){
        navigate(path)
    }

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        localStorage.setItem("cart", JSON.stringify(cartItems))
    },[wishlist,cartItems])
    

    return (
    <div className="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">Search</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <input
                className="form-control me-2 bg-light"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchValue}
                onChange={handleChange}
            />
            <div className="mt-4">
            {searchValue.length >= 2
            ?
            searchedRes.map(item => (
                <div className="card mb-3 mx-2">
                <div className="d-flex flex-row">
                    <img src={item.imageUrl} className="searchImg img-fluid m-md-3 my-3" alt="prodImg" data-bs-dismiss="modal" onClick={() => navigate(`/products/${item._id}`)} style={{cursor: "pointer"}}/>
                    <div className="card-body">
                        <span className="searchCardTitle fw-bold" data-bs-dismiss="modal" onClick={() => navigate(`/products/${item._id}`)} style={{cursor: "pointer"}}>{item.name}</span><br />
                        <span className="searchCardDes">{item.description}</span><br />
                        <span className="searchCardPrice fw-bold" style={{color: "#2C786C"}}>₹{item.price}</span>
                        {wishlist.includes(item._id) 
                        ?
                        <button className="searchCardWBtn btn btn border border-2 w-100" onClick={() => handleWishlist(item)}>Remove from Wishlist</button>
                        :
                        <button className="searchCardWBtn btn btn w-100" style={{background: "#FF6B6B", color: "#ffffff"}} onClick={() => handleWishlist(item)}>Add to Wishlist</button>
                        }
                        {cartItems.includes(item._id)
                        ?
                        <button className="searchCardCBtn mt-2 btn btn w-100" style={{background: "#1E3A5F",color: "#ffffff"}} data-bs-dismiss="modal" onClick={() => handleNavigate("/cart")}>Go to Cart</button>
                        :
                        <button className="searchCardCBtn mt-2 btn btn w-100" style={{background: "#2C786C", color: "#ffffff"}} onClick={() => handleCart(item)}>Add to Cart</button>
                        }
                    </div>
                </div>
                </div>
            ))
            :
            <p className="text-center my-5">Type at least 2 characters to search</p>}
            </div>
        </div>
        </div>
    </div>
    </div>
    )
}