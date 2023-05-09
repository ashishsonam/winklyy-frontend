import { Dispatch, SetStateAction, useState } from "react";
import Delete from "../Assets/Icons/Delete";
import Plus from "../Assets/Icons/Plus";
import Tick from "../Assets/Icons/Tick";
import { Social } from "./SocialPage";
interface CustomLink {
  linkName: string | null;
  url: string | null;
}

interface Props {
  customLink: Array<CustomLink>;
  setSocial: Dispatch<SetStateAction<Social>>;
}
const NewLink = ({ customLink, setSocial }: Props) => {
  const [newLink, setNewLink] = useState<CustomLink>({
    linkName: null,
    url: null,
  });

  const [error, setError] = useState({
    linkName: null,
    url: null,
  });

  const inputEvent = (event: any) => {
    const { name, value } = event.target;
    setNewLink((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const [isAdding, setIsAdding] = useState<boolean>(false);

  const isValidUrl = (urlString: string) => {
    let url;
    try {
      url = new URL(urlString);
    } catch (e) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };

  const onAdd = () => {
    setIsAdding(true);
    setNewLink({
      linkName: null,
      url: null,
    });
    setError({
      linkName: null,
      url: null,
    });
  };

  const onDelete = () => {
    setIsAdding(false);
    setNewLink({
      linkName: null,
      url: null,
    });
    setError({
      linkName: null,
      url: null,
    });
  };

  const onSave = (event: any) => {
    event.preventDefault();

    setError({
      linkName: null,
      url: null,
    });

    var valid = true;

    if (!newLink.linkName || newLink.linkName.trim().length === 0) {
      valid = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          linkName: "link name cannot be empty",
        };
      });
    }

    if (!newLink.url || newLink.url.trim().length === 0) {
      valid = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          url: "link cannot be empty",
        };
      });
    }

    if (newLink.url && !isValidUrl(newLink.url)) {
      valid = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          url: "link is not valid",
        };
      });
    }

    if (valid) {
      customLink.push(newLink);

      setSocial((prev) => {
        return {
          ...prev,
          customLink: customLink,
        };
      });
      setIsAdding(false);
      setNewLink({
        linkName: null,
        url: null,
      });
      setError({
        linkName: null,
        url: null,
      });
    }
  };

  return (
    <>
      <div className="w-full flex flex-row items-center">
        {isAdding ? (
          <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative w-full flex flex-col">
              <label
                htmlFor="linktree"
                className="block text-sm font-CocogooseRegular  text-gray-700"
              >
                social name
              </label>
              <input
                type="text"
                name="linkName"
                value={newLink.linkName ? newLink.linkName : ""}
                onChange={inputEvent}
                id="linkName"
                autoComplete="linkName"
                className="mt-1 block w-full font-CocogooseThin font-semibold rounded-md border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500 sm:text-sm"
              />
              {error.linkName && (
                <div className="absolute text-red-900 text-xs font-CocogooseRegular mt-2 bottom-[-20px]">
                  {error.linkName}
                </div>
              )}
            </div>
            <div className="relative w-full flex flex-col">
              <label
                htmlFor="linktree"
                className="block text-sm font-CocogooseRegular  text-gray-700"
              >
                link
              </label>
              <input
                type="text"
                name="url"
                placeholder="https://mywebsite.com"
                value={newLink.url ? newLink.url : ""}
                onChange={inputEvent}
                id="url"
                autoComplete="url"
                className="mt-1 block w-full  font-CocogooseThin font-semibold rounded-md border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500 sm:text-sm"
              />
              {error.url && (
                <div className="absolute text-red-900 text-xs font-CocogooseRegular mt-2 bottom-[-20px]">
                  {error.url}
                </div>
              )}
            </div>
            <div className="flex flex-row gap-2 items-end mt-2">
              <button
                onClick={onSave}
                className="w-10 h-10 bg-green-600 rounded-sm items-center justify-center flex flex-col"
              >
                <Tick size={30} color={"#FFFFFF"} />
              </button>
              <button
                onClick={onDelete}
                className="w-10 h-10 bg-red-600 rounded-sm items-center justify-center flex flex-col"
              >
                <Delete size={30} color={"#FFFFFF"} />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={onAdd}
            className="w-10 h-10 bg-brown700 rounded-sm items-center justify-center flex flex-col"
          >
            <Plus size={30} color={"#FFFFFF"} />
          </button>
        )}
      </div>
    </>
  );
};

export default NewLink;
