import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  CHANGE_USER_EMAIL,
  CHANGE_USER_PASSWORD,
} from "graphql/productsqueries";
import client from "../shared/client";
import { signIn, signOut, useSession } from "next-auth/react";
import { setState } from "store/user/action";
import { userInitialState } from "store/user/reducer";

const LoginDetails = ({ setAddressModal, setModalText }) => {
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state.user.userData);
  // 3 states for updating Email

  const [newEmail, setNewEmail] = useState("");
  const [ConfirmNewEmail, setConfirmNewEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();

  // 3 states for upadting password
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setconfirmNewPass] = useState("");
  const [errorMsg, seterrorMsg] = useState({})
  const togglePasswordVisibilty = () => {
    setShowPassword(showPassword ? false : true);
  };
  const setformError=(key,message)=>{
    seterrorMsg({
      
      [key]:message
    })
  }

  const UpdatePasswordValidation=()=>{
    seterrorMsg({})
    if(!confirmNewPass.length) {
      setformError("confirmPass","Confirm Password can't be empty !") 
    } 

    if(!newPass.length){
      setformError("newPass","New Password can't be empty  !")
    }
    
   
    if(!currPass.length){
     
      setformError("currPass","current password can't be empty !")
    }
   
    
    if(currPass.length && newPass.length && confirmNewPass.length) return true
    else return false
  }

  const checkEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const emailChangeValidation=()=>{
    seterrorMsg({})
    if(!checkEmail(newEmail)) {
      setformError("newemail","please enter a valid email !") 
    } 

    if(!checkEmail(ConfirmNewEmail)){
      setformError("confirmNewemail","please enter a valid email!")
    }
    
   
    if(!pass.length){
     
      setformError("Pass","password can't be empty !")
      
    }
   
    
    if(newEmail.length && ConfirmNewEmail.length && pass.length) return true
    else return false
  }

  const passwordClick = async () => {
    if(UpdatePasswordValidation()){
      if (newPass !== confirmNewPass) {
        seterrorMsg({
          confirmPass:"Confirm password doesn't match New password"
        
        })
        return 
      }
  
      const res = await client.mutate({
        mutation: CHANGE_USER_PASSWORD,
        variables: {
          currentPassword: currPass,
          newPassword: newPass,
        },
      });
  
     
  
      if (res.data?.updateCustomerPassword?.__typename == "Success") {     
        setModalText("Password");
        setAddressModal(true);
        setCurrPass("")
        setconfirmNewPass("")
        setPass("")

      } else {
       
       seterrorMsg({
        msg:res.data?.updateCustomerPassword?.message
       })
      }

    }
    
  };

  

  const emailClick = async () => {
    if(emailChangeValidation())
    {
      if(newEmail!==ConfirmNewEmail){
        setformError("confirmNewemail","new email not match with confirm email")
        return 
      }
      else{
        const res = await client.mutate({
          mutation: CHANGE_USER_EMAIL,
          variables: {
            newEmailAddress: newEmail,
            password: pass,
          },
        });
        if (res.data?.requestUpdateCustomerEmailAddress?.__typename == "Success") {     
              const res1 = await signIn("credentials", {
                redirect: false,
                email: newEmail,
                password: pass,
                callbackUrl: `${window.location.origin}`,
              });
      
              // localStorage.removeItem("reduxStore-morf");
              // localStorage.removeItem("UserDetails");
              localStorage.removeItem("cartLength");
              dispatch(setState(userInitialState));
              setModalText("Email");
              setAddressModal(true);
              setNewEmail("")
              setPass("")
              setConfirmNewEmail("")
             
        } else {
          seterrorMsg({
            emailmsg:res.data?.requestUpdateCustomerEmailAddress?.message
           })
         
         
        }
       
      }

    
  }
}
  const session = useSession();

  return (
    <div className="loginDetails">
      <div className="loginDetails__Header">
        <p className="loginDetails__Heading">CHANGE OF E-MAIL ADDRESS</p>
        <div className="loginDetails__SubheadingContainer">
          <p className="loginDetails__Subheading">
            If you wish to update the E-mail address/password associated with
            this account, please fill in the following fields. Your password is
            requested for security reasons. Your current E-mail address is{" "}
            <strong style={{ color: "black" }}>{session?.data?.email}</strong>
          </p>
        </div>
        <div className="loginDetails__HeaderDivider"></div>
      </div>
      <div className="loginDetails__Body">
        <div className="loginDetails__Body__LeftSide">
          <div className="newEmailID">
            <p className="newEmailID__Label">New E-mail ID  <span className="error_text">
                  {errorMsg?.newemail}
                </span></p>
            <input
              className="newEmailID__Input"
              type="text"
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
              }}
              placeholder="New Email ID"
            />
          </div>
          <div className="newEmailID">
            <p className="newEmailID__Label">Confirm New E-mail ID  <span className="error_text">
                  {errorMsg?.confirmNewemail}
                </span></p>
            <input
              className="newEmailID__Input"
              type="text"
              value={ConfirmNewEmail}
              onChange={(e) => {
                setConfirmNewEmail(e.target.value);
              }}
              placeholder="Confirm New E-mail ID"
            />
          </div>
          <div className="newEmailID">
            <p className="newEmailID__Label">Password  <span className="error_text">
                  {errorMsg?.Pass}
                </span></p>
            <div className="newEmailID__InputContainer">
              <input
                className="newEmailID__Input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
              {showPassword ? (
                <span onClick={togglePasswordVisibilty}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30.484"
                    height="24.69"
                    viewBox="0 0 30.484 24.69"
                  >
                    <g transform="translate(-667 -691.467)">
                      <g transform="translate(-871.133 -256.225)">
                        <path
                          d="M1568.421,960.469c-4.074,5.086-9.32,8.149-15.047,8.149s-10.972-3.062-15.045-8.147a.875.875,0,0,1,0-1.1c8.677-10.855,21.467-10.855,30.094,0a.875.875,0,0,1,0,1.1Zm-15.046-7.06a6.512,6.512,0,1,1-6.512,6.512,6.512,6.512,0,0,1,6.512-6.512Z"
                          transform="translate(0 0)"
                          fill-rule="evenodd"
                        />
                        <path
                          d="M2217.377,1212.826a4.562,4.562,0,0,1,.961.1,1.879,1.879,0,1,0,2.915,2.063,4.551,4.551,0,1,1-3.876-2.165Z"
                          transform="translate(-664.002 -257.456)"
                          fill-rule="evenodd"
                        />
                      </g>
                      <g transform="translate(-6.536 0.5)">
                        <path
                          d="M676.536,12301l23.918,23.624"
                          transform="translate(-2 -11609.5)"
                          fill="none"
                          stroke="#000"
                          stroke-width="1.5"
                        />
                        <path
                          d="M676.536,12301l22.629,22.478"
                          transform="translate(0 -11609.5)"
                          fill="none"
                          stroke="#f5f8fd"
                          stroke-width="1.5"
                        />
                      </g>
                    </g>
                  </svg>
                </span>
              ) : (
                <span onClick={togglePasswordVisibilty}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30.484"
                    height="17.392"
                    viewBox="0 0 30.484 17.392"
                  >
                    <g transform="translate(-1538.133 -951.225)">
                      <path
                        d="M1568.421,960.469c-4.074,5.086-9.32,8.149-15.047,8.149s-10.972-3.062-15.045-8.147a.875.875,0,0,1,0-1.1c8.677-10.855,21.467-10.855,30.094,0a.875.875,0,0,1,0,1.1Zm-15.046-7.06a6.512,6.512,0,1,1-6.512,6.512,6.512,6.512,0,0,1,6.512-6.512Z"
                        transform="translate(0 0)"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M2217.377,1212.826a4.562,4.562,0,0,1,.961.1,1.879,1.879,0,1,0,2.915,2.063,4.551,4.551,0,1,1-3.876-2.165Z"
                        transform="translate(-664.002 -257.456)"
                        fill-rule="evenodd"
                      />
                    </g>
                  </svg>
                </span>
              )}
            </div>
          </div>
          <div>
            <p><span className="error_text" style={{
              marginBottom:"5px"

            }}>{errorMsg?.emailmsg}</span></p>
          </div>
          <div
            onClick={emailClick}
            style={{
              backgroundColor:
              newEmail.length && pass.length && ConfirmNewEmail.length && "black"

            }}
            className={`submitButton `}
          >
            <span>UPDATE E-MAIL</span>
          </div>
        </div>
        <div className="loginDetails__Body__LeftSide">
          <div className="newEmailID">
            
            <p className="newEmailID__Label">Current Password <span className="error_text">
                  {errorMsg?.currPass}
                </span></p>
            <div className="newEmailID__InputContainer">
              <input
                className="newEmailID__Input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={currPass}
                onChange={(e) => {
                  setCurrPass(e.target.value);
                }}
                style={{ marginBottom: "0px" }}
              />
              {showPassword ? (
                <span onClick={togglePasswordVisibilty}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30.484"
                    height="24.69"
                    viewBox="0 0 30.484 24.69"
                  >
                    <g transform="translate(-667 -691.467)">
                      <g transform="translate(-871.133 -256.225)">
                        <path
                          d="M1568.421,960.469c-4.074,5.086-9.32,8.149-15.047,8.149s-10.972-3.062-15.045-8.147a.875.875,0,0,1,0-1.1c8.677-10.855,21.467-10.855,30.094,0a.875.875,0,0,1,0,1.1Zm-15.046-7.06a6.512,6.512,0,1,1-6.512,6.512,6.512,6.512,0,0,1,6.512-6.512Z"
                          transform="translate(0 0)"
                          fill-rule="evenodd"
                        />
                        <path
                          d="M2217.377,1212.826a4.562,4.562,0,0,1,.961.1,1.879,1.879,0,1,0,2.915,2.063,4.551,4.551,0,1,1-3.876-2.165Z"
                          transform="translate(-664.002 -257.456)"
                          fill-rule="evenodd"
                        />
                      </g>
                      <g transform="translate(-6.536 0.5)">
                        <path
                          d="M676.536,12301l23.918,23.624"
                          transform="translate(-2 -11609.5)"
                          fill="none"
                          stroke="#000"
                          stroke-width="1.5"
                        />
                        <path
                          d="M676.536,12301l22.629,22.478"
                          transform="translate(0 -11609.5)"
                          fill="none"
                          stroke="#f5f8fd"
                          stroke-width="1.5"
                        />
                      </g>
                    </g>
                  </svg>
                </span>
              ) : (
                <span onClick={togglePasswordVisibilty}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30.484"
                    height="17.392"
                    viewBox="0 0 30.484 17.392"
                  >
                    <g transform="translate(-1538.133 -951.225)">
                      <path
                        d="M1568.421,960.469c-4.074,5.086-9.32,8.149-15.047,8.149s-10.972-3.062-15.045-8.147a.875.875,0,0,1,0-1.1c8.677-10.855,21.467-10.855,30.094,0a.875.875,0,0,1,0,1.1Zm-15.046-7.06a6.512,6.512,0,1,1-6.512,6.512,6.512,6.512,0,0,1,6.512-6.512Z"
                        transform="translate(0 0)"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M2217.377,1212.826a4.562,4.562,0,0,1,.961.1,1.879,1.879,0,1,0,2.915,2.063,4.551,4.551,0,1,1-3.876-2.165Z"
                        transform="translate(-664.002 -257.456)"
                        fill-rule="evenodd"
                      />
                    </g>
                  </svg>
                </span>
              )}
            </div>
          </div>
          <div className="newEmailID">
            <p className="newEmailID__Label">New Password  <span className="error_text">
                  {errorMsg?.newPass}
                </span></p>
            <div className="newEmailID__InputContainer">
              <input
                className="newEmailID__Input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter New Password"
                value={newPass}
                onChange={(e) => {
                  setNewPass(e.target.value);
                }}
              />
              {showPassword ? (
                <span onClick={togglePasswordVisibilty}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30.484"
                    height="24.69"
                    viewBox="0 0 30.484 24.69"
                  >
                    <g transform="translate(-667 -691.467)">
                      <g transform="translate(-871.133 -256.225)">
                        <path
                          d="M1568.421,960.469c-4.074,5.086-9.32,8.149-15.047,8.149s-10.972-3.062-15.045-8.147a.875.875,0,0,1,0-1.1c8.677-10.855,21.467-10.855,30.094,0a.875.875,0,0,1,0,1.1Zm-15.046-7.06a6.512,6.512,0,1,1-6.512,6.512,6.512,6.512,0,0,1,6.512-6.512Z"
                          transform="translate(0 0)"
                          fill-rule="evenodd"
                        />
                        <path
                          d="M2217.377,1212.826a4.562,4.562,0,0,1,.961.1,1.879,1.879,0,1,0,2.915,2.063,4.551,4.551,0,1,1-3.876-2.165Z"
                          transform="translate(-664.002 -257.456)"
                          fill-rule="evenodd"
                        />
                      </g>
                      <g transform="translate(-6.536 0.5)">
                        <path
                          d="M676.536,12301l23.918,23.624"
                          transform="translate(-2 -11609.5)"
                          fill="none"
                          stroke="#000"
                          stroke-width="1.5"
                        />
                        <path
                          d="M676.536,12301l22.629,22.478"
                          transform="translate(0 -11609.5)"
                          fill="none"
                          stroke="#f5f8fd"
                          stroke-width="1.5"
                        />
                      </g>
                    </g>
                  </svg>
                </span>
              ) : (
                <span onClick={togglePasswordVisibilty}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30.484"
                    height="17.392"
                    viewBox="0 0 30.484 17.392"
                  >
                    <g transform="translate(-1538.133 -951.225)">
                      <path
                        d="M1568.421,960.469c-4.074,5.086-9.32,8.149-15.047,8.149s-10.972-3.062-15.045-8.147a.875.875,0,0,1,0-1.1c8.677-10.855,21.467-10.855,30.094,0a.875.875,0,0,1,0,1.1Zm-15.046-7.06a6.512,6.512,0,1,1-6.512,6.512,6.512,6.512,0,0,1,6.512-6.512Z"
                        transform="translate(0 0)"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M2217.377,1212.826a4.562,4.562,0,0,1,.961.1,1.879,1.879,0,1,0,2.915,2.063,4.551,4.551,0,1,1-3.876-2.165Z"
                        transform="translate(-664.002 -257.456)"
                        fill-rule="evenodd"
                      />
                    </g>
                  </svg>
                </span>
              )}
            </div>
          </div>
          <div className="newEmailID2" >
            
            <p className="newEmailID__Label">Confirm New Password <span className="error_text">{errorMsg?.confirmPass}</span></p>
            <div className="newEmailID__InputContainer">
              <input
                className="newEmailID__Input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Confirm New Password"
                value={confirmNewPass}
                onChange={(e) => {
                  setconfirmNewPass(e.target.value);
                }}
              />
              {showPassword ? (
                <span onClick={togglePasswordVisibilty}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30.484"
                    height="24.69"
                    viewBox="0 0 30.484 24.69"
                  >
                    <g transform="translate(-667 -691.467)">
                      <g transform="translate(-871.133 -256.225)">
                        <path
                          d="M1568.421,960.469c-4.074,5.086-9.32,8.149-15.047,8.149s-10.972-3.062-15.045-8.147a.875.875,0,0,1,0-1.1c8.677-10.855,21.467-10.855,30.094,0a.875.875,0,0,1,0,1.1Zm-15.046-7.06a6.512,6.512,0,1,1-6.512,6.512,6.512,6.512,0,0,1,6.512-6.512Z"
                          transform="translate(0 0)"
                          fill-rule="evenodd"
                        />
                        <path
                          d="M2217.377,1212.826a4.562,4.562,0,0,1,.961.1,1.879,1.879,0,1,0,2.915,2.063,4.551,4.551,0,1,1-3.876-2.165Z"
                          transform="translate(-664.002 -257.456)"
                          fill-rule="evenodd"
                        />
                      </g>
                      <g transform="translate(-6.536 0.5)">
                        <path
                          d="M676.536,12301l23.918,23.624"
                          transform="translate(-2 -11609.5)"
                          fill="none"
                          stroke="#000"
                          stroke-width="1.5"
                        />
                        <path
                          d="M676.536,12301l22.629,22.478"
                          transform="translate(0 -11609.5)"
                          fill="none"
                          stroke="#f5f8fd"
                          stroke-width="1.5"
                        />
                      </g>
                    </g>
                  </svg>
                </span>
              ) : (
                <span onClick={togglePasswordVisibilty}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30.484"
                    height="17.392"
                    viewBox="0 0 30.484 17.392"
                  >
                    <g transform="translate(-1538.133 -951.225)">
                      <path
                        d="M1568.421,960.469c-4.074,5.086-9.32,8.149-15.047,8.149s-10.972-3.062-15.045-8.147a.875.875,0,0,1,0-1.1c8.677-10.855,21.467-10.855,30.094,0a.875.875,0,0,1,0,1.1Zm-15.046-7.06a6.512,6.512,0,1,1-6.512,6.512,6.512,6.512,0,0,1,6.512-6.512Z"
                        transform="translate(0 0)"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M2217.377,1212.826a4.562,4.562,0,0,1,.961.1,1.879,1.879,0,1,0,2.915,2.063,4.551,4.551,0,1,1-3.876-2.165Z"
                        transform="translate(-664.002 -257.456)"
                        fill-rule="evenodd"
                      />
                    </g>
                  </svg>
                </span>
              )}
            </div>
          </div>
          <div>
            <p><span className="error_text" style={{
              marginBottom:"5px"

            }}>{errorMsg?.msg}</span></p>
          </div>
          
          <div
            onClick={passwordClick}
            style={{
              backgroundColor: currPass.length && newPass.length && confirmNewPass.length
              &&  "#000000"
            }}
            className={`submitButton`}
          >
            <span>UPDATE PASSWORD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginDetails;
