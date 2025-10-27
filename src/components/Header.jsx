import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { useContext } from "react";
import { MyCartItems, MyWishlist } from "./contexts";
import { Link, useNavigate } from "react-router-dom";
import MyModal from "./searchModal";
import { BiSearch } from "react-icons/bi";
import { CircleUser } from 'lucide-react';
const Header = () => {
    const {wishlist} = useContext(MyWishlist)
    const {cartItems} = useContext(MyCartItems)
    let navigate = useNavigate()   
    return (
    <>
    <MyModal/>
    <div className="navbar navbar-expand-xl" data-bs-theme="dark" style={{ background: "#2C786C" }}>
    <div className="container py-3">
        {/* Brand (always visible) */}
        <Link className="navbar-brand" to="/">
        <div className="d-lg-none">
            <div className="d-flex flex-row align-items-center">
            <img
            src="/assets/products/Logo.png"
            alt="Logo"
            width={50}
            />
            <span className="logo ps-2 ">Petoria</span>
            </div>
        </div>
        </Link>
        <Link className="navbar-brand" to="/">
        <div className="d-none d-lg-block">
        <div className="d-flex flex-row">
            <img
            src="/assets/products/Logo.png"
            alt="Logo"
            width={50}
            />
            <div className="d-flex flex-column lh-1 ps-2">
            <span className="logo">Petoria</span>
            <span className="text-light">The world of pets, at your fingertips.</span>
            </div>
        </div>
        </div>
        </Link>

        {/* Hamburger button - visible only < lg */}
        <BiSearch size={30} className="d-xl-none text-light d-flex ms-auto me-3" data-bs-toggle="modal" data-bs-target="#myModal" style={{cursor: "pointer"}}/>
        <button
        className="navbar-toggler d-xl-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
        >
        <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas for small/medium screens */}
        <div
        className="offcanvas offcanvas-end d-xl-none"
        tabIndex="-1"
        id="offcanvasNavbar"
        style={{maxWidth: "75vw"}}
        >
        <div className="offcanvas-header" style={{background: "#2C786C"}}>
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Petoria</h5>
            <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            ></button>
        </div>
        <div className="offcanvas-body" style={{background: "#ffffff"}}>
            <div className="d-flex flex-column gap-3 mt-3">
                <div className="d-flex flex-row" onClick={() => navigate("/profile")} style={{cursor: "pointer"}}>
                    <CircleUser size={30} style={{color: "#2C786C"}}/> 
                    <span className="ms-3 fs-5 text-dark">User Profile</span>
                </div>
                <div className="d-flex flex-row" onClick={() => navigate("/wishlist")} style={{cursor: "pointer"}}>
                    <AiOutlineHeart size={30} className="text-dark"/> 
                    <span className="ms-3 fs-5 text-dark">Wish List ({wishlist.length})</span>
                </div>
                <div className="d-flex flex-row" onClick={() => navigate("/cart")} style={{cursor: "pointer"}}>
                    <AiOutlineShoppingCart size={30} className="text-dark"/> 
                    <span className="ms-3 fs-5 text-dark">Cart ({cartItems.length})</span>
                </div>
            </div>
        </div>
        </div>

        {/* Row/Cols for large screens only */}
        <div className="d-none d-xl-block w-100">
        <div className="row align-items-center">
            {/* Left: Brand already outside */}
            <div className="col-xl-4 col-lg-3"></div>

            {/* Center: Search */}
            <div className="col-xl-4 col-lg-5">
            <form className="d-flex" role="search">
                <input
                className="form-control me-2 bg-light"
                type="search"
                placeholder="Search"
                aria-label="Search"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
                />
            </form>
            </div>
            
            {/* Right: Icons */}
            <div className="col-xl-2 d-flex justify-content-center">
                <Link to="/profile" className="px-3" style={{color: "#FFD966"}}><CircleUser size={40}/></Link>
            </div>
            <div className="col-xl-1 text-center">
                {wishlist.length != 0 ?
                <div className="position-relative d-inline-block">
                    <span className="position-absolute  badge rounded-circle" style={{background: "#FFD966",color: "#2C786C",top: "-6px", right: "-13px",}}>
                    {wishlist.length}
                    </span>
                    <Link to="/wishlist"><AiOutlineHeart size={30} style={{color: "#ffffff"}}/></Link>
                </div>
                :
                <Link to="/wishlist"><AiOutlineHeart size={30} style={{color: "#ffffff"}}/></Link>
                }
            </div>
            <div className="col-xl-1 text-center text-light">
                {cartItems.length != 0 ?
                <div className="position-relative d-inline-block">
                    <span className="position-absolute  badge rounded-circle" style={{background: "#FFD966",color: "#2C786C",top: "-6px", right: "-13px",}}>
                    {cartItems.length}
                    </span>
                    <Link to="/cart"><AiOutlineShoppingCart size={30} style={{color: "#ffffff"}}/></Link>
                </div>
                :
                <Link to="/cart"><AiOutlineShoppingCart size={30} style={{color: "#ffffff"}}/></Link>
                }
            </div>
        </div>
        </div>
    </div>
    </div>
    </>
    )
}

export default Header;