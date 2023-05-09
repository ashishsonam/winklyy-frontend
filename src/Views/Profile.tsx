import { AxiosError } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pencil from "../Assets/Icons/Pencil";
import LinkComponent from "../Components/LinkComponent";
import Loader from "../Components/Loader";
import PageFrame from "../Components/PageFrame";
import Tooltip from "../Components/Tooltip";
import VerifyAccount from "../Components/VerifyAccount";
import { AuthContext } from "../Context/AuthContext";
import { AxiosContext } from "../Context/AxiosContext";
import logo from "../Assets/logo.png";
import FullScreenImage from "../Components/FullScreenImage";
import Share from "../Assets/Icons/Share";
import { RWebShare } from "react-web-share";
import ProfileTile from "../Components/ProfileTile";
import Verified from "../Assets/Icons/Verified";
import { brown900 } from "../Constants/colors";

interface User {
  name: string | null;
  username: string | null;
  profilePicture: string | null;
}

interface CustomLink {
  linkName: string | null;
  url: string | null;
}

interface Profile {
  instaLink: null | string;
  twitterLink: null | string;
  name: null | string;
  bio: null | string;
  likedYouList: Array<User>;
  youLikedList: Array<User>;
  matchedList: Array<User>;
  likeStatus: boolean;
  verifiedStatus: string | null;
  likedYouReason: string | null;
  youLikedReason: string | null;
  extraLinksList: Array<CustomLink>;
  profilePicture: string | null;
  age: number | null;
  location: string | null;
}

const ProfilePage = () => {
  const [currentCategory, setSelectedCategory] = useState<number>(0);
  const [currentTab, setTab] = useState<number>(0);
  const [profileModal, setProfileModal] = useState<boolean>(false);

  const [profile, setProfile] = useState<Profile>({
    instaLink: null,
    twitterLink: null,
    name: null,
    bio: null,
    likedYouList: [],
    youLikedList: [],
    matchedList: [],
    likeStatus: false,
    verifiedStatus: null,
    likedYouReason: null,
    youLikedReason: null,
    extraLinksList: [],
    profilePicture: null,
    age: null,
    location: null,
  });

  const [isloading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState({
    msg: null,
  });
  const params = useParams();
  const username = params.username;

  const navigate = useNavigate();
  const publicAxios = useContext(AxiosContext).publicAxios;
  const authAxios = useContext(AxiosContext).authAxios;
  const authContext = useContext(AuthContext);
  const authState = authContext.authState;

  const [modal, showModal] = useState<boolean>(false);

  const inputEvent = (event: any) => {
    const { name, value } = event.target;
    if (name === "msg") {
      setMsg(value);
    }
  };

  const fetchProfile = useCallback(async () => {
    setSelectedCategory(0);
    setTab(0);

    const url = "winkly_update/get_profile";
    setLoading(true);
    try {
      let response;
      if (authState.authenticated) {
        response = await authAxios.get(url, {
          params: {
            username: username,
          },
        });
      } else {
        response = await publicAxios.get(url, {
          params: {
            username: username,
          },
        });
      }

      const data = response.data;
      if (data) {
        setProfile((prev) => {
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
  }, [username]);

  const updateLike = async () => {
    if (!msg || msg.trim().length === 0) {
      setError((preValue: any) => {
        return {
          ...preValue,
          msg: "mention cannot be empty",
        };
      });

      return;
    }
    setError({
      msg: null,
    });

    const url = "winkly_update/update_likes";
    setLoading(true);
    const body = {
      username: username,
      reason: msg,
    };
    try {
      const response = await authAxios.put(url, body);
      const data = response.data;
      if (data) {
        setProfile((prev) => {
          return {
            ...prev,
            likeStatus: !profile.likeStatus,
          };
        });

        setMsg(null);
        showModal(false);
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError?.response) {
        console.log("Error in update like:", axiosError?.response?.data);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const likeEvent = () => {
    if (!authState.authenticated) {
      navigate("/login");
    } else {
      updateLike();
    }
  };

  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        <div className="w-full min-h-[100vh] bg-brown100 pt-[140px] flex flex-col items-center">
          <PageFrame>
            <div className="w-full h-full flex flex-col">
              <div className="w-full h-full flex flex-col lg:flex-row">
                <div className="relative w-full lg:w-1/2 flex flex-col items-center mb-[80px] lg:mb-0 lg:mt-[80px]">
                  <div className="absolute top-0 right-0 sm:right-20">
                    <RWebShare
                      data={{
                        text: "Winklyy, find your partner",
                        url: `https://www.winklyy.com/${username}`,
                        title: `@${username} | Winklyy`,
                      }}
                      onClick={() => console.log("shared successfully!")}
                    >
                      <button>
                        <Share />
                      </button>
                    </RWebShare>
                  </div>
                  <div className="flex flex-row justify-start">
                    {authState.username === username && (
                      <div className="text-brown900 text-4xl font-CocogooseBold">
                        profile
                      </div>
                    )}
                    {authState.username === username && (
                      <Link className="ml-2 focus" to="/social">
                        <Pencil size={24} />
                      </Link>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setProfileModal(true);
                    }}
                    className="w-[120px] h-[120px] rounded-full bg-cover bg-center bg-no-repeat relative shadow-lg border-[1.5px] border-brown900 flex items-center justify-center mt-4"
                  >
                    <img
                      src={
                        profile.profilePicture ? profile.profilePicture : logo
                      }
                      alt="profile image"
                      className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"
                    />
                    {profile.verifiedStatus === "Accepted" && (
                      <div className="absolute bottom-[-24px] right-[-10px]">
                        <Verified size={28} color={brown900} />
                      </div>
                    )}
                  </button>
                  {profileModal && (
                    <FullScreenImage
                      open={profileModal}
                      setOpen={setProfileModal}
                      imageUri={
                        profile.profilePicture ? profile.profilePicture : logo
                      }
                    />
                  )}
                  <div className="w-full flex flex-col items-center justify-center mt-4 ">
                    <div className="max-w-[90%] sm:max-w-[60%] text-4xl h-auto break-words font-CocogooseSemibold text-center text-brown900">
                      {profile.name}
                    </div>
                    <div className="w-full text-base h-auto break-words font-CocogooseThin font-semibold text-center text-brown900 mt-1">
                      {profile.age}, {profile.location}
                    </div>
                  </div>
                  <div className="text-lg font-CocogooseMedium mt-10 text-center text-brown900">
                    {profile.bio}
                  </div>
                  {authState.username === username &&
                    profile.verifiedStatus === null && (
                      <div className="flex w-full flex-row items-center justify-center mt-6">
                        <VerifyAccount
                          text={"verify now"}
                          onUpload={fetchProfile}
                        />
                        <div className="ml-2">
                          <Tooltip
                            title={"verify"}
                            desc={
                              "upload screenshot of profile with winklyy in bio."
                            }
                          />
                        </div>
                      </div>
                    )}

                  {authState.username !== username && (
                    <div className="w-full flex flex-col items-center justify-center mt-8 mx-4">
                      <button
                        onClick={() => {
                          if (profile.likeStatus) {
                            showModal(true);
                          } else {
                            likeEvent();
                          }
                        }}
                        className={`flex items-center justify-center ${
                          profile.likeStatus
                            ? "bg-brown900"
                            : "border-2 border-brown900"
                        } px-4 py-2 rounded-full`}
                      >
                        <div
                          className={`text-xl sm:text-2xl  font-CocogooseMedium ${
                            !profile.likeStatus ? "text-brown900" : "text-white"
                          }`}
                        >
                          {profile.likeStatus ? "dislike" : "like"}
                        </div>
                      </button>
                      {!profile.likeStatus && (
                        <div className="w-full sm:w-[60%]  mt-6">
                          <div className="mt-1 w-full flex flex-row items-center justify-center">
                            <textarea
                              id="msg"
                              name="msg"
                              onChange={inputEvent}
                              rows={3}
                              className="font-CocogooseThin font-semibold  block w-full min-h-[120px] rounded-xl border-brown900  shadow-sm focus:border-brown500 focus:ring-brown500 text-xs"
                              placeholder="mention why you like them"
                            />
                          </div>
                          {error.msg && (
                            <div className="text-red-900 text-xs font-CocogooseRegular mt-2">
                              {error.msg}
                            </div>
                          )}
                        </div>
                      )}

                      {modal && profile.likeStatus && (
                        <div className="w-full absolute h-full flex flex-col items-center justify-center top-0 left-0 bg-white">
                          <PageFrame>
                            <div className="w-full flex flex-col justify-center items-center">
                              <div className="w-full mt-1">
                                <textarea
                                  id="msg"
                                  name="msg"
                                  onChange={inputEvent}
                                  rows={3}
                                  className="block w-full min-h-[120px] font-CocogooseThin font-semibold rounded-md border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500 text-xs"
                                  placeholder="mention why you dislike them"
                                />
                              </div>
                              {error.msg && (
                                <div className="text-red-900 text-xs font-CocogooseRegular mt-2">
                                  {error.msg}
                                </div>
                              )}
                              <div className="w-full flex flex-row items-center justify-center mt-4">
                                <button
                                  onClick={likeEvent}
                                  className="font-CocogooseRegular focus:outline-none transition duration-150 ease-in-out hover:bg-brown800 bg-brown900 rounded text-white px-8 py-2 text-sm"
                                >
                                  {profile.likeStatus ? "dislike" : "like"}
                                </button>
                                <button
                                  onClick={() => {
                                    setError({
                                      msg: null,
                                    });
                                    setMsg(null);
                                    showModal(false);
                                  }}
                                  className="font-CocogooseRegular focus:outline-none ml-3 bg-gray-600  transition duration-150 text-white ease-in-out hover:border-gray-400 hover:bg-gray-500 border rounded px-8 py-2 text-sm"
                                >
                                  cancel
                                </button>
                              </div>
                            </div>
                          </PageFrame>
                        </div>
                      )}
                    </div>
                  )}
                  {(profile.youLikedReason || profile.likedYouReason) && (
                    <div className="w-full flex flex-col items-start mt-10">
                      {profile.youLikedReason && (
                        <div className="w-full flex flex-col items-start">
                          <div className="text-base text-brown900 font-CocogooseRegular text-center">
                            Your message:
                          </div>
                          <div className="w-full py-6 px-8 bg-brown500 flex flex-col items-center mt-2 justify-center shadow-lg rounded-3xl">
                            <div className="text-lg  font-CocogooseMedium text-center">
                              {profile.youLikedReason}
                            </div>
                          </div>
                        </div>
                      )}
                      {profile.likedYouReason && (
                        <div className="w-full flex flex-col items-start mt-4">
                          <div className="text-base  font-CocogooseRegular text-center">
                            {profile.name}'s message:
                          </div>
                          <div className="w-full py-6 px-8 bg-brown500 flex flex-col items-center mt-2 justify-center shadow-lg rounded-3xl">
                            <div className="text-lg  font-CocogooseMedium text-center">
                              {profile.likedYouReason}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {authState.username === username && (
                    <div className="flex flex-row mt-16">
                      <button
                        onClick={() => {
                          setSelectedCategory(0);
                        }}
                        className={`flex flex-row w-[120px] items-center justify-center ${
                          currentCategory === 0
                            ? "bg-brown900"
                            : "border-2 border-brown900"
                        } px-4 py-2 rounded-l-full`}
                      >
                        <div
                          className={`text-xl sm:text-2xl  font-CocogooseMedium ${
                            currentCategory === 0
                              ? "text-white"
                              : "text-brown900"
                          }`}
                        >
                          socials
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCategory(1);
                        }}
                        className={`flex flex-row w-[120px] items-center justify-center ${
                          currentCategory === 1
                            ? "bg-brown900"
                            : "border-2 border-brown900"
                        } px-8 py-2 rounded-r-full`}
                      >
                        <div
                          className={`text-xl sm:text-2xl  font-CocogooseMedium ${
                            currentCategory === 1
                              ? "text-white"
                              : "text-brown900"
                          }`}
                        >
                          likes
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {currentCategory === 0 ? (
                  <div className="w-full lg:w-1/2 lg:max-h-[550px] lg:py-[120px] flex flex-col items-center overflow-auto">
                    {profile.instaLink && (
                      <LinkComponent
                        text={"My Instagram"}
                        link={profile.instaLink}
                        isLoggedIn={authState.authenticated}
                      />
                    )}
                    {profile.twitterLink && (
                      <LinkComponent
                        text={"My Twitter"}
                        link={profile.twitterLink}
                        isLoggedIn={authState.authenticated}
                      />
                    )}
                    {profile.extraLinksList.map((val: CustomLink, index) => {
                      if (val.linkName && val.url) {
                        return (
                          <LinkComponent
                            key={index}
                            text={val.linkName}
                            link={val.url}
                            isLoggedIn={authState.authenticated}
                          />
                        );
                      } else {
                        return <></>;
                      }
                    })}
                  </div>
                ) : (
                  <>
                    {authState.username === username && (
                      <div className="flex flex-col items-center">
                        <div className="flex flex-row mt-8 mx-4">
                          <button
                            onClick={() => {
                              setTab(0);
                            }}
                            className={`flex items-center justify-center ${
                              currentTab === 0
                                ? "bg-brown900"
                                : "border-2 border-brown900"
                            } px-8 py-2 rounded-l-full`}
                          >
                            <div
                              className={`text-base sm:text-2xl  font-CocogooseMedium ${
                                currentTab === 0
                                  ? "text-white"
                                  : "text-brown900"
                              }`}
                            >
                              liked you
                            </div>
                          </button>
                          <button
                            onClick={() => {
                              setTab(1);
                            }}
                            className={`flex items-center justify-center ${
                              currentTab === 1
                                ? "bg-brown900"
                                : "border-y-2 border-brown900"
                            } px-2 py-2`}
                          >
                            <div
                              className={`text-base sm:text-2xl  font-CocogooseMedium ${
                                currentTab === 1
                                  ? "text-white"
                                  : "text-brown900"
                              }`}
                            >
                              matches
                            </div>
                          </button>
                          <button
                            onClick={() => {
                              setTab(2);
                            }}
                            className={`flex items-center justify-center ${
                              currentTab === 2
                                ? "bg-brown900"
                                : "border-2 border-brown900"
                            } px-8 py-2 rounded-r-full`}
                          >
                            <div
                              className={`text-base sm:text-2xl  font-CocogooseMedium ${
                                currentTab === 2
                                  ? "text-white"
                                  : "text-brown900"
                              }`}
                            >
                              you liked
                            </div>
                          </button>
                        </div>
                        <div className="overflow-auto max-h-96 w-[80%] lg:w-[100%] my-4 bg-white shadow-lg rounded-xl flex flex-col divide-y">
                          {currentTab === 0 &&
                            profile.likedYouList.map((val, index) => {
                              return (
                                <ProfileTile
                                  key={index}
                                  name={val.name}
                                  username={val.username}
                                  profilePicture={
                                    val.profilePicture
                                      ? val.profilePicture
                                      : logo
                                  }
                                  verifiedStatus={profile.verifiedStatus}
                                />
                              );
                            })}
                          {currentTab === 1 &&
                            profile.matchedList.map((val, index) => {
                              return (
                                <ProfileTile
                                  key={index}
                                  name={val.name}
                                  username={val.username}
                                  profilePicture={
                                    val.profilePicture
                                      ? val.profilePicture
                                      : logo
                                  }
                                  verifiedStatus={profile.verifiedStatus}
                                />
                              );
                            })}
                          {currentTab === 2 &&
                            profile.youLikedList.map((val, index) => {
                              return (
                                <ProfileTile
                                  key={index}
                                  name={val.name}
                                  username={val.username}
                                  profilePicture={
                                    val.profilePicture
                                      ? val.profilePicture
                                      : logo
                                  }
                                  verifiedStatus={"Verified"}
                                />
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </PageFrame>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
