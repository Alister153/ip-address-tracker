import Image from "next/image";
import useSWR from "swr";
import { useContext, useEffect, useRef, useState } from "react";
import { address } from "./_app";
import Map from "../components/Mapdyno";
const arrow = require("../public/images/icon-arrow.svg");

export default function Home() {
  const [location, setlocation] = useContext(address);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const [inputAddress, setInputAddress] = useState("");
  const { data, error } = useSWR(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_m7ooW6Ezzwe2ryE8CMTMRjv91i6Nt&ipAddress=${inputAddress}`,
    fetcher
  );
  const ipAddress = useRef();

  const handleClick = () => {
    const address = ipAddress.current;
    setInputAddress(address.value);
  };
  const handleEnter = (e) => {
    const address = ipAddress.current;
    if (e.key === "Enter") {
      setInputAddress(address.value);
    }
  };

  useEffect(() => {
    if (data !== undefined) {
      if (data.code) {
        ipAddress.current.value = "";
        ipAddress.current.classList.add("incorrect");
        setTimeout(() => {
          ipAddress.current.classList.remove("incorrect");
        }, 2000);
      } else setlocation(data);
    }
  }, [data, setlocation]);

  return (
    <div className="main-wrapper">
      <header className="search bg-blueBg">
        <div>
          <h1 className="text-xl lg:text-5xl text-white my-5">IP Address Tracker</h1>
        </div>
        <div className="search-input">
          <label>
            <input
              type="text"
              className="text-xs lg:text-2xl"
              ref={ipAddress}
              onKeyDown={handleEnter}
              placeholder="Search for any IP address or domain"
            />
            <button onClick={handleClick}>
              <Image src={arrow} width={15} height={15} alt="arrow" />
            </button>
          </label>
        </div>
      </header>
      <div className="ipaddress-location flex-col lg:flex-row">
        <div className="open-address p-2 bg-black" onClick={(e) => {
          e.target.parentElement.classList.toggle("active")
        }}>
        </div>
        <div className="ipaddress">
          <p>IP ADDRESS</p>
          <p className="deets">{location && location.ip}</p>
        </div>
        <div className="location">
          <p>LOCATION</p>
          {location && (
            <p className="deets">
              {location.location.city}, {location.location.country}
            </p>
          )}
        </div>
        <div className="timezone">
          <p>TIMEZONE</p>
          {location && <p className="deets">{location.location.timezone}</p>}
        </div>
        <div className="ISP">
          <p>ISP</p>
          {location && <p className="deets"> {location.as.name}</p>}
        </div>
      </div>
      {!error && <Map></Map>}
    </div>
  );
}
