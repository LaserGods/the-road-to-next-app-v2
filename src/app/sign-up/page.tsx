import { CardCompact } from "@/components/card-compact";

const SignUpPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Sign Up"
        description="Create an account to get started"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={"Sign Up Form"}
      />
    </div>
  );
};

export default SignUpPage;
