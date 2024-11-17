import { AppLogo } from "@/app/assets/svg/icons";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex align-middle gap-3">
      <div>
        <AppLogo />{" "}
      </div>
      <span className="text-white text-2xl font-instrument-serif">
        Secretly Said
      </span>
    </div>
  );
};

export default Navbar;
