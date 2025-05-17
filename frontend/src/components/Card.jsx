const Card = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;