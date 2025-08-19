import { FaStar } from "react-icons/fa";

const ratingData = {
  average: 4.0,
  totalRatings: 2924,
  totalReviews: 1050,
  breakdown: {
    Excellent: 1412,
    "Very Good": 787,
    Good: 387,
    Average: 126,
    Poor: 212,
  },
};

const getBarColor = (label) => {
  switch (label) {
    case "Excellent":
    case "Very Good":
      return "bg-green-500";
    case "Good":
      return "bg-yellow-400";
    case "Average":
      return "bg-orange-400";
    case "Poor":
      return "bg-red-500";
    default:
      return "bg-gray-300";
  }
};

const ProductRating = () => {
  const maxCount = Math.max(...Object.values(ratingData.breakdown));

  return (
    <div className="rounded-md p-8  bg-white w-full max-w-2xl ">
      <h2 className="text-lg font-semibold mb-4">Product Ratings & Reviews</h2>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-green-600 flex items-center justify-center">
            {ratingData.average}
            <FaStar className="ml-1 text-green-600" />
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {ratingData.totalRatings} Ratings,<br /> {ratingData.totalReviews} Reviews
          </div>
        </div>
        <div className="flex-1 ml-4 space-y-2">
          {Object.entries(ratingData.breakdown).map(([label, count]) => {
            const widthPercent = (count / maxCount) * 100;
            return (
              <div key={label} className="flex items-center">
                <div className="w-20 text-sm font-medium">{label}</div>
                <div className="flex-1 h-2 bg-gray-200 mx-2 rounded-full relative">
                  <div
                    className={`h-2 rounded-full ${getBarColor(label)}`}
                    style={{ width: `${widthPercent}%` }}
                  ></div>
                </div>
                <div className="w-10 text-sm text-gray-600">{count}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductRating;
