"use client";

import { useState } from "react";
import Image from "next/image";
import { BentoCard } from "@/components/bento-card";

import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";

export default function Gallery() {
  const images = [image1, image2, image3, image4];
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        {images.map((img, i) => (
            
            <Image
              src={img}
              alt={`Gallery ${i}`}
              className="h-80 w-full rounded-xl object-cover"
            />
          
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <Image
            src={selectedImage}
            alt="Selected"
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </>
  );
}
