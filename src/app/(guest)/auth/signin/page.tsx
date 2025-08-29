
import AuthSignIn from "@/app/component/authSignin/page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await getServerSession();

  if (session) {
    //redirect to homepage
    redirect("/");
  }


  return <AuthSignIn />;
};

export default SignInPage;
