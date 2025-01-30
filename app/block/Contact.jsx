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

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message || !captcha) {
      setError("Please fill in all fields and complete the CAPTCHA.");
      return;
    }

    setError("");
    setIsLoading(true); // Set loading to true when submitting the form

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
      setIsLoading(false); // Reset loading state after request
    }
  };

  const onCaptchaChange = (value) => {
    setCaptcha(value);
  };

  return (
    <section className="py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={onSubmit} className="space-y-6">
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
              id="email"
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

          <div className="">
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
              className="w-full sm:w-auto py-2 px-6 bg-black border text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm2 0a6 6 0 1 0 6-6 6 6 0 0 0-6 6z"
                    />
                  </svg>
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
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
