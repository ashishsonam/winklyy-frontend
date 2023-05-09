import React, { useContext, useState } from "react";
import { PopupButton } from "react-calendly";
import PageFrame from "../Components/PageFrame";
import validator from "validator";
import { AxiosContext } from "../Context/AxiosContext";
import { AxiosError } from "axios";
import Loader from "../Components/Loader";

interface Query {
  name: string | null;
  email: string | null;
  query: string | null;
}

const ContactUs = () => {
  const [query, setQuery] = useState<Query>({
    name: null,
    email: null,
    query: null,
  });

  const axios = useContext(AxiosContext).publicAxios;

  const [isloading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<Query>({
    name: null,
    email: null,
    query: null,
  });

  const inputEvent = (event: any) => {
    const { name, value } = event.target;
    setQuery((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const postData = async () => {
    setLoading(true);
    const url = "winkly_update/send_feedback";
    const body = {
      name: query.name,
      email: query.email,
      response: query.query,
    };

    try {
      const response = await axios.put(url, body);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError?.response) {
        console.log("Error in contactus:", axiosError?.response?.data);
      }
    }
    setLoading(false);
  };

  const onSubmits = (event: any) => {
    event.preventDefault();
    var validEmail = true;
    var validPass = true;

    setError({
      name: null,
      email: null,
      query: null,
    });

    if (!query.name || query.name.trim().length === 0) {
      validPass = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          name: "name cannot be empty",
        };
      });
    }

    if (!query.email || query.email.trim().length === 0) {
      validEmail = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          email: "email cannot be empty",
        };
      });
    } else if (query.email && validator.isEmail(query.email) === false) {
      validEmail = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          email: "email is invalid",
        };
      });
    }

    if (!query.query || query.query.trim().length === 0) {
      validPass = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          query: "query cannot be empty",
        };
      });
    }

    if (validEmail === true && validPass === true) {
      postData();
    }
  };

  return (
    <>
      <div className="w-full min-h-[100vh] pb-[40px] pt-[160px] bg-brown100 flex flex-col items-center bg-cover bg-center">
        <PageFrame>
          {isloading ? (
            <Loader />
          ) : (
            <div className="flex flex-col w-full h-full items-center justify-center">
              <div className="text-4xl font-CocogooseBold text-brown900">
                contact us
              </div>
              <div className="flex flex-col md:flex-row w-full h-full mt-8">
                <div className="w-full md:w-[60%] h-full flex flex-col py-6">
                  <div className="text-lg font-CocogooseSemibold text-brown800">
                    send us a message
                  </div>
                  <div className="text-sm font-CocogooseSemibold text-brown700">
                    if you have any feedback or any type of queries related to
                    our product, you can send us message from here. It's my
                    pleasure to help you.
                  </div>
                  <form className="w-full mt-6" onSubmit={onSubmits} noValidate>
                    <div className="w-full">
                      <label
                        htmlFor="name"
                        className="block text-xs font-CocogooseMedium  text-brown900"
                      >
                        name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={inputEvent}
                        autoComplete="name"
                        className="mt-1 block w-full font-CocogooseThin font-bold rounded-md border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500 sm:text-sm"
                      />
                      {error.name && (
                        <div className="text-red-900 text-xs font-CocogooseRegular mt-2">
                          {error.name}
                        </div>
                      )}
                    </div>
                    <div className="w-full mt-2">
                      <label
                        htmlFor="email"
                        className="block text-xs font-CocogooseMedium  text-brown900"
                      >
                        email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={inputEvent}
                        autoComplete="email"
                        className="mt-1 block w-full font-CocogooseThin font-bold rounded-md border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500 sm:text-sm"
                      />
                      {error.email && (
                        <div className="text-red-900 text-xs font-CocogooseRegular mt-2">
                          {error.email}
                        </div>
                      )}
                    </div>
                    <div className="w-full mt-2">
                      <label
                        htmlFor="query"
                        className="block text-xs font-CocogooseMedium  text-brown900"
                      >
                        query
                      </label>
                      <textarea
                        rows={3}
                        name="query"
                        id="query"
                        onChange={inputEvent}
                        placeholder="enter your message"
                        autoComplete="query"
                        className="mt-1 block w-full font-CocogooseThin font-bold rounded-md border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500 sm:text-sm"
                      />
                      {error.query && (
                        <div className="text-red-900 text-xs font-CocogooseRegular mt-2">
                          {error.query}
                        </div>
                      )}
                    </div>
                    <div className="max-w-[300px] mt-2">
                      <button
                        id="submit"
                        type="submit"
                        className="w-full flex items-center justify-center h-[50px] p-4 rounded-md bg-brown900 focus:outline-none"
                      >
                        <div className="text-white text-base font-CocogooseMedium text-center">
                          submit
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-[40%] h-full flex flex-col justify-center ml-0 md:ml-4">
                  <div className="text-lg font-CocogooseSemibold text-brown800">
                    lets talk
                  </div>
                  <div className="text-sm font-CocogooseSemibold text-brown700">
                    you can contact us throught one on one interaction through
                    meet.
                  </div>
                  <div className="w-full flex flex-row items-center justify-center mt-4 ">
                    <div className="min-w-[300px]">
                      <PopupButton
                        url="https://calendly.com/winklyy/support"
                        className="text-white text-xl font-CocogooseMedium w-full py-4 rounded-full bg-brown900 hover:text-white focus:outline-none text-center"
                        rootElement={document.getElementById("root")!}
                        text="book now"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </PageFrame>
      </div>
    </>
  );
};

export default ContactUs;
