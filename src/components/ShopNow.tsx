import { Link } from "react-router-dom";
import promoImage from "../assets/ChatGPT Image Aug 24, 2025, 12_41_32 PM.png"; // <-- place your image inside src/assets/

export default function ShopNow() {
  return (
    <section className="max-w-5xl mx-auto my-10 px-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={promoImage}
            alt="Shop fresh foodstuff"
            className="w-full h-64 md:h-full object-cover"
          />
        </div>

        {/* Text & Button Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Shop Fresh Foodstuff Online 🛒
          </h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Get affordable and quality food items delivered fast to your
            doorstep. Powered by{" "}
            <span className="font-semibold text-green-600">TasknCart</span>.
          </p>

          <Link
            to="https://taskncart.shop"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition w-full md:w-auto text-center"
          >
            🚀 Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
