import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface Props {
  children: ReactElement;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}
const ImageUpload = ({ children, file, setFile }: Props) => {
  const [modal, showModal] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const onFileChange = (event: any) => {
    setFile(event.target.files[0]);
    const objectUrl = URL.createObjectURL(event.target.files[0]);
    setPreview(objectUrl);
    event.target.value = null;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (file) {
      showModal(false);
    }
  };

  useEffect(() => {
    let windowOffset = 0;
    if (modal) {
      windowOffset = window.scrollY;
      document.body.setAttribute(
        "style",
        `position:fixed; top -${windowOffset}px; left:0; right:0;`
      );
    } else {
      document.body.setAttribute("style", "");
      window.scrollTo(0, windowOffset);
    }
  }, [modal]);

  return (
    <div>
      {modal && (
        <div
          role="alert"
          className="fixed z-50 w-full overflow-hidden min-h-[100vh] bg-white flex flex-col items-center justify-center top-0 left-0"
        >
          <div className="relative p-4 md:p-8 bg-brown200 shadow-md rounded ">
            <div className="flex flex-col items-center justify-center w-full mb-8 border border-dashed border-brown900  rounded-lg py-8">
              <div className="cursor-pointer mb-5 text-brown800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-cloud-upload"
                  width={60}
                  height={60}
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                  <polyline points="9 15 12 12 15 15" />
                  <line x1={12} y1={12} x2={12} y2={21} />
                </svg>
              </div>
              <p className="text-base font-CocogooseRegular tracking-normal text-gray-800  text-center">
                Drag and drop here
              </p>
              <p className="text-base font-CocogooseRegular tracking-normal text-gray-800  text-center my-1">
                or
              </p>
              <label
                htmlFor="fileUp"
                className="font-CocogooseMedium cursor-pointer text-base font-normal tracking-normal text-brown900 text-center"
              >
                browse
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
                name="fileUpload"
                id="fileUp"
              />
            </div>
            {file && (
              <>
                <div className="flex w-full flex-col items-center mb-4">
                  <div className="flex justify-between items-center w-full my-2">
                    <div className="items-center text-gray-600  flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-file"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                      </svg>
                      <p className="text-gray-800 text-sm font-bold font-CocogooseThin tracking-normal ml-2 mr-4">
                        {file?.name}
                      </p>
                    </div>
                    <div className="cursor-pointer text-gray-400">
                      <svg
                        onClick={() => {
                          setFile(null);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-x"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1={18} y1={6} x2={6} y2={18} />
                        <line x1={6} y1={6} x2={18} y2={18} />
                      </svg>
                    </div>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat relative shadow flex items-center justify-center">
                    <img
                      src={preview ? preview : ""}
                      alt="profile image"
                      className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"
                    />
                  </div>
                </div>
              </>
            )}
            <div className="flex items-center justify-center w-full">
              <button
                onClick={handleSubmit}
                className="font-CocogooseRegular focus:outline-none transition duration-150 ease-in-out hover:bg-brown800 bg-brown900 rounded text-white px-8 py-2 text-sm"
              >
                Submit
              </button>
              <button
                className="font-CocogooseRegular focus:outline-none ml-3 bg-gray-600  transition duration-150 text-white ease-in-out hover:border-gray-400 hover:bg-gray-500 border rounded px-8 py-2 text-sm"
                onClick={() => {
                  setFile(null);
                  showModal(!modal);
                }}
              >
                Cancel
              </button>
            </div>
            <div
              className="cursor-pointer absolute top-0 right-0 m-4 text-gray-400 transition duration-150 ease-in-out"
              onClick={() => {
                setFile(null);
                showModal(!modal);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Close"
                className="icon icon-tabler icon-tabler-x"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center items-center" id="button">
        <button
          onClick={(event: any) => {
            event.preventDefault();
            showModal(!modal);
          }}
        >
          {children}
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
