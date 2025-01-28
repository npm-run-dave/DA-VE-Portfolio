import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Data", { name, email, message });

    try {
      const payload = {
        name,
        email,
        message,
      };

      const res = await axios.post("/api/contact", payload);

      if (res.status === 200) {
        toast.success(
          `Thank you, ${name}! Your message has been sent successfully!`
        );

        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      console.log("Submit Error!", err);
      toast.error("Something went wrong, please try again later.");
    }
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

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto py-2 px-6 bg-black border text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </section>
  );
}
