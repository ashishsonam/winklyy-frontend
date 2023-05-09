interface Props {
  imageUri: string;
}

const LIBCard = ({ imageUri }: Props) => {
  return (
    <div
      className="w-[300px] h-[400px] rounded-3xl p-4 bg-white shadow-lg bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${imageUri})` }}
    ></div>
  );
};

export default LIBCard;
