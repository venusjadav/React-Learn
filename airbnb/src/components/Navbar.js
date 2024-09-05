import React from "react";
// import logo from "../images/airbnb.png";

function Navbar() {
    return (
        <nav>
            <img src="/images/airbnb.png" className="nav--logo" alt="adfsd" />
            {/* to use the upper line of code we have to put the img in the public folder then only it will work other wise it want work */}
            {/* <img src={logo} className="nav--logo" alt="adfsd" /> */}
        </nav>
    );
}

export default Navbar;
