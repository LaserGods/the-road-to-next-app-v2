import Link from "next/link";
import { redirect } from "next/navigation";
import { CardCompact } from "@/components/card-compact";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { getAuth } from "@/features/auth/queries/get-auth";
import { passwordForgotPath, signUpPath, ticketsPath } from "@/paths";

const SignInPage = async () => {
  const authState = await getAuth();
  if (!authState.user) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <CardCompact
          title="Sign In"
          description="Sign in to your account"
          className="animate-fade-from-top w-full max-w-[420px]"
          content={<SignInForm />}
          footer={
            <>
              <Link
                href={signUpPath()}
                className="text-muted-foreground text-sm"
              >
                No account yet?
              </Link>
              <Link
                href={passwordForgotPath()}
                className="text-muted-foreground text-sm"
              >
                Forgot password?
              </Link>
            </>
          }
        />
      </div>
    );
  } else {
    return redirect(`${ticketsPath()}`);
  }
};

export default SignInPage;
