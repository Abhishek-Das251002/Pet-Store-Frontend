import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { PartyPopper } from "lucide-react"


const OrderDetails = () => {
    const location = useLocation()
    const {selectedAddress, orderId, totalAmount} = location.state;

    let navigate = useNavigate()

    function handleContinue(path){
        navigate(path)
    }

    return (
        <div>
            <Header/>
            <div className="container">
                <div className="d-flex justify-content-center my-4">
                <div className="orderSummaryCard">
                    <p className="my-4 orderSummaryCardText fw-semibold">Thank you for your order #{orderId}</p>
                    <div class="card">
                        <div class="card-body orderSummaryCardText">
                            <h5 class="card-title text-center"><PartyPopper className="mx-3" style={{color: "#FFC107"}}/>Order placed successfully!</h5>
                            <hr />
                            <div className="d-flex flex-row m-3">
                                <div>
                                    <p className="m-2 fw-bold">Address:</p>
                                </div>
                                <div className="m-3">
                                    <h5>{selectedAddress.type}</h5>
                                    <span className="mt-2">{selectedAddress.addName}</span><br />  
                                    <span>{selectedAddress.mobNo}</span><br />
                                    <span>{selectedAddress.address}</span>,<br />
                                    <span>{selectedAddress.city},{selectedAddress.state} - {selectedAddress.pincode}</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row m-3">
                                <div>
                                    <p className="m-2 fw-bold">Order ID:</p>
                                </div>
                                <div className="m-2">
                                    <p>{orderId}</p>
                                </div>
                            </div>
                            <div className="d-flex flex-row m-3">
                                <div>
                                    <p className="m-2 fw-bold">Total Amount Paid:</p>
                                </div>
                                <div className="m-2">
                                    <p>{totalAmount}</p>
                                </div>
                            </div>
                            <hr />
                            <button className="btn btn rounded-pill fw-bold ms-4 mb-3 px-3" style={{background:"#FFC107", color: "#2C786C"}} onClick={() => handleContinue("/products")}>Continue Shopping</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails