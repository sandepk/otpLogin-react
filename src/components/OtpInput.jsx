import React, { useState, useRef, useEffect } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  console.log(inputRefs);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];

    // allow only one input
    newOtp[index] = value.substring(value.length - 1);

    // setOtp updated the value asynchronously that's why using newOtp rather than otp
    setOtp(newOtp);
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);
    
    // move to the next input if current input is filled
    if(value && index < length - 1 && inputRefs.current[index + 1]) {
      if(!otp[index+1]) inputRefs.current[index+1].focus();
      else if(otp.indexOf("", index+1)) inputRefs.current[otp.indexOf("", index+1)].focus();
      else {
        inputRefs.current[index+1].focus();
      }
    }

  };
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1,1);

    // optional
    if(index > 0 && !otp[index-1] && inputRefs.current[index-1]) {
      // move to the previous input if previous is empty
      inputRefs.current[otp.indexOf("")].focus();
    }

    
  };
  const handleKeyDown = (index, event) => {
    console.log(index)
    if(event.code === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index-1]) {

      // move to the previous input if Backspace is pressed
      inputRefs.current[index-1].focus();

    }
  };

  useEffect(() => {
    inputRefs.current[0] && inputRefs.current[0].focus();
  }, []);

  return (
    <div
      className="flex gap-3
    mt-6
    gap-y-7 justify-center"
    >
      {otp.map((value, index) => (
        <input
          key={index}
          className="p-2 w-12 border-2"
          ref={(input) => (inputRefs.current[index] = input)}
          type="text"
          value={value}
          onChange={(e) => handleChange(index, e)}
          onClick={(e) => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
