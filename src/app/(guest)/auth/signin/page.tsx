
import AuthSignIn from "@/app/component/authSignin/page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await getServerSession();

  if (session) {
    //redirect to homepage
    //khi login git se trực tiếp vào trang này
    redirect("/");
  }


  return <AuthSignIn />;
};

export default SignInPage;
