import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Success from "../templates/Success";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [captcha, setCaptcha] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loadIframe = () => setIsLoaded(true);
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message || !captcha) {
      setError("Please fill in all fields and complete the CAPTCHA.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const payload = { name, email, message, captcha };
      const res = await axios.post("/api/contact", payload);

      if (res.status === 200) {
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
          setName("");
          setEmail("");
          setMessage("");
        }, 3000);
      }
    } catch (err) {
      console.log("Submit Error!", err);
      toast.error("Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const onCaptchaChange = (value) => {
    setCaptcha(value);
  };

  return (
    <section className="py-8 px-4 container">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-[50px]">
        <form
          onSubmit={onSubmit}
          className="space-y-6 w-full sm:w-[450px] max-w-full sm:max-w-[450px]"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder="Enter your Name"
              className="mt-1 block w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id=""
              placeholder="Enter your Email"
              className="mt-1 block w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message:
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="message"
              placeholder="Send your message"
              rows="4"
              className="mt-1 block w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <ReCAPTCHA
              theme="dark"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={onCaptchaChange}
            />
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto py-2 px-6 bg-black border text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-all duration-200 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                    width="50"
                    height="50"
                  >
                    <g>
                      <circle fill="#5bcde1" r="4" cy="50" cx="60">
                        <animate
                          begin="-0.67s"
                          keyTimes="0;1"
                          values="95;35"
                          dur="1s"
                          repeatCount="indefinite"
                          attributeName="cx"
                        ></animate>
                        <animate
                          begin="-0.67s"
                          keyTimes="0;0.2;1"
                          values="0;1;1"
                          dur="1s"
                          repeatCount="indefinite"
                          attributeName="fill-opacity"
                        ></animate>
                      </circle>
                      <circle fill="#5bcde1" r="4" cy="50" cx="60">
                        <animate
                          begin="-0.33s"
                          keyTimes="0;1"
                          values="95;35"
                          dur="1s"
                          repeatCount="indefinite"
                          attributeName="cx"
                        ></animate>
                        <animate
                          begin="-0.33s"
                          keyTimes="0;0.2;1"
                          values="0;1;1"
                          dur="1s"
                          repeatCount="indefinite"
                          attributeName="fill-opacity"
                        ></animate>
                      </circle>
                      <circle fill="#5bcde1" r="4" cy="50" cx="60">
                        <animate
                          begin="0s"
                          keyTimes="0;1"
                          values="95;35"
                          dur="1s"
                          repeatCount="indefinite"
                          attributeName="cx"
                        ></animate>
                        <animate
                          begin="0s"
                          keyTimes="0;0.2;1"
                          values="0;1;1"
                          dur="1s"
                          repeatCount="indefinite"
                          attributeName="fill-opacity"
                        ></animate>
                      </circle>
                    </g>
                    <g transform="translate(-15 0)">
                      <path
                        transform="rotate(90 50 50)"
                        fill="#576a8c"
                        d="M50 50L20 50A30 30 0 0 0 80 50Z"
                      ></path>
                      <path fill="#576a8c" d="M50 50L20 50A30 30 0 0 0 80 50Z">
                        <animateTransform
                          keyTimes="0;0.5;1"
                          values="0 50 50;45 50 50;0 50 50"
                          dur="1s"
                          repeatCount="indefinite"
                          type="rotate"
                          attributeName="transform"
                        ></animateTransform>
                      </path>
                      <path fill="#576a8c" d="M50 50L20 50A30 30 0 0 1 80 50Z">
                        <animateTransform
                          keyTimes="0;0.5;1"
                          values="0 50 50;-45 50 50;0 50 50"
                          dur="1s"
                          repeatCount="indefinite"
                          type="rotate"
                          attributeName="transform"
                        ></animateTransform>
                      </path>
                    </g>
                  </svg>
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>

        <div className="" onMouseEnter={loadIframe}>
          {isLoaded ? (
            <iframe
              className="w-[300px] sm:w-[400px] border-0 grayscale filter invert transition-all duration-300"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7851.346875210554!2d123.93225619577319!3d10.28787435933086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99986352e5ba1%3A0xd07b40adbd217233!2sCanjulao%2C%20Lapu-Lapu%20City%2C%20Cebu!5e0!3m2!1sen!2sph!4v1738634240376!5m2!1sen!2sph"
              width="400"
              height="350"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="w-[300px] sm:w-[400px] bg-gray-200 h-[350px] flex items-center justify-center text-gray-500">
              Loading Map...
            </div>
          )}
        </div>
      </div>

      {showSuccess && (
        <Success
          message={`Thank you, ${
            name || "Guest"
          }! Your message has been sent successfully!`}
        />
      )}

      <ToastContainer />
    </section>
  );
}
