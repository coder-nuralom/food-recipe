import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../components/useFetch";
import { API_URL } from "../components/useFetch";
import { BookOpen, ChevronLeft, Loader, Utensils } from "lucide-react";

const RecipeDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`${API_URL}lookup.php?i=${id}`);
  const recipe = data?.meals?.[0];

  if (loading) {
    return (
      <div className="text-center p-8 text-gray-300">
        <Loader
          size={30}
          className="animate-spin inline-block mr-2 text-blue-400"
        />
        <span>Loading....</span>
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 10; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  const instructions = recipe.strInstructions
    ? recipe.strInstructions
        .split(".")
        .map((step) => step.trim())
        .filter((step) => step.length > 0)
    : [];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <Link
          to={"/"}
          className="text-yellow-400 hover:text-yellow-300 text-lg font-medium flex items-center gap-x-1 mb-6"
        >
          <ChevronLeft className="w-6 h-6" />
          Back to Dashboard
        </Link>

        <div className="bg-gray-900 p-6 md:p-12 rounded-3xl shadow-2xl shadow-black/70 border border-gray-800 ">
          <div className="flex flex-col lg:flex-row gap-x-12 gap-y-8">
            <div className="lg:basis-[420px]">
              <h1 className="text-2xl min-[575px]:text-3xl font-black text-gray-100 mb-6">
                {recipe?.strMeal}
              </h1>

              <img
                src={recipe?.strMealThumb}
                alt={recipe?.strMeal}
                className="w-full max-w-[320px] md:max-w-[400px] rounded-xl shadow-2xl shadow-black/50 object-cover border-4 border-gray-700"
              />
            </div>
            <div className="flex-1 bg-gray-800 py-3 px-2 min-[450px]:px-3 rounded-xl shadow-inner shadow-black/30 border-4 border-gray-700">
              <h2 className="text-xl min-[575px]:text-3xl font-bold text-yellow-400 flex items-center gap-x-2 mb-6 border-b border-gray-700 pb-3">
                <Utensils className="w-7 h-7 text-blue-500" />
                Key Ingredients
              </h2>
              <ul className="list-none space-y-5">
                {ingredients?.map((item, index) => (
                  <li
                    key={index}
                    className="grid grid-cols-2 items-start gap-x-2"
                  >
                    <div className="col-sapn-1">
                      <span className="flex items-start md:items-center gap-x-1 text-gray-300 text-base max-[500px]:text-sm">
                        <ChevronLeft
                          size={20}
                          className="text-blue-400 font-bold shrink-0"
                        />
                        <span className="-mt-[2px]">{item.ingredient}</span>
                      </span>
                    </div>
                    <div className="col-sapn-1">
                      <span className="flex items-start md:items-center gap-x-1 text-gray-300 text-base max-[500px]:text-sm">
                        <ChevronLeft
                          size={20}
                          className="text-blue-400 font-bold shrink-0"
                        />
                        <span className="-mt-[2px]">{item.measure}</span>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex items-center mt-8 pt-4 border-t border-gray-700 text-lg text-gray-400 gap-x-3 flex-wrap gap-y-2">
                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full font-semibold text-sm shadow-md">
                  {recipe?.strCategory}
                </span>
                <span className="bg-green-600 text-white px-4 py-1.5 rounded-full font-semibold text-sm shadow-md">
                  {recipe?.strArea}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <h2 className="text-xl min-[575px]:text-3xl font-bold text-gray-100 mb-8 flex items-center gap-x-3">
              <BookOpen size={30} className="text-blue-400" />
              Detailed Preparation Steps
            </h2>
            <ul className="space-y-6 list-none">
              {instructions.map((step, index) => (
                <li
                  key={index}
                  className="text-lg max-[575px]:text-base bg-gray-800 p-4 rounded-xl border-l-6 border-blue-500 shadow-lg shadow-black/30 transition duration-300 hover:bg-gray-700/50"
                >
                  <span className="text-yellow-400 font-bold text-xl mr-2">
                    {`${index + 1}.`}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeDetails;
