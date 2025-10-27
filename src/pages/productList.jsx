import Header from "../components/Header"
import useFetch from "../useFetch"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { FiFilter } from "react-icons/fi"
import { useContext, useEffect, useState } from "react"
import { MyWishlist } from "../components/contexts"
import { MyCartItems } from "../components/contexts"
import { Link, useParams } from "react-router-dom"
import UseMatchMedia from "../components/useMatchMedia"
import { toast } from "react-toastify"

const AllProducts = () => {
    const {data, error, loading} = useFetch("pet-store-backend-8mwy86dq1-abhisheks-projects-74383ef5.vercel.app/products")
    const {wishlist, setWishlist} = useContext(MyWishlist)
    const {cartItems, setCartItems} = useContext(MyCartItems)
    const [filterValue, setFilterValue] = useState({
        price: "",
        category: [],
        rating: "",
        sorting: "",
    })
    const [filteredProducts, setFilterProduct] = useState([])
    const [filterCount, setFilterCount] = useState([])
    const {selectedPet} = useParams()
    
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

    function applyfilter(e){
        const {value,name} = e.target       
        if(name == "rating" || name == "price"){
            setFilterValue({...filterValue,[name]: parseInt(value)})
        }else if(name == "sorting"){
            setFilterValue({...filterValue,[name]: value})
        }else{
            filterValue.category.includes(value) ? setFilterValue({...filterValue,[name]: filterValue.category.filter(prodCategory => prodCategory != value)}): setFilterValue({...filterValue,[name]: [...filterValue.category,value]})
        }
         
        if(filterCount.includes(name)){            
            filterCount            
        }else{
            setFilterCount([...filterCount,name])
        }
    }

    function clearFilter(){
        setFilterValue(
            {price: "",
            category: [],
            rating: "",
            sorting: "",
            }
        );
        setFilterCount([])
    }
    
    function handleCart(product){
        setCartItems([...cartItems, product._id])
        toast.success('Item added to Cart')
    }

    useEffect(() => {
        if(filterValue.category.length === 0){
            setFilterCount(filterCount.filter(filterName => filterName != "category"))
        }
        if(!filterValue.sorting){
            setFilterCount(filterCount.filter(filterName => filterName != "sorting"))
        }
    },[filterValue])


    useEffect(() => {
        let result = [...data]
        if(filterValue.price){
            result = result.filter(product => product.price <= filterValue.price)
        }
        if(filterValue.category.length != 0){
            result = result.filter(product => filterValue.category.includes(product.petType))
        }
        if(filterValue.rating){
            result = result.filter(product => product.rating >= filterValue.rating)
        }
        if(filterValue.sorting){
            filterValue.sorting == "acending" ? result = result.sort((a,b) => a.price - b.price) : result = result.sort((a,b) => b.price - a.price)
        }

        setFilterProduct(result)
    },[filterValue, data])

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        localStorage.setItem("cart", JSON.stringify(cartItems))
    },[wishlist,cartItems])

    useEffect(() => {
        if(selectedPet){
            setFilterValue({...filterValue, category: [...filterValue.category,selectedPet]});
            setFilterCount([...filterCount,"category"])
        }else{
            filterValue
        } 
    },[selectedPet])
    
    const {toggleChange} = UseMatchMedia(990)
    return (
        <div>
            <Header/>
            {toggleChange
            ? 
            <div className="row">
                <div className="col-xl-3 col-lg-4">
                    <div className="d-flex justify-content-between">
                        <h5 className="pt-4 px-4 fw-bold">Filters</h5>
                        <button className="btn btn my-3 fw-semibold" style={{background: "#FFD966",color: "#2C786C"}} onClick={clearFilter}>Clear</button>
                    </div>
                    <section className="py-3 px-4 fs-5">
                        <h5 className="fw-bold">Price</h5>
                        <div className="d-flex justify-content-between ">
                            <span>100</span>
                            <span>500</span>
                            <span>1K</span>
                            <span>1.5K</span>
                            <span>2K</span>
                        </div>
                        <div className="position-relative">  
                            <input type="range" className="form-range pt-2" min="100" max="2000" step="100" id="range3" name="price" value={filterValue.price} onChange={applyfilter}></input>
                        </div>
                    </section>
                    <section className="py-3 px-4">
                        <h5 className="fw-bold">Category</h5>
                        <label className="fs-5"><input type="checkbox" name="category" checked={filterValue.category.includes("Dog")} value="Dog" onChange={applyfilter}/> Dogs </label> <br />
                        <label className="fs-5"><input type="checkbox" name="category" checked={filterValue.category.includes("Cat")} value="Cat" onChange={applyfilter}/> Cats </label> <br />
                        <label className="fs-5"><input type="checkbox" name="category" checked={filterValue.category.includes("Bird")} value="Bird" onChange={applyfilter}/> Birds </label> <br />
                        <label  className="fs-5"><input type="checkbox" name="category" checked={filterValue.category.includes("Fish")} value="Fish" onChange={applyfilter}/> Fishes </label> <br />
                    </section>
                    <section className="py-3 px-4">
                        <h5 className="fw-bold">Rating</h5>
                        <label className="fs-5"><input type="radio" name="rating" checked={filterValue.rating === 4} value="4" onChange={applyfilter}/> 4 Stars & above</label><br />
                        <label className="fs-5"><input type="radio" name="rating" checked={filterValue.rating === 3} value="3" onChange={applyfilter}/> 3 Stars & above</label><br />
                        <label className="fs-5"><input type="radio" name="rating" checked={filterValue.rating === 2} value="2" onChange={applyfilter}/> 2 Stars & above</label><br />
                        <label className="fs-5"><input type="radio" name="rating" checked={filterValue.rating === 1} value="1" onChange={applyfilter}/> 1 Stars & above</label><br />
                    </section>
                    <section className="py-3 px-4">
                        <h5 className="fw-bold">Sort by</h5>
                        <label className="fs-5"><input type="radio" checked={filterValue.sorting === "acending"} value="acending" name="sorting" onChange={applyfilter}/> Price - Low to High</label><br />
                        <label className="fs-5"><input type="radio" checked={filterValue.sorting === "decending"} value="decending" name="sorting" onChange={applyfilter}/> Price - High to Low</label><br />
                    </section>
                </div>
                <div className="col-xl-9 col-lg-8" style={{background: "#F8F9FA"}}>
                    <div className="container">
                        <div className="row p-3">
                            {loading && "Loading products...."}
                            {error && error.message}
                            {filteredProducts.map((product) => (
                                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 d-flex justify-content-center">
                                    <div className="listCard card mt-3 position-relative" style={{maxWidth: "300px"}}>
                                    {wishlist.includes(product._id) 
                                    ?
                                    <div className="position-absolute top-0 end-0 rounded-circle d-flex justify-content-center align-items-center mt-3 me-3 bg-light bg-opacity-75" style={{width:"40px", height: "40px"}}>
                                        <AiFillHeart size={30}  onClick={() => handleClick(product)} style={{color: "#FF6B6B", cursor: "pointer"}}/>
                                    </div>
                                    :
                                    <div className="position-absolute top-0 end-0 rounded-circle d-flex justify-content-center align-items-center mt-3 me-3 bg-secondary bg-opacity-50" style={{width:"40px", height: "40px"}}>
                                        <AiOutlineHeart size={30} className="text-light" onClick={() => handleClick(product)} style={{cursor: "pointer"}}/>
                                    </div>
                                    }
                                    <Link to={`/products/${product._id}`}><img src={product.imageUrl} className="listCardImg card-img-top object-fit-cover"  alt="prodImg"/></Link>
                                    <div className="card-body">
                                        <Link to={`/products/${product._id}`} className="text-decoration-none text-reset"><h5 className="card-title text-center fw-medium text-truncate">{product.name}</h5></Link>
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
                            ) 
                            )}
                        </div>
                    </div>
                </div>
            </div>
            :
            <>
            <div style={{background: "#F8F9FA"}}>
            <div className="d-flex justify-content-between flex-column flex-sm-row container">
             {filterCount.length === 0
             ?
             <div>
                <button className="my-3 ms-sm-4 filterBtn rounded-pill" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><FiFilter size={20}/> Show Filters</button>  
            </div>
             : 
             <div>
                <button className="my-3 ms-sm-4 filterBtn rounded-pill" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><FiFilter size={20}/> Filter Applied ({filterCount.length})</button>  
            </div>
            }   
            
            <div>
                <select value={filterValue.sorting} name="sorting" className="form-select mt-sm-4 me-sm-3 px-4 mt-3" onChange={applyfilter}>
                    <option value="">Sort By</option>
                    <option value="acending"> Price - Low to High</option>
                    <option value="decending"> Price - High to Low</option>
                </select>
            </div>
            </div>
            </div>
            <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{  maxWidth: "90%" }}>
                <div className="offcanvas-header">
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="pt-4 px-4 fw-bold">Filters</h5>
                        <button className="btn btn my-3 fw-semibold" style={{background: "#FFD966",color: "#2C786C"}} onClick={clearFilter}>Clear</button>
                    </div>
                    <section className="py-3 px-4 fs-5">
                        <h5 className="fw-bold">Price</h5>
                        <div className="d-flex justify-content-between ">
                            <span>100</span>
                            <span>500</span>
                            <span>1K</span>
                            <span>1.5K</span>
                            <span>2K</span>
                        </div>
                        <div className="position-relative">  
                            <input type="range" className="form-range pt-2" min="100" max="2000" step="100" id="range3" name="price" value={filterValue.price} onChange={applyfilter}></input>
                        </div>
                    </section>
                    <section className="py-3 px-4">
                        <h5 className="fw-bold">Category</h5>
                        <label className="fs-5"><input type="checkbox" name="category" checked={filterValue.category.includes("Dog")} value="Dog" onChange={applyfilter}/> Dogs </label> <br />
                        <label className="fs-5"><input type="checkbox" name="category" checked={filterValue.category.includes("Cat")} value="Cat" onChange={applyfilter}/> Cats </label> <br />
                        <label className="fs-5"><input type="checkbox" name="category" checked={filterValue.category.includes("Bird")} value="Bird" onChange={applyfilter}/> Birds </label> <br />
                        <label  className="fs-5"><input type="checkbox" name="category" checked={filterValue.category.includes("Fish")} value="Fish" onChange={applyfilter}/> Fishes </label> <br />
                    </section>
                    <section className="py-3 px-4">
                        <h5 className="fw-bold">Rating</h5>
                        <label className="fs-5"><input type="radio" name="rating" checked={filterValue.rating === 4} value="4" onChange={applyfilter}/> 4 Stars & above</label><br />
                        <label className="fs-5"><input type="radio" name="rating" checked={filterValue.rating === 3} value="3" onChange={applyfilter}/> 3 Stars & above</label><br />
                        <label className="fs-5"><input type="radio" name="rating" checked={filterValue.rating === 2} value="2" onChange={applyfilter}/> 2 Stars & above</label><br />
                        <label className="fs-5"><input type="radio" name="rating" checked={filterValue.rating === 1} value="1" onChange={applyfilter}/> 1 Stars & above</label><br />
                    </section>
                    <section className="py-3 px-4">
                        <h5 className="fw-bold">Sort by</h5>
                        <label className="fs-5"><input type="radio" checked={filterValue.sorting === "acending"} value="acending" name="sorting" onChange={applyfilter}/> Price - Low to High</label><br />
                        <label className="fs-5"><input type="radio" checked={filterValue.sorting === "decending"} value="decending" name="sorting" onChange={applyfilter}/> Price - High to Low</label><br />
                    </section>
                </div>
            </div>
            <div className="col-xl-9 col-lg-8" style={{background: "#F8F9FA"}}>
                    <div className="container">
                        <div className="row p-3">
                            {loading && "Loading products...."}
                            {error && error.message}
                            {filteredProducts.map((product) => (
                                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 d-flex justify-content-center">
                                    <div className="listCard card mt-3 position-relative" style={{maxWidth: "300px"}}>
                                    {wishlist.includes(product._id) 
                                    ?
                                    <div className="position-absolute top-0 end-0 rounded-circle d-flex justify-content-center align-items-center mt-3 me-3 bg-light bg-opacity-75" style={{width:"40px", height: "40px"}}>
                                        <AiFillHeart size={30}  onClick={() => handleClick(product)} style={{color: "#FF6B6B", cursor: "pointer"}}/>
                                    </div>
                                    :
                                    <div className="position-absolute top-0 end-0 rounded-circle d-flex justify-content-center align-items-center mt-3 me-3 bg-secondary bg-opacity-50" style={{width:"40px", height: "40px"}}>
                                        <AiOutlineHeart size={30} className="text-light" onClick={() => handleClick(product)} style={{cursor: "pointer"}}/>
                                    </div>
                                    }
                                    <Link to={`/products/${product._id}`}><img src={product.imageUrl} className="listCardImg card-img-top object-fit-cover"  alt="prodImg"/></Link>
                                    <div className="card-body">
                                        <Link to={`/products/${product._id}`} className="text-decoration-none text-reset"><h5 className="card-title text-center fw-medium text-truncate">{product.name}</h5></Link>
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
                            ) 
                            )}
                        </div>
                    </div>
                </div>
            </>
            }
            
        </div>
    )
}

export default AllProducts;