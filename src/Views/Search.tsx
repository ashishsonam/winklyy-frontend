import { AxiosError } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import SearchIcon from "../Assets/Icons/SearchIcon";
import logo from "../Assets/logo.png";
import PageFrame from "../Components/PageFrame";
import ProfileTile from "../Components/ProfileTile";
import { brown700 } from "../Constants/colors";
import { AxiosContext } from "../Context/AxiosContext";

const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

interface User {
  name: string | null;
  username: string | null;
  profilePicture: string | null;
}

const Search = () => {
  const [username, setUsername] = useState<string | null>(null);

  const [usernameList, setUsernameList] = useState<Array<User>>([]);
  const [isloading, setLoading] = useState<boolean>(false);

  const axios = useContext(AxiosContext).authAxios;

  const inputEvent = (event: any) => {
    const { value } = event.target;
    setUsername(value);
  };

  const fetchList = useCallback(async (search: string) => {
    const url = "winkly_search/search";
    setLoading(true);
    try {
      const response = await axios.get(url, {
        params: {
          searchString: search,
        },
      });

      const data = response.data;
      if (data) {
        setUsernameList(data.resultList);
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError?.response) {
        console.log("Error in search:", axiosError?.response?.data);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (username) {
      setLoading(true);
      const delaySearchFn = setTimeout(() => {
        fetchList(username);
      }, 500);

      return () => {
        clearTimeout(delaySearchFn);
      };
    } else {
      setLoading(false);
    }
  }, [username]);

  return (
    <div className="w-full min-h-[100vh] pb-12 pt-[160px] bg-brown200 flex flex-col items-center">
      <PageFrame>
        <div className="flex flex-col h-full items-center justify-center">
          <div className="flex flex-row items-center justify-center">
            {window.innerWidth > 640 ? (
              <SearchIcon size={36} />
            ) : (
              <SearchIcon size={28} />
            )}
            <div className="h-[50px] sm:h-[60px] rounded-full border-black border-[1.5px] flex flex-row items-center justify-center bg-white px-2 sm:px-4">
              <div className="text-[16px] sm:text-[26px] font-CocogooseSemibold ml-1 sm:ml-2 text-brown900">
                winklyy.com/
              </div>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                value={username ? username : ""}
                onChange={inputEvent}
                placeholder="username"
                className="text-[16px] w-full sm:w-[220px] font-CocogooseThin font-bold h-full rounded-r-full border-0 focus:border-0 focus:ring-0"
              />
              {isloading && (
                <div className="w-[40px] h-auto flex flex-row items-center justify-end">
                  <PuffLoader
                    cssOverride={override}
                    size={40}
                    color={brown700}
                    loading={true}
                    speedMultiplier={1.5}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="overflow-auto max-h-96 w-[100%] my-4 bg-white shadow-lg rounded-xl flex flex-col divide-y">
            {usernameList.map((val, index) => {
              return (
                <ProfileTile
                  key={index}
                  name={val.name}
                  username={val.username}
                  profilePicture={
                    val.profilePicture ? val.profilePicture : logo
                  }
                  verifiedStatus={"Verified"}
                />
              );
            })}
          </div>
        </div>
      </PageFrame>
    </div>
  );
};

export default Search;
