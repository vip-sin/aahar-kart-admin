import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";
import { useState } from "react";
import Logo from "@/components/Logo";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();

  const groceryOffers = [
    {
      name: "Grocery Offer 1",
      description: "Description of the grocery offer 1",
    },
    {
      name: "Grocery Offer 2",
      description: "Description of the grocery offer 2",
    },
    // Add more grocery offers as needed
  ];

  const fmcgOffers = [
    { name: "FMCG Offer 1", description: "Description of the FMCG offer 1" },
    { name: "FMCG Offer 2", description: "Description of the FMCG offer 2" },
    // Add more FMCG offers as needed
  ];
  if (!session) {
    return (
      <div className="bg-bgGray min-h-screen flex items-center justify-center">
        <div className="text-center w-full max-w-lg p-8 rounded-lg bg-white shadow-md">
          <h1 className="text-3xl font-bold mb-6">
            Welcome to Aahar Kart Admin Portal!
          </h1>

          <button
            onClick={() => signIn("google")}
            className="bg-gray-600 text-white p-3 rounded-md shadow-md hover:bg-gray-700 transition duration-300"
          >
            Login with Google
          </button>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Special Offers on Groceries
            </h2>
            {groceryOffers.map((offer, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{offer.name}</h3>
                <p>{offer.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Special Offers on FMCG
            </h2>
            {fmcgOffers.map((offer, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{offer.name}</h3>
                <p>{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgGray min-h-screen ">
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}
