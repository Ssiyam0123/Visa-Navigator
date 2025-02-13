import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ErrorPage = () => {
  return (
    <div className=" w-1/2 mx-auto justify-center items-center">
      <DotLottieReact
        src="https://lottie.host/59d2177c-ad72-4fe0-8060-dbc3f98e26dd/5aIpv4TSz5.lottie"
        loop
        autoplay
      />

      <p className="text-[#007CFF] font-bold text-2xl w-full text-center">Page Not Found</p>
    </div>
  );
};



export default ErrorPage;
