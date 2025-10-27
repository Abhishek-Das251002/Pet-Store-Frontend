import { PackageSearch, Truck, BadgeCheck, Wallet } from "lucide-react"
import { useNavigate } from "react-router-dom";

const Home = () => {
    let navigate = useNavigate()
    return (
        <div>
            <div style={{ background: "linear-gradient(to bottom, #2C786C, #90D4C5)" }}>
                <div className="container">
                    <div className="row" style={{ minHeight: "60vh" }}>   
                        <div className="col-xl-7 col-lg-6 col-12 d-flex justify-content-center text-center text-lg-start">
                            <div className="pt-3 pt-lg-5">
                                <h1 className="text-white fw-bold display-4">
                                    Everything for Your Pets,<br /> All in One Place
                                </h1>
                                <p className="fw-medium fs-5 text-white">
                                    Care, Play, and Happiness for Every Pet
                                </p>
                                <button className="fw-medium btn btn-lg" 
                                style={{ backgroundColor: "#FFD966", color: "#2C786C" }} onClick={() => navigate("/products")}>
                                    Shop Now
                                </button>
                            </div>
                        </div>

                        <div className="col-xl-5 col-lg-6 col-12 mt-4 mt-lg-5">
                            <img 
                                src="assets/products/Home.jpg" 
                                className="img-fluid rounded-3 shadow" 
                                style={{ width: "100%", maxHeight: "60vh"}} 
                                alt="Pets" 
                            />
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <div style={{backgroundColor: "#E6F5F0"}}>
                    <div className="container">
                    <div className="row pt-3 pb-5">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 gy-md-3 gy-3 d-flex justify-content-center">
                            <div className="card catgrys" onClick={() => navigate(`/products/category/Dog`)} style={{cursor: "pointer"}}>
                                <img src="assets/categories/dogImg1.svg" className="card-img-top img-fluid" alt="category" />
                                <div className="card-body">
                                    <h2 className="card-text catgrys-text text-center fw-bold">Dogs</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 gy-md-3 gy-3 d-flex justify-content-center">
                            <div className="card catgrys" onClick={() => navigate(`/products/category/Cat`)} style={{cursor: "pointer"}}>
                                <img src="assets/categories/catImg3.svg" className="card-img-top" alt="category" />
                                <div className="card-body">
                                    <h2 className="card-text catgrys-text text-center fw-bold">Cats</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 gy-md-3 gy-3 d-flex justify-content-center">
                            <div className="card catgrys" onClick={() => navigate(`/products/category/Bird`)} style={{cursor: "pointer"}}>
                                <img src="assets/categories/birdImg1.svg" className="card-img-top" alt="category" onClick={() => navigate(`/products/${Bird}`)}/>
                                <div className="card-body">
                                    <h2 className="card-text catgrys-text text-center fw-bold">Birds</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 gy-md-3 gy-3 d-flex justify-content-center">
                            <div className="card catgrys" onClick={() => navigate(`/products/category/Fish`)} style={{cursor: "pointer"}}>
                                <img src="assets/categories/fishImg1.svg" className="card-img-top" alt="category" />
                                <div className="card-body">
                                    <h2 className="card-text catgrys-text text-center fw-bold">Fishes</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container  pt-3 pb-5">
                <div className="py-3">
                    <h1 className="text-center fw-bold" style={{color: "#2C786C"}}>Why Choose Petoria?</h1>
                </div>
                <div className="row py-3 d-flex justify-content-center">
                    <div className="col-sm-6 col-12  gy-3 text-center h-100 mx-3" style={{maxWidth: "280px"}}>
                                <PackageSearch style={{color: "#2C786C"}} size={50} className="mb-3"/>
                            <div>
                                <h5 className="fw-bold">Wide Range</h5>
                                <p className="text-muted">Everything your pet needs, from food to toys.</p>
                            </div>
                    </div>
                    <div className="col-sm-6 col-12 gy-3 text-center h-100 mx-3" style={{maxWidth: "280px"}}>
                                <Truck style={{color: "#2C786C"}} size={50} className="mb-3"/>
                            <div>
                                <h5 className="fw-bold">Fast Delivery</h5>
                                <p className="text-muted">Quick, reliable delivery to your doorstep.</p>
                            </div>
                    </div>
                    <div className="col-sm-6 col-12 gy-3 text-center h-100 mx-3" style={{maxWidth: "280px"}}>
                                <BadgeCheck style={{color: "#2C786C"}} size={50} className="mb-3"/>
                            <div>
                                <h5 className="fw-bold">Trusted Brands</h5>
                                <p className="text-muted">Only the most loved and safe products.</p>
                            </div>
                    </div>
                    <div className="col-sm-6 col-12 gy-3 text-center h-100 mx-3" style={{maxWidth: "280px"}}>
                                <Wallet style={{color: "#2C786C"}} size={50} className="mb-3"/>
                            <div>
                                <h5 className="fw-bold">Affordable Pet Products</h5>
                                <p className="text-muted">Shop trusted pet items at the best prices.</p>
                            </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
 