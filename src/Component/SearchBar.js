import { useEffect, useState, useCallback } from "react";
import "../App.css";
import useDebounce from "../Utils/useDebounce";
import { SearchById, SearchByIngredient, SearchByMeal } from "../Utils/utils";
import { toast } from "material-react-toastify";
import { Card } from "./Card";

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [allData, setAllData] = useState([]);

  const debouncedInput = useDebounce(input, 500); // Debounced input with delay

  // Update input state on change and reset availability
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);
    setIsAvailable(false); // Reset availability when input is cleared
  };

  const fetchMealData = useCallback(async (query) => {
    try {
      const responses = await Promise.all([
        SearchByMeal({ details: query }),
        SearchByIngredient({ details: query }),
        SearchById({ details: query }),
      ]);

      const [mealResponse, ingredientResponse, idResponse] = responses;

      // Combine all data into one array
      const combinedData = [
        ...(mealResponse?.data || []),
        ...(ingredientResponse?.data || []),
        ...(idResponse?.data || []),
      ];

      setAllData(combinedData);
      setIsAvailable(combinedData.length > 0);

      if (combinedData.length === 0) {
        toast.warning(`No food found for: ${query}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred while fetching data.");
      setIsAvailable(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedInput.length > 0) {
      fetchMealData(debouncedInput);
    } else {
      setIsAvailable(false);
      setAllData([]); // Reset all data when input is empty
    }
  }, [debouncedInput, fetchMealData]);

  return (
    <div>
      <div class="search-bar">
        <div class="input-group">
          <input
            class="form-control input-text"
            onChange={handleInputChange}
            type="text"
            placeholder="Search.."
          />
        </div>
      </div>
      {isAvailable && <Card data={allData} />}
    </div>
  );
};
