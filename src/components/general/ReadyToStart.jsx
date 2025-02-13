import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ReadyToStart = () => {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold text-textDark dark:text-textLight">
        Ready to Start Your Journey?
      </h1>
      <DotLottieReact
        src="https://lottie.host/6dac3d4e-b8e0-430a-9258-875f9c9273be/Fyenb9xg7B.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default ReadyToStart;
