import Image from "next/image";

export default function Contact() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-3xl mx-auto ">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
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
    </section>
  );
}
