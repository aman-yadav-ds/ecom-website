import React from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

export default function Home() {
  const products = [
    {
      id: 1,
      title: "Koreva Pro Power Weeder 9HP",
      category: "Power Weeders",
      price: 45000,
      image: "/products/power-weeder.jpg",
      variants: 2,
    },
    {
      id: 2,
      title: "Heavy Duty Rotavator 6ft",
      category: "Rotavators",
      price: 115000,
      image: "/products/rotavator.jpg",
    },
    {
      id: 3,
      title: "Backpack Brush Cutter 4 Stroke",
      category: "Brush Cutters",
      price: 12500,
      image: "/products/brush-cutter.jpg",
      variants: 3,
    },
    {
      id: 4,
      title: "Premium Power Tiller 15HP",
      category: "Power Tillers",
      price: 185000,
      image: "/products/power-tiller.jpg",
    },
    {
      id: 5,
      title: "Tractor Mounted Cultivator",
      category: "Cultivators",
      price: 28000,
      image: "/products/cultivator.jpg",
    },
    {
      id: 6,
      title: "Heavy Duty Disc Harrow",
      category: "Harrows",
      price: 42000,
      image: "/products/disc-harrow.jpg",
    },
    {
      id: 7,
      title: "Automatic Seed Drill Machine",
      category: "Seed Drills",
      price: 35000,
      image: "/products/seed-drill.jpg",
    },
    {
      id: 8,
      title: "Agricultural Sprayer Pump",
      category: "Sprayers",
      price: 4500,
      image: "/products/sprayer-pump.jpg",
      variants: 4,
    },
  ];

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-10">
        <h1 className="text-heading-2 text-dark-900 mb-4">
          Featured Implements
        </h1>
        <p className="text-lead text-dark-700 max-w-2xl">
          Discover our premium range of agriculture equipment, engineered for high performance and durability on Indian farms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product) => (
          <Card
            key={product.id}
            title={product.title}
            category={product.category}
            price={product.price}
            image={product.image}
            variants={product.variants}
          />
        ))}
      </div>
    </main>
  );
}