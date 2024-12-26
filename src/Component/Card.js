import "../App.css";
export const Card = ({ data }) => {
  console.log(data);

  return (
    <div className="cardStyle">
      {data.map((data, index) => (
        <div key={index} className="mealCard">
          {data.strMealThumb && (
            <div>
              <img
                src={data.strMealThumb}
                alt={data.strMeal}
                className="imagstyle"
              />
            </div>
          )}

          <div className="desStyle">
            <h3>{data.strMeal}</h3>
            <p>
              <strong>Category / Cuisine:</strong> {data.strCategory}
            </p>
            <p>
              <strong>Instructions:</strong> {data.strInstructions}
            </p>
          </div>
          {data.strYoutube && (
            <div>
              <strong>YouTube Video:</strong>
              <a
                href={data.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Video
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
