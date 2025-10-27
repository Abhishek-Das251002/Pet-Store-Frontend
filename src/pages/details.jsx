import Header from "../components/Header";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { useContext, useEffect } from "react";
import { MyCartItems, MyWishlist, CartItemQuantity  } from "../components/contexts";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Star, RefreshCcw, ShieldCheck, Truck} from "lucide-react";
import { FiPlusCircle,FiMinusCircle } from "react-icons/fi";
import { toast } from "react-toastify";

const ProductDetail = () => {
    const {id} = useParams()
    const {data} = useFetch("https://pet-store-backend-one.vercel.app/products")
    const {wishlist, setWishlist} = useContext(MyWishlist)
    const {cartItems, setCartItems} = useContext(MyCartItems)
    const {itemQuantity, setItemQuantity} = useContext(CartItemQuantity)


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

    
    function showRating(rating){
        const stars = []
        for(let i=0; i<5 ; i++){
            if(i < Math.floor(rating)){
                stars.push(<Star fill="gold" stroke="gold"/>)
            }else if (i === Math.floor(rating)) {
                stars.push(
                    <span className="position-relative" style={{ display: "inline-block" }}>
                        <Star stroke="gold"/> 
                        <span style={{ 
                            position: "absolute", 
                            top: 0, 
                            left: 0, 
                            width: `${(rating - Math.floor(rating)) * 100}%`, 
                            overflow: "hidden" 
                        }}>
                            <Star fill="gold" stroke="gold"/>
                        </span>
                    </span>
                )
            }
            else{
                stars.push(<Star stroke="gold"/>)
            }   
        }
        return stars
    }

    function handleCart(product){
        setCartItems([...cartItems, product._id])
        toast.success('Item added to Cart')
    }

    function handleClick(product){
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

    
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        localStorage.setItem("cart", JSON.stringify(cartItems))
    },[wishlist,cartItems])

    useEffect(() => {
        localStorage.setItem("itemQuantity", JSON.stringify(itemQuantity))
    },[itemQuantity])

    const rqdProd = data?.find(item => item._id == id)
    
    
    const similarProds = data.filter(prod => prod != rqdProd && prod.petType === rqdProd.petType)
    console.log(similarProds)
    
    return (
        rqdProd ?
        <div className="min-vh-100" style={{ background: "#2C786C20" }}>
            <Header/>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10 bg-light mt-3">
                    <div className="row m-md-3">
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-12">
                           <div className="listCard card mt-3 position-relative mx-auto" style={{maxWidth: "300px"}}>
                           {wishlist.includes(rqdProd?._id) 
                           ?
                           <div className="position-absolute top-0 end-0 rounded-circle d-flex justify-content-center align-items-center mt-3 me-3 bg-light bg-opacity-75" style={{width:"40px", height: "40px"}}>
                               <AiFillHeart size={30}   style={{color: "#FF6B6B", cursor: "pointer"}} onClick={() => handleClick(rqdProd)}/>
                           </div>
                           :
                           <div className="position-absolute top-0 end-0 rounded-circle d-flex justify-content-center align-items-center mt-3 me-3 bg-secondary bg-opacity-50" style={{width:"40px", height: "40px"}}>
                               <AiOutlineHeart size={30} style={{cursor: "pointer"}} className="text-light" onClick={() => handleClick(rqdProd)}/>
                           </div>
                           }
                           <img src={rqdProd?.imageUrl} className="listCardImg card-img-top object-fit-cover"  alt="prodImg"/>
                           <div className="card-body">
                               <h5 className="card-title text-center fw-medium text-truncate">{rqdProd?.name}</h5>
                               <Link to={`/checkout/${id}`} className="btn btn w-100 border border-2">Buy Now</Link>
                               {cartItems.includes(rqdProd?._id)
                               ?
                               <Link to="/cart" className="btn btn w-100 mt-2" style={{background: "#1E3A5F",color: "#ffffff"}}>Go to Cart</Link>
                               :
                               <button className="btn btn w-100 mt-2" style={{background: "#2C786C",color: "#ffffff"}} onClick={() => handleCart(rqdProd)}>Add to Cart</button>
                               }   
                           </div>
                           </div>
                        </div>
                        <div className="col-xl-7 col-lg-6 col-md-5 col-sm-4 col-12 mt-2 ms-md-4">
                            <div className="prodDetailsWrapper">
                            <h1 className="fw-semibold d-block d-sm-none d-md-block">{rqdProd.name}</h1>
                            <h2 className="d-none d-sm-block  d-md-none fw-semibold">{rqdProd.name}</h2>
                            <div className="d-flex align-item-center">
                               <span className="detailProdRating">{(rqdProd.rating - Math.floor(rqdProd.rating)) === 0 ? `${rqdProd.rating}.0` : rqdProd.rating}</span> <span className="ms-2 ratingStars">{showRating(rqdProd.rating)}</span>
                            </div>
                            <div className="mt-3">
                                <span className="fs-3 fw-bold">₹{Math.round(rqdProd.price - (rqdProd.price * ((rqdProd.discount)/100)))}</span>
                                <span className="fs-3 ms-4 text-decoration-line-through" style={{color: "#9CA3AF"}}>₹{rqdProd.price}</span>
                                <p className="fs-4 fw-bold" style={{color: "#9CA3AF"}}>{rqdProd.discount}% off</p>
                            </div>
                            <div className="d-flex flex-row flex-sm-column flex-md-row">
                                <p className="fs-5 fw-bold">Quantity :</p>
                                <span className="ms-2">
                                    <FiMinusCircle size={20} onClick={() => handleDec(rqdProd._id)} style={{cursor: "pointer"}}/>
                                    <span className="quantity border border-2 border-dark mx-2 px-1">
                                        {itemQuantity[rqdProd._id] || 1}
                                    </span>
                                    <FiPlusCircle size={20} onClick={() => handleInc(rqdProd._id)} style={{cursor: "pointer"}}/>
                                </span>
                            </div> 
                            </div>                              
                            <hr />
                                <div className="row text-center">
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                        <RefreshCcw style={{color: "#2C786C"}} className="detailIcons"/>
                                        <p className="detailIconsText">10 days<br />Returnable</p>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                        <ShieldCheck style={{color: "#2C786C"}} className="detailIcons"/>
                                        <p className="detailIconsText">Vet-<br />Approved</p>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                        <Truck  style={{color: "#2C786C"}} className="detailIcons"/>
                                        <p className="detailIconsText">Fast<br />Delivery</p>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                        <Star  style={{color: "#2C786C"}} className="detailIcons"/> 
                                        <p className="detailIconsText">Quality<br />Guaranteed</p>
                                    </div>
                                </div>
                            <hr />
                            <div className="d-none d-lg-block">
                                <span className="fw-bold fs-5">Description:</span>
                                <ul className="detailDescription">
                                    {(rqdProd.fullDetails.split(". ").map(feature => <li>{feature}.</li>))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="d-block d-lg-none ms-3">
                        <span className="fw-bold fs-5">Description:</span>
                        <ul className="detailDescription container">
                            {(rqdProd.fullDetails.split(". ").map(feature => <li>{feature}.</li>))}
                        </ul>
                    </div>
                    <hr />
                    <div className="m-sm-3">
                        <p className="fw-bold fs-5 text-center">More Pet Products you may like</p>
                        <div className="row container mx-auto">
                            {similarProds.map(product => (
                            <div className="col-xl-3 col-lg-6 col-md-6 col-12 d-flex justify-content-center">
                            <div className="listCard card mt-3 position-relative" style={{maxWidth: "300px"}}>
                            {wishlist.includes(product._id) 
                            ?
                            <div className="position-absolute top-0 end-0 rounded-circle d-flex justify-content-center align-items-center mt-3 me-3 bg-light bg-opacity-75" style={{width:"40px", height: "40px"}}>
                                <AiFillHeart size={30}  onClick={() => handleClick(product)} style={{color: "#FF6B6B"}}/>
                            </div>
                            :
                            <div className="position-absolute top-0 end-0 rounded-circle d-flex justify-content-center align-items-center mt-3 me-3 bg-secondary bg-opacity-50" style={{width:"40px", height: "40px"}}>
                                <AiOutlineHeart size={30} className="text-light" onClick={() => handleClick(product)}/>
                            </div>
                            }
                            <Link to={`/products/${product._id}`}><img src={product.imageUrl} className="listCardImg card-img-top object-fit-cover"  alt="prodImg"/></Link>
                            <div className="card-body">
                                <h5 className="card-title text-center fw-medium text-truncate">{product.name}</h5>
                                <p className="text-center fw-bold fs-4" style={{color: "#2C786C"}}>₹ {product.price}</p>
                                {cartItems.includes(product._id)
                                ?
                                <Link to="/cart" className="btn btn w-100" style={{background: "#1E3A5F",color: "#ffffff"}}>Go to Cart</Link>
                                :
                                <button className="btn btn w-100" style={{background: "#2C786C",color: "#ffffff"}} onClick={() => handleCart(product)}>Add to Cart</button>
                                }   
                            </div>
                            </div>
                        </div>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="col-1">

                </div>
            </div>
        </div>
        :
        <p className="text-center mt-5">Loading Details...</p>
    )
}

export default ProductDetail;