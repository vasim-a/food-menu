import axios from "axios";
import { toast } from "material-react-toastify";

const url = process.env.REACT_APP_BASE_URL;

// Reusable function for fetching meal data with customizable error messages
const fetchMealData = async (endpoint, queryParam) => {
  try {
    const response = await axios.get(`${url}${endpoint}?${queryParam}`);

    // Check for no data in the response
    if (
      response.data.meals === null ||
      response.data.meals === "no data found" ||
      response.data.meals === "Invalid ID"
    ) {
      return { success: true };
    } else {
      return { success: true, data: response.data.meals };
    }
  } catch (error) {
    toast.warning(`Error while fetching the meal data`);
  }
};

export const SearchByMeal = async ({ details }) => {
  return fetchMealData("search.php", `s=${details}`);
};

export const SearchByIngredient = async ({ details }) => {
  return fetchMealData("filter.php", `i=${details}`);
};

export const SearchById = async ({ details }) => {
  return fetchMealData("lookup.php", `i=${details}`);
};
