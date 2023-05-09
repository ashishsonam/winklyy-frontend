import { useNavigate } from "react-router-dom";

interface Props {
  verifiedStatus: string | null;
  username: string | null;
  profilePicture: string;
  name: string | null;
}

const ProfileTile = ({
  verifiedStatus,
  username,
  name,
  profilePicture,
}: Props) => {
  const navigate = useNavigate();

  return (
    <button
      disabled={!verifiedStatus}
      onClick={() => {
        navigate("/" + username);
      }}
      className={`flex items-center gap-4 p-4 ${!verifiedStatus && "blur-sm"}`}
    >
      <img
        className="w-12 h-12 rounded-full"
        src={profilePicture}
        alt="profile image"
      />
      <div className="flex flex-col">
        <strong className=" text-sm font-CocogooseMedium text-brown900 ">
          {name}
        </strong>
      </div>
    </button>
  );
};

export default ProfileTile;
