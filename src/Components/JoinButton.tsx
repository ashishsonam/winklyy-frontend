import { Link } from 'react-router-dom';

const JoinButton = () => {
  return (
    <>
      <div className="w-full h-full flex flex-row items-center justify-center">
        <Link
          to="/signup"
          id="signup"
          className="h-full w-full px-4 md:px-7 py-4 flex items-center justify-center rounded-full bg-brown900 hover:text-white focus:outline-none"
        >
          <div className="text-white text-xl font-CocogooseMedium">
            join now
          </div>
        </Link>
      </div>
    </>
  );
};

export default JoinButton;
