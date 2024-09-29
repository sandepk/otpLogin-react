import React, { useRef, useState } from "react";
import OtpInput from "./OtpInput";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
    //
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault();
    //
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid phone Number");
      return;
    }
    // call BE API
    // show OTP field
    setShowOtpInput(true);
  };

  const onOtpSubmit = (otp) => {
    console.log("otp submitted successfully!", otp);
  };

  return (
    <div className="p-4 bg-white">
      {!showOtpInput ? (
        <form
          onSubmit={handlePhoneSubmit}
          className=" flex flex-col gap-4 align-middle"
        >
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter Phone Number"
          />
          <button
            className="pt-4 bg-blue-700 rounded-xl flex justify-center align-middle"
            type="submit"
          >
            Submit
          </button>
        </form>
      ) : (
        <div>
          otp sent to {phoneNumber}
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneOtpForm;
