import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";

interface Props {
  link: string;
  text: string;
  isLoggedIn: boolean | null;
}

const LinkComponent = ({ text, link, isLoggedIn }: Props) => {
  const [domain, setDomain] = useState<string | null>(null);
  const isValidUrl = (urlString: string) => {
    let url;
    try {
      url = new URL(urlString);
    } catch (e) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };

  const fetchLogo = useCallback(async (domain: string) => {
    console.log(domain);
    try {
      const url = `https://api.companyurlfinder.com/logo/${domain}`;
      await axios.get(url, {
        headers: {
          "X-RapidAPI-Key":
            RAPID_API_KEY,
          "X-RapidAPI-Host": "logo4.p.rapidapi.com",
        },
      });
    } catch (err) {
      setDomain(null);
    }
  }, []);

  useEffect(() => {
    if (isValidUrl(link)) {
      const url = new URL(link);
      const d = url.hostname.replace("www.", "");
      setDomain(d);
      fetchLogo(d);
    } else {
      return;
    }
  }, []);

  return (
    <>
      <Link
        to={isLoggedIn ? link : "/login"}
        onClick={() => {}}
        className={`flex flex-row bg-white w-full px-8 py-6 items-center shadow-lg my-4 rounded-3xl ${
          !isLoggedIn && "blur-sm"
        }`}
      >
        <div className="w-12 h-12 rounded-full">
          <img
            src={
              domain ? `https://api.companyurlfinder.com/logo/${domain}` : logo
            }
            alt="company logo"
          />
        </div>
        <div className="ml-4 text-3xl font-CocogooseSemibold text-brown900">
          {text}
        </div>
      </Link>
    </>
  );
};

export default LinkComponent;
