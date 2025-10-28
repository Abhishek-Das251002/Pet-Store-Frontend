import { useContext, useEffect, useState } from "react";
import { SaveAddresses } from "./contexts";
import { toast } from "react-toastify";


const ManageAddress = ({editAddress, setEditAddress}) => {
    const {address, setAddress} = useContext(SaveAddresses)
    const [addressFields, setAddressFields] = useState({})

    function handleChange(e){
        const {value, name} = e.target;
        setAddressFields({...addressFields, [name] : value})
    }   
    
    function handleSubmit(e){
        e.preventDefault();
        if(Object.keys(editAddress).length > 0){
            setAddress(address.map(addres => addres.id === editAddress.id ? addressFields : addres))
            toast.success("Address Updated Successfully.")
        }else{
            const newAddress = { ...addressFields, id: Date.now() }
            setAddress([...address, newAddress])
            toast.success("Address Saved Successfully.")
            setEditAddress({})
        }     
    }

    useEffect(() => {
        localStorage.setItem("addresses", JSON.stringify(address))
    },[address])

    useEffect(() => {
        if(Object.keys(editAddress).length > 0){
            setAddressFields(editAddress)
        }else{
            setAddressFields(
            {
                addName: "",
                mobNo: "",
                address: "",
                city: "",
                state: "",
                pincode: "",
                type: "",
            }
        ) 
        }
    },[editAddress])


    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-4" id="staticBackdropLabel">Address</h1>
                    {Object.keys(editAddress).length > 0
                    ?
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setEditAddress({})}></button>
                    :
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setAddressFields(
                                {
                                    addName: "",
                                    mobNo: "",
                                    address: "",
                                    city: "",
                                    state: "",
                                    pincode: "",
                                    type: "",
                                }
                            )}></button>
                    }
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="addressName" className="mt-2">Name: </label><br />
                                    <input type="text" id="addressName"  name="addName" value={addressFields.addName} className="form-control mt-2" onChange={handleChange} required/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="addressMobNo" className="mt-2">Mobile Number: </label><br />
                                    <input type="text" id="addressMobNo"  name="mobNo" value={addressFields.mobNo} className="form-control mt-2" onChange={handleChange} required/>
                                </div> 
                            </div>
                            <div>
                                <label htmlFor="addressLine" className="mt-2">Address: </label><br />
                                <input type="text" id="addressLine"  name="address" value={addressFields.address} className="form-control mt-2" onChange={handleChange} required/>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="addressCity" className="mt-2">City: </label><br />
                                    <input type="text" id="addressCity"  name="city" value={addressFields.city} className="form-control mt-2" onChange={handleChange} required/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="addressState" className="mt-2">State: </label><br />
                                    <input type="text" id="addressState"  name="state" value={addressFields.state} className="form-control mt-2" onChange={handleChange} required/>
                                </div> 
                            </div>     
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="addressPin" className="mt-2">Pincode: </label><br />
                                    <input type="text" id="addressPin" name="pincode" value={addressFields.pincode} className="form-control mt-2" onChange={handleChange} required/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="addressType" className="mt-2">Address Type: </label><br />
                                    <select id="addressType" name="type" value={addressFields.type} className="form-select mt-2" onChange={handleChange} required>
                                        <option value="">--select Address Type--</option>
                                        <option value="Home">Home</option>
                                        <option value="Work">Work</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div> 
                            </div>
                        </div>
                        <div className="mt-4 d-flex justify-content-end">
                            {Object.keys(editAddress).length > 0
                            ?
                            <>
                            <button className="btn btn-success" type="submit">Update Address</button>
                            <button className="btn btn-danger ms-2" type="button" data-bs-dismiss="modal" onClick={() => setEditAddress({})}>Cancel</button>
                            </>
                            :
                            <>
                            <button className="btn btn-success" type="submit">Save Address</button>
                            <button className="btn btn-danger ms-2" type="button" data-bs-dismiss="modal" onClick={() => setAddressFields(
                                {
                                    addName: "",
                                    mobNo: "",
                                    address: "",
                                    city: "",
                                    state: "",
                                    pincode: "",
                                    type: "",
                                }
                            )}>Cancel</button>
                            </>
                            }
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ManageAddress;