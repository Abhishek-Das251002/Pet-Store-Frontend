import Header from "../components/Header";
import { FaPlusCircle } from "react-icons/fa";
import ManageAddress from "../components/addressModal";
import { SaveAddresses } from "../components/contexts";
import { useContext, useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import useFetch from "../useFetch";

const MyProfile = () => {
    const {data, loading} = useFetch("pet-store-backend-8mwy86dq1-abhisheks-projects-74383ef5.vercel.app/orders/history")
    const {address, setAddress} = useContext(SaveAddresses)
    const [editAddress, setEditAddress] = useState({})

    function handleDelete(delId){
        setAddress(address.filter(add => delId != add.id))
        toast.error("Address Deleted!")
    }

    function handleEdit(addressToEdit){
        setEditAddress(addressToEdit);
    }

    useEffect(() => {
        localStorage.setItem("addresses", JSON.stringify(address))
    },[address])

    console.log(data)
    return (  
        <div>
            <Header/>
            <ManageAddress editAddress = {editAddress} setEditAddress={setEditAddress}/>
            <div className="d-flex justify-content-center my-5">
                <ul className="list-group addAllDetails mx-2">
                    <li className="list-group-item p-3"><span className="fw-semibold fs-5">Name</span><br /><span className="fs-5">Abhishek Gautam</span></li>
                    <li className="list-group-item"><span className="fw-semibold fs-5">Email</span><br /><span className="fs-5">abhishekg@gmail.com</span></li>
                    <li className="list-group-item"><span className="fw-semibold fs-5">Mobile Number</span><br /><span className="fs-5">+918196000419</span></li>
                    <li className="list-group-item">
                        <p className="fw-semibold fs-5">Addresses</p>
                        <button className="btn btn rounded-pill my-2" style={{background: "#2C786C", color: "#ffffff"}} data-bs-toggle="modal" data-bs-target="#staticBackdrop"><FaPlusCircle size={20} className="m-1"/><span className="m-1">Add New Address</span></button>
                        <div className="mt-2">
                            <p className="fw-semibold fs-5 mt-2">Saved Address</p>
                            <div>
                                {
                                    address.length === 0
                                    ?
                                    <div className="d-flex justify-content-center">
                                        <p className="text-secondary">No Saved Addresses, Please Add new Address!</p>
                                    </div>
                                    :
                                    address.map(addrs => (
                                        <div className="card mt-3 d-flex flex-row justify-content-between">
                                        <div className="addCardDetails m-3">
                                            <span className="card-title fw-semibold">{addrs.type}</span><br />
                                            <span className="card-subtitle mt-2 fw-semibold">{addrs.addName}</span><br /> 
                                            <span className="card-text">{addrs.mobNo}</span><br />
                                            <span className="card-text">{addrs.address}</span>,<br />
                                            <span className="card-text">{addrs.city},{addrs.state} - {addrs.pincode}</span>
                                        </div>
                                        <div className="m-sm-3 m-2">
                                            <Pencil className="mx-2" style={{cursor: "pointer"}} data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleEdit(addrs)}/>
                                            <Trash2 style={{cursor: "pointer"}} onClick={() => handleDelete(addrs.id)}/>
                                        </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="mt-2">
                            <p className="fw-semibold fs-5 mt-2">Order History</p>
                            {data.length > 0
                            ?
                            data.map(order => (
                                <div class="card mt-3">
                                    <div class="card-body">
                                        <p><strong>Order Id: </strong>{order.orderId}</p>
                                        <p><strong>Total Items: </strong>{order.items.length}</p>
                                        <p><strong>Total Amount Paid: </strong>₹ {order.totalAmount}</p>
                                        <p><strong>Address: </strong>{order.deliveryAddress.address}, {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}</p>  
                                        <p><strong>Order Date: </strong>{new Date(order.createdAt).toLocaleString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                            timeZone: "Asia/Kolkata",
                                            })}
                                        </p>                                      
                                    </div>
                                </div>
                            ))
                            : 
                            <div className="d-flex justify-content-center">
                                <p className="text-secondary">No Orders Yet!</p>
                            </div>
                            }
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MyProfile;