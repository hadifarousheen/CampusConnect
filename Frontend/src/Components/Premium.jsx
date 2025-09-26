import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/constants"
import axios from "axios"

const Premium=()=>{
    const[isUserPremium,setisUserPremium]=useState(false)
    const verifyPremiumUser=async()=>{
        const res=await axios.get(BASE_URL+"/premium/verify",{withCredentials:true})
        if(res.data.isPremium){
            setisUserPremium(true)
        }
    }
    const handleBuyClick=async(type)=>{
        const order=await axios.post(BASE_URL+"/payment/create",{memberShipType:type},{withCredentials:true})
          const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "CampusConnect",
      description: "Connect to other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
     handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    }
  useEffect(()=>{
    verifyPremiumUser()
  },[])
    
    return (
        <div
      className="flex items-center justify-center  h-[calc(100vh-3.5rem)] "
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')",
      }}
    >
        {isUserPremium ? <h1>already a Premium User</h1>:
  <div className="flex border  ">
    <div className="border p-6">
        <h1 className="font-bold text-3xl">BASIC</h1>
        <div className="text-2xl py-2">
        <p>Send 50+ Friend request Daily</p>
        <p>Unlimited Chat</p>
        <p>Premium Logo Visibility</p>
        </div>
        <button className="bg-yellow-400 text-white font-bold py-2 w-full my-2" onClick={()=>handleBuyClick('basic')}>Buy Now</button>
    </div>
    <div className="border p-6">
        <h1 className="font-bold text-3xl">ADVANCE</h1>
        <div className="text-2xl py-2">
          <p>Send 100+ Friend request Daily</p>
        <p>Unlimited Chat</p>
        <p>Premium Logo Visibility</p>
        </div>
        <button className="bg-amber-700 w-full text-white font-bold py-2 my-2" onClick={()=>handleBuyClick("advance")}>Buy Now</button>
    </div>
  </div>
}
        </div>
    )
}

export default Premium;