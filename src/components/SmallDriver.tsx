import Image from "next/image";
import React, { useState } from "react";
import PropTypes from "prop-types";

interface ISmallDriver {
  img: string;
  onSelect: PropTypes.func.isRequired;
  clickCount: number;
  selectedDrivers: string[];
}

function SmallDriver({
  img,
  onSelect,
  clickCount,
  selectedDrivers,
}: ISmallDriver) {
  const [activeDriver, setActiveDriver] = useState<string | null>(null);

  const handleClick = () => {
    onSelect(img);
    setActiveDriver((prev) => (prev === img ? null : img));
  };

  return (
    <div
      className={`${activeDriver === img ? "grayscale" : ""} m-4 avatar ${
        clickCount < 2 || selectedDrivers.includes(img) ? "cursor-pointer" : ""
      } ${selectedDrivers.includes(img) ? "red-border " : ""}`}
      onClick={
        clickCount < 2 || selectedDrivers.includes(img)
          ? handleClick
          : undefined
      }
    >
      <div className="w-24 mask mask-squircle">
        <Image
          alt={img}
          src={`https://api.metafuse.me/assets/metafuse/${img}.png`}
          layout="fill"
          priority={true}
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    </div>
  );
}

export default SmallDriver;
