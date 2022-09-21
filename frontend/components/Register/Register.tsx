import RegisterForm from "../RegisterForm/RegisterForm";
import { _root } from "./Register.css";

interface Props {
}

const Register: React.FC<Props> = () => {
  return (
    <div className={_root}>
      <h1>Register</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
