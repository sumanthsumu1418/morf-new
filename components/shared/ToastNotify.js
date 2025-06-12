import { toast } from "react-toastify";
export const ToastNotify = (props) => {
  switch (props) {
    case "CurrentUser":
      return toast.success("Success");
      break;
    case "InvalidCredentialsError":
      toast.error("Kindly Check All Fields Again");
      break;
    case "NotVerifiedError":
      toast.error("User not Verified");
      break;
    case "Success":
      return toast.success("Success");
      break;
    case "MissingPasswordError":
      toast.error("Password Field Missing!");
      break;
    case "PasswordValidationError":
      toast.error("Password Does not match!");
      break;
  }
};
