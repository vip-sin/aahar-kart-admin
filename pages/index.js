import Card from "@/components/Card";
import Carousel from "@/components/Carousel";
import Graph from "@/components/Graph";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import "chart.js/auto";
export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="text-blue-900 flex justify-between items-center">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden items-center">
          <img src={session?.user?.image} alt="" className="w-6 h-6" />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
      <div className="my-4">
        <h1>Welcome to the Admin Portal!</h1>
        <div className="grid grid-cols-1 mt-1">
          <Carousel
            images={[
              "/assets/image1.jpeg",
              "/assets/image2.jpeg",
              "/assets/image3.jpeg",
            ]}
          />
        </div>
        <p>
          This portal provides you with various features to manage your
          e-commerce platform efficiently. Here are the key functionalities
          available to you:
        </p>
        <ul className="list-disc list-inside my-4">
          <li>
            <strong>Create Categories:</strong> Organize products by creating
            different categories.
          </li>
          <li>
            <strong>Upload Product Details:</strong> Add new products with
            images and descriptions.
          </li>
          <li>
            <strong>View Orders and Status:</strong> Monitor and manage customer
            orders and their statuses.
            <div className="grid grid-cols-1">
              <Graph data={([5, 10, 8, 15, 12], [6, 0, 11, 5, 2])} />
            </div>
          </li>
          <li>
            <strong>User Count:</strong> Track the number of registered users on
            your platform.
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Card title="Total Sales" value="$10,000" />
              <Card title="New Users" value="235" />
            </div>
          </li>
          {/* Add more functionalities here */}
        </ul>
        <p>
          To get started, navigate through the sidebar or the menu to access
          these functionalities. If you have any questions, refer to the help
          section or contact support for assistance.
        </p>
      </div>
    </Layout>
  );
}
