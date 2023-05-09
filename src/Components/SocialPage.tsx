import { AxiosError } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Delete from "../Assets/Icons/Delete";
import Instagram from "../Assets/Icons/Instagram";
import Twitter from "../Assets/Icons/Twitter";
import { AuthContext } from "../Context/AuthContext";
import { AxiosContext } from "../Context/AxiosContext";
import ImageUpload from "./ImageUpload";
import Loader from "./Loader";
import NewLink from "./NewLink";
import PageFrame from "./PageFrame";
import Username from "./Username";
import logo from "../Assets/logo.png";
interface CustomLink {
  linkName: string | null;
  url: string | null;
}

interface Problems {
  problem_1: string | null;
  problem_2: string | null;
  problem_3: string | null;
  problem_4: string | null;
}
export interface Social {
  username: string | null;
  name: string | null;
  bio: string | null;
  instaLink: string | null;
  twitterLink: string | null;
  extraLinksList: Array<CustomLink>;
  profilePicture: string | null;
  age: number | null;
  location: string | null;
}

const SocialPage = () => {
  const authAxios = useContext(AxiosContext).authAxios;
  const authContext = useContext(AuthContext);
  const authState = authContext.authState;
  const [isloading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const problemsList = {
    problem_1: "fake profiles - people lie about themselves",
    problem_2: "no matches - premium charge for matching features",
    problem_3: "sexting or hookups",
    problem_4: null,
  };
  const [problems, setProblems] = useState<Problems>({
    problem_1: null,
    problem_2: null,
    problem_3: null,
    problem_4: null,
  });

  const [social, setSocial] = useState<Social>({
    username: null,
    name: null,
    bio: null,
    instaLink: null,
    twitterLink: null,
    extraLinksList: [],
    profilePicture: null,
    age: null,
    location: null,
  });

  const [error, setError] = useState({
    username: null,
    name: null,
    link: null,
    bio: null,
    problems: null,
    instaLink: null,
    twitterLink: null,
    age: null,
    location: null,
  });

  const { setAuthState } = useContext(AuthContext);

  const isValidUrl = (urlString: string) => {
    let url;
    try {
      url = new URL(urlString);
    } catch (e) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };

  const postData = async () => {
    setLoading(true);
    const url = "winkly_update/update_socials";

    const body = {
      username: social.username,
      name: social.name,
      bio: social.bio,
      instaLink: social.instaLink,
      twitterLink: social.twitterLink,
      extraLinksList: social.extraLinksList,
      problemsList: [problems],
      age: social.age,
      location: social.location,
    };
    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      if (body) {
        formData.append("profile", JSON.stringify(body));
      }

      const response = await authAxios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      if (data) {
        setAuthState((prev) => {
          return {
            ...prev,
            updated: true,
            username: social.username,
          };
        });
        navigate("/" + social.username, {
          replace: true,
        });
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError?.response) {
        console.log("Error in social update:", axiosError?.response?.data);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  }, [file]);

  const fetchProfile = useCallback(async () => {
    const url = "winkly_update/get_profile";
    setLoading(true);
    try {
      const response = await authAxios.get(url, {
        params: {
          username: authState.username,
        },
      });
      const data = response.data;
      if (data) {
        setSocial((prev) => {
          return {
            ...prev,
            ...data,
          };
        });
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError?.response) {
        console.log("Error in fetch profile:", axiosError?.response?.data);
        navigate("/404", { replace: true });
      }
    }
    setLoading(false);
  }, [authState.username]);

  useEffect(() => {
    if (authState.username) {
      fetchProfile();
    }
  }, [fetchProfile]);

  const inputEvent = (event: any) => {
    const { name, value } = event.target;
    setSocial((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const inputProblemsEvent = (event: any) => {
    const { name, value, checked } = event.target;

    if (name === "problem_4") {
      setProblems((preValue) => {
        return {
          ...preValue,
          [name]: value,
        };
      });
    } else {
      if (checked) {
        setProblems((preValue) => {
          return {
            ...preValue,
            [name]: problemsList[name as keyof Problems],
          };
        });
      } else {
        setProblems((preValue) => {
          return {
            ...preValue,
            [name]: null,
          };
        });
      }
    }
  };

  const validateProfile = (event: any) => {
    event.preventDefault();

    setError({
      username: null,
      name: null,
      link: null,
      bio: null,
      problems: null,
      instaLink: null,
      twitterLink: null,
      age: null,
      location: null,
    });

    var valid = true;

    if (!social.username || social.username.trim().length === 0) {
      valid = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          username: "username cannot be empty",
        };
      });
    }

    if (!social.name || social.name.trim().length === 0) {
      valid = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          name: "name cannot be empty",
        };
      });
    }

    if (!social.bio || social.bio.trim().length === 0) {
      valid = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          bio: "bio cannot be empty",
        };
      });
    }

    if (!social.age) {
      valid = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          age: "age cannot be empty",
        };
      });
    }

    if (social.age != null && social.age < 18) {
      valid = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          age: "age should be greater than 18",
        };
      });
    }

    if (!social.location || social.location.trim().length === 0) {
      valid = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          location: "location cannot be empty",
        };
      });
    }

    if (
      (!social.instaLink || social.instaLink.trim().length === 0) &&
      (!social.twitterLink || social.twitterLink.trim().length === 0) &&
      social.extraLinksList.length === 0
    ) {
      valid = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          link: "link at least 1 account",
        };
      });
    }

    if (social.instaLink && !isValidUrl(social.instaLink)) {
      valid = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          instaLink: "link is not valid",
        };
      });
    }

    if (social.twitterLink && !isValidUrl(social.twitterLink)) {
      valid = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          twitterLink: "link is not valid",
        };
      });
    }

    if (!valid) {
      return;
    }

    if (!authState.username) {
      setCurrentPage(1);
      setError({
        username: null,
        name: null,
        link: null,
        bio: null,
        problems: null,
        instaLink: null,
        twitterLink: null,
        age: null,
        location: null,
      });
    } else {
      if (valid) {
        postData();
      }
    }
  };

  const validateProblems = (event: any) => {
    event.preventDefault();

    setError({
      username: null,
      name: null,
      link: null,
      bio: null,
      problems: null,
      instaLink: null,
      twitterLink: null,
      age: null,
      location: null,
    });

    var valid = true;

    if (
      !problems.problem_1 &&
      !problems.problem_2 &&
      !problems.problem_3 &&
      (!problems.problem_4 || problems.problem_4.trim().length === 0)
    ) {
      valid = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          problems: "select or type anyone of them",
        };
      });
    }

    if (valid) {
      postData();
    }
  };

  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        <div className="w-full min-h-[100vh] flex flex-col items-center justify-center pt-[140px] pb-[20px] bg-brown200">
          <PageFrame>
            <div className="h-full w-full flex flex-col items-center justify-between bg-white py-8 px-3 sm:px-[40px] shadow-lg">
              {currentPage === 0 ? (
                <div className="h-full w-full flex flex-col items-center justify-between">
                  <div className="text-brown900 text-2xl sm:text-4xl font-CocogooseSemibold text-center">
                    enter your details
                  </div>
                  <form
                    className="w-full h-full flex flex-col items-center justify-around mt-4"
                    onSubmit={validateProfile}
                    noValidate
                  >
                    {authState.username ? (
                      <>
                        <div className="text-[20px] text-brown900  font-CocogooseThin font-bold">
                          {authState.username}
                        </div>
                      </>
                    ) : (
                      <>
                        <Username
                          inputEvent={inputEvent}
                          username={social.username}
                          disabled={authState.username ? true : false}
                        />
                        {error.username && (
                          <div className="text-red-900 text-xs font-CocogooseRegular mt-2">
                            {error.username}
                          </div>
                        )}
                      </>
                    )}
                    <ImageUpload file={file} setFile={setFile}>
                      <div className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat relative shadow flex items-center justify-center mt-4">
                        <img
                          src={
                            preview
                              ? preview
                              : social.profilePicture
                              ? social.profilePicture
                              : logo
                          }
                          alt="profile image"
                          className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"
                        />
                        <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0" />
                        <div className="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-edit"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                            <line x1={16} y1={5} x2={19} y2={8} />
                          </svg>
                          <p className="text-xs text-gray-100">Edit Picture</p>
                        </div>
                      </div>
                    </ImageUpload>
                    <div className="w-full sm:max-w-[700px] ">
                      <div className="w-full flex flex-col">
                        <div className="w-full">
                          <label
                            htmlFor="name"
                            className="block text-sm font-CocogooseMedium  text-brown900"
                          >
                            name
                          </label>
                          <div className="w-full flex flex-row justify-center">
                            <input
                              type="text"
                              name="name"
                              value={social.name ? social.name : ""}
                              onChange={inputEvent}
                              id="name"
                              autoComplete="name"
                              className="mt-1 block w-full font-CocogooseThin font-semibold rounded-md border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500 sm:text-sm"
                            />
                          </div>
                          {error.name && (
                            <div className="text-red-900 text-xs font-CocogooseRegular mt-2">
                              {error.name}
                            </div>
                          )}
                        </div>
                        <div className="w-full flex flex-row justify-between mt-4 gap-4">
                          <div className="flex flex-col w-full">
                            <label
                              htmlFor="age"
                              className="block text-sm font-CocogooseMedium  text-brown900"
                            >
                              age
                            </label>
                            <div className="w-full flex flex-row justify-center">
                              <input
                                type="text"
                                name="age"
                                pattern="[0-9]*"
                                value={social.age ? social.age : ""}
                                onChange={(e) => {
                                  if (e.target.validity.valid) {
                                    inputEvent(e);
                                  }
                                }}
                                id="age"
                                autoComplete="age"
                                className="mt-1 block w-full font-CocogooseThin font-semibold rounded-md border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500 sm:text-sm"
                              />
                            </div>
                            {error.age && (
                              <div className="text-red-900 text-xs font-CocogooseThin font-semibold mt-2">
                                {error.age}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col w-full">
                            <label
                              htmlFor="location"
                              className="block text-sm font-CocogooseMedium  text-brown900"
                            >
                              location
                            </label>
                            <div className="w-full flex flex-row justify-center">
                              <input
                                type="text"
                                name="location"
                                value={social.location ? social.location : ""}
                                onChange={inputEvent}
                                id="location"
                                autoComplete="location"
                                className="mt-1 block w-full font-CocogooseThin font-semibold rounded-md border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500 sm:text-sm"
                              />
                            </div>
                            {error.location && (
                              <div className="text-red-900 text-xs font-CocogooseRegular mt-2">
                                {error.location}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="w-full mt-4">
                          <label
                            htmlFor="bio"
                            className="block text-sm font-CocogooseMedium text-brown900"
                          >
                            bio
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="bio"
                              name="bio"
                              onChange={inputEvent}
                              value={social.bio ? social.bio : ""}
                              rows={3}
                              className="mt-1 block w-full font-CocogooseThin font-semibold rounded-md border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500 sm:text-sm"
                              placeholder="tell us about yourself"
                            />
                          </div>
                          {error.bio && (
                            <div className="text-red-900 text-xs font-CocogooseRegular mt-2">
                              {error.bio}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 ">
                        <div className="w-full">
                          <label
                            htmlFor="instagram"
                            className="block text-sm font-CocogooseMedium  text-brown900"
                          >
                            instagram
                          </label>
                          <div className="w-full flex flex-row justify-center">
                            <Instagram />
                            <div className="w-full flex flex-col">
                              <input
                                type="text"
                                name="instaLink"
                                id="instaLink"
                                placeholder="https://instagram.com/username"
                                value={social.instaLink ? social.instaLink : ""}
                                onChange={inputEvent}
                                autoComplete="instaLink"
                                className="mt-1 block w-full font-CocogooseThin font-semibold rounded-md border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500 sm:text-sm"
                              />
                              {error.instaLink && (
                                <div className="text-red-900 text-xs font-CocogooseThin font-semibold mt-2">
                                  {error.instaLink}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="twitter"
                            className="block text-sm font-CocogooseMedium  text-brown900"
                          >
                            twitter
                          </label>
                          <div className="w-full flex flex-row justify-center">
                            <Twitter />
                            <div className="w-full flex flex-col">
                              <input
                                type="text"
                                name="twitterLink"
                                placeholder="https://twitter.com/username"
                                value={
                                  social.twitterLink ? social.twitterLink : ""
                                }
                                onChange={inputEvent}
                                id="twitterLink"
                                autoComplete="twitterLink"
                                className="mt-1 block w-full font-CocogooseThin font-semibold rounded-md border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500 sm:text-sm"
                              />
                              {error.twitterLink && (
                                <div className="text-red-900 text-xs font-CocogooseThin font-semibold mt-2">
                                  {error.twitterLink}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {social.extraLinksList.map((val: CustomLink, index) => {
                          return (
                            <div className="w-full" key={index}>
                              <label className="block text-sm font-CocogooseMedium  text-brown900">
                                {val.linkName}
                              </label>
                              <div className="w-full flex flex-row justify-center items-center gap-2 mt-1 ">
                                <input
                                  type="text"
                                  value={val.url ? val.url : ""}
                                  disabled={true}
                                  className="h-[44px] block w-full font-CocogooseThin font-semibold rounded-md border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500 sm:text-sm"
                                />
                                <button
                                  onClick={(event: any) => {
                                    event.preventDefault();
                                    social.extraLinksList.splice(index, 1);
                                    setSocial((prev) => {
                                      return {
                                        ...prev,
                                        extraLinksList: social.extraLinksList,
                                      };
                                    });
                                  }}
                                  className="w-10 h-10 bg-red-600 rounded-sm items-center justify-center flex flex-col"
                                >
                                  <Delete size={30} color={"#FFFFFF"} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="block text-xs font-CocogooseSemibold  text-brown900 mt-4">
                        Tip: add your Spotify, LinkedIn, clubhouse profiles for
                        better matching
                      </div>
                      <div className="w-full mt-2">
                        <label
                          htmlFor="addlink"
                          className="block text-sm font-CocogooseMedium  text-brown900"
                        >
                          add link
                        </label>
                        <div className="w-full flex flex-row justify-center mt-2">
                          <NewLink
                            customLink={social.extraLinksList}
                            setSocial={setSocial}
                          />
                        </div>
                      </div>
                    </div>
                    {error.link && (
                      <div className="text-red-900 text-xs font-CocogooseThin font-semibold mt-2">
                        {error.link}
                      </div>
                    )}
                    {authState.username && (
                      <div className="w-[260px] justify-center mt-8">
                        <button
                          id="signup"
                          type="submit"
                          className="flex items-center justify-center h-[50px] w-full p-4 rounded-md bg-brown900 hover:text-white focus:outline-none"
                        >
                          <div className="text-white text-base font-CocogooseMedium text-center">
                            create
                          </div>
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              ) : (
                <div className="max-w-[650px] w-full flex flex-col items-center justify-between">
                  <div className="text-brown900 text-3xl sm:text-4xl font-CocogooseSemibold text-center">
                    why do you hate dating apps ?
                  </div>
                  <div className="w-full h-full flex flex-col items-start mt-8">
                    <div className="w-full h-full mt-4 space-y-4">
                      <div className="flex items-center">
                        <input
                          id="problem_1"
                          name="problem_1"
                          type="checkbox"
                          onChange={inputProblemsEvent}
                          checked={problems.problem_1 ? true : false}
                          className="h-4 w-4  text-brown800 focus:ring-brown500"
                        />
                        <label
                          htmlFor="problem_1"
                          className="ml-3 block text-lg font-CocogooseMedium text-brown900"
                        >
                          {problemsList.problem_1}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="problem_2"
                          name="problem_2"
                          type="checkbox"
                          onChange={inputProblemsEvent}
                          checked={problems.problem_2 ? true : false}
                          className="h-4 w-4  text-brown800 focus:ring-brown500"
                        />
                        <label
                          htmlFor="problem_2"
                          className="ml-3 block text-lg font-CocogooseMedium text-brown900"
                        >
                          {problemsList.problem_2}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="problem_3"
                          name="problem_3"
                          type="checkbox"
                          checked={problems.problem_3 ? true : false}
                          onChange={inputProblemsEvent}
                          className="h-4 w-4  text-brown800 focus:ring-brown500"
                        />
                        <label
                          htmlFor="problem_3"
                          className="ml-3 block text-lg font-CocogooseMedium text-brown900"
                        >
                          {problemsList.problem_3}
                        </label>
                      </div>
                    </div>
                    <div className="w-full mt-6">
                      <textarea
                        id="problem_4"
                        name="problem_4"
                        value={problems.problem_4 ? problems.problem_4 : ""}
                        onChange={inputProblemsEvent}
                        rows={3}
                        className="mt-1 block w-full font-CocogooseThin font-semibold rounded-md border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500 sm:text-sm"
                        placeholder="type your problem here"
                      />
                    </div>

                    {error.problems && (
                      <div className="text-red-900 text-xs font-CocogooseRegular mt-2">
                        {error.problems}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {!authState.username && (
                <div className="w-full flex flex-row items-center justify-around mt-8">
                  {currentPage === 1 && (
                    <button
                      id="prev"
                      onClick={() => {
                        setCurrentPage(0);
                      }}
                      className="flex items-center justify-center h-[50px] p-4 rounded-md bg-brown900 hover:text-white focus:outline-none"
                    >
                      <div className="text-white text-base font-CocogooseMedium text-center">
                        prev
                      </div>
                    </button>
                  )}
                  {currentPage === 0 ? (
                    <button
                      id="next"
                      onClick={validateProfile}
                      className="flex items-center justify-center h-[50px] p-4 rounded-md bg-brown900 hover:text-white focus:outline-none"
                    >
                      <div className="text-white text-base font-CocogooseMedium text-center">
                        next
                      </div>
                    </button>
                  ) : (
                    <button
                      id="submit"
                      onClick={validateProblems}
                      className="flex items-center justify-center h-[50px] p-4 rounded-md bg-brown900 hover:text-white focus:outline-none"
                    >
                      <div className="text-white text-base font-CocogooseMedium text-center">
                        create
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>
          </PageFrame>
        </div>
      )}
    </>
  );
};

export default SocialPage;
