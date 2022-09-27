import { useRouter } from "next/router";
import ChangePassword from "../../components/ChangePassword/ChangePassword";

const ChangePasswordPage: React.FC = () => {
  const router = useRouter();

  const { token } = router.query as { token: string };

  return <ChangePassword token={token} />;
};

export default ChangePasswordPage;
