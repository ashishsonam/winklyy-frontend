interface Props {
  username?: string | null;
  inputEvent?: any;
  disabled?: boolean;
}

const Username = ({ username, inputEvent, disabled = false }: Props) => {
  return (
    <>
      <div className="h-[60px] rounded-full border-brown900 border-[1.5px] flex flex-row items-center justify-center bg-white px-4">
        <div className="text-[20px] sm:text-xl font-CocogooseSemibold ml-2 text-brown900">
          winklyy.com/
        </div>
        <input
          type="text"
          name="username"
          id="username"
          value={username ? username : ""}
          disabled={disabled}
          onChange={inputEvent}
          placeholder="username"
          className="text-[18px] sm:text-[20px] font-CocogooseThin font-bold h-full w-full sm:w-[140px] rounded-r-full border-0 focus:border-0 focus:ring-0"
        />
      </div>
    </>
  );
};

export default Username;
