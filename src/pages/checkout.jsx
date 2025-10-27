import { useContext, useEffect, useState } from "react";
import { SaveAddresses, MyCartItems, CartItemQuantity } from "../components/contexts";
import ManageAddress from "../components/addressModal";
import Header from "../components/Header";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Checkout = () => {
    const {itemId} = useParams()
    const {address, setAddress} = useContext(SaveAddresses)
    const [editAddress, setEditAddress] = useState({})
    const {data,loading, error} = useFetch("pet-store-backend-8mwy86dq1-abhisheks-projects-74383ef5.vercel.app/products")
    const {cartItems, setCartItems} = useContext(MyCartItems)
    const {itemQuantity, setItemQuantity} = useContext(CartItemQuantity)
    const [selectedAddress, setSelectedAddress] = useState({})
    
    let navigate = useNavigate()

    

    const cartProducts = data.filter(prod => cartItems.includes(prod._id))
    const totalCartPrice = cartProducts.reduce((acc, curr) => acc += ((itemQuantity[curr._id] || 1) * curr.price),0)
    const totalCartDiscount = Math.round(cartProducts.reduce((acc, curr) => acc += ((itemQuantity[curr._id] || 1) * curr.price * (curr.discount/100)),0).toFixed(2))
    
    
    const selectedProduct = data.filter(item => itemId === item._id)
    const totalProductPrice = selectedProduct.reduce((acc, curr) => acc += ((itemQuantity[curr._id] || 1) * curr.price),0)
    const productDiscount = Math.round(selectedProduct.reduce((acc, curr) => acc += ((itemQuantity[curr._id] || 1) * curr.price * (curr.discount/100)),0).toFixed(2))
    const deliveryCharges = 50

    const totalAmount = itemId ? totalProductPrice - productDiscount + deliveryCharges : totalCartPrice - totalCartDiscount + deliveryCharges


    const navigateError = <p>unable to place order please try again.</p>
    const orderId = Date.now()

    

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems))
    },[cartItems])

    useEffect(() => {
        localStorage.setItem("addresses", JSON.stringify(address))
    },[address])
 
    async function handleForm(e){
        e.preventDefault();
        if(itemId){
            try {
            const response = await fetch('pet-store-backend-8mwy86dq1-abhisheks-projects-74383ef5.vercel.app/orders/history', {
            method: 'POST',
            body: JSON.stringify({ 
                orderId : orderId,
                items : selectedProduct.map(item => (
                    {
                        productId : item._id,
                        productName: item.name,
                        quantity : (itemQuantity[itemId] || 1),
                        price: item.price,
                        imageUrl: item.imageUrl
                    }
                )),
                totalAmount: totalAmount,
                deliveryAddress: selectedAddress,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            });
            if(!response.ok){
                return navigateError
            }else{
                navigate("/orderDetails", {state:{ selectedAddress, orderId, totalAmount}});
            }
        } catch (err) {
            console.error(`Error: ${err}`);
        }
        }else{
            try {
            const response = await fetch('pet-store-backend-8mwy86dq1-abhisheks-projects-74383ef5.vercel.app/orders/history', {
            method: 'POST',
            body: JSON.stringify({ 
                orderId : orderId,
                items : cartProducts.map(item => (
                    {
                        productId : item._id,
                        productName: item.name,
                        quantity : (itemQuantity[item._id] || 1),
                        price: item.price,
                        imageUrl: item.imageUrl
                    }
                )),
                totalAmount: totalAmount,
                deliveryAddress: selectedAddress,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            });
            if(!response.ok){
                return navigateError
            }else{
                setCartItems([])
                navigate("/orderDetails", {state:{ selectedAddress, orderId, totalAmount}});
            }
        } catch (err) {
            console.error(`Error: ${err}`);
        }

    }
        
    }


    return (
        <div>
            <Header/>
            <ManageAddress editAddress = {editAddress} setEditAddress={setEditAddress}/>
            <div className="d-flex justify-content-center my-5">
                <div class="card checkoutCard">
                <form onSubmit={handleForm}>
                <div class="card-body">
                <h5 class="card-title m-3">Choose Delivery Address:</h5>
                <ul className="list-group">
                    {
                    address.map(currentAdd => 
                        <li className="list-group-item d-flex flex-row chooseAddCardText">
                            <div className="m-2 m-sm-3">
                                <input type="radio" name="address" required onClick={() => setSelectedAddress(currentAdd)}/>
                            </div>
                            <div className="m-2 m-sm-3">
                                <h5>{currentAdd.type}</h5>
                                <span className="mt-2">{currentAdd.addName}</span><br />  
                                <span>{currentAdd.mobNo}</span><br />
                                <span>{currentAdd.address}</span>,<br />
                                <span>{currentAdd.city},{currentAdd.state} - {currentAdd.pincode}</span>
                            </div>
                        </li>
                        )
                    }
                </ul>
                </div>
                <p className="ms-3 fs-5 fw-bold">OR</p>  
                <button className="rounded-pill btn btn ms-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{background: "#2C786C",color:"#ffffff"}}>Add New Address</button>   
                <hr /> 
                <div className="m-3">
                    <div className="card chooseAddCardText mx-2">
                    <div className="card-body">
                        <p className="fw-semibold">Order Summary:</p>
                    <hr />
                    {
                        itemId
                        ?
                        <div className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between mb-2">
                            <span>Price (1 item)</span>
                            <span>₹{totalProductPrice}</span>
                        </div>
                        <div className="d-flex flex-row justify-content-between mb-2">
                            <span>Discount</span>
                            <span>- ₹{productDiscount}</span>
                        </div>
                        <div className="d-flex flex-row justify-content-between mb-2">
                            <span>Delivery Charges</span>
                            <span>₹{deliveryCharges}</span>
                        </div>
                        <hr />
                        <div className="d-flex flex-row justify-content-between fw-semibold">
                            <span>TOTAL AMOUNT</span>
                            <span>₹{totalAmount}</span>
                        </div>
                        <hr />
                        <p>You will save ₹{productDiscount} on this order</p>
                        <button className="btn btn checkoutBtn" type="submit" style={{background: "#2C786C", color: "#ffffff"}}>Proceed to Checkout</button>
                        </div>
                        :
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
                            <span>₹{totalAmount}</span>
                        </div>
                        <hr />
                        <p>You will save ₹{totalCartDiscount} on this order</p>
                        <button className="btn btn checkoutBtn" type="submit" style={{background: "#2C786C", color: "#ffffff"}}>Proceed to Checkout</button>
                        </div>
                    }
                    
                    </div>
                    </div>    
                </div>
                </form>        
                </div>
            </div>            
        </div>
    )
}

export default Checkout;