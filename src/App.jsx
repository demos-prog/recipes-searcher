import { useEffect, useState } from 'react';
import './null_styles.css';
import './App.css';
import InputField from './InputField';
import ListOfRequirements from './ListOfRequirements';
import ActionBtn from './ActionBtn';
import RecipeReviewCard from './RecipeReviewCard';

const apiKey = '8b3de1a00ec040b3b15014df1571cd2c';
const link = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}`;

function App() {
  const [arrOfIngredients, setArrOfIngredients] = useState(["Apple", "Meat", "Rise", "Eggs", "Grain"]);
  const [hasRendered, setHasRendered] = useState(false);
  const [data, setData] = useState(null);
  const [flag, setFlag] = useState(false);

  async function getData() {
    try {
      const r = await fetch(makeValidLink());
      return await r.json();
    } catch (error) {
      console.error(error.message);
    }
  }

  async function checkIngredientValidity(ingredient) {
    const autocompleteEndpoint = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${apiKey}&query=${ingredient}`;

    try {
      const response = await fetch(autocompleteEndpoint);
      const data = await response.json();
      return data.length > 0;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }

  function makeValidLink() {
    const ingredients = arrOfIngredients.join(",+");
    const params = `&ingredients=${ingredients}&number=6&ranking=2`;
    return (`${link}${params}`);
  }

  async function handleEnter(entered) {
    if (entered === "") return;
    entered = entered.at(0).toUpperCase() + entered.slice(1);
    const isValid = await checkIngredientValidity(entered);
    if (isValid && !arrOfIngredients.includes(entered)) {
      setArrOfIngredients(prevArr => [...prevArr, entered]);
    }
  }

  function handleDelete(item) {
    setArrOfIngredients(prevArr => prevArr.filter(req => req !== item));
  }

  useEffect(() => {
    if (!hasRendered) {
      setHasRendered(true);
      return;
    }
    getData().then(d => setData(d));

    // getData().then(d=>localStorage.setItem('test', JSON.stringify(d)))
    // setData(JSON.parse(localStorage.getItem("test")));
  }, [hasRendered, flag])

  return (
    <div id="contentWrapper">
      <div id="inputAreaWrapper">
        <div id="inputArea">
          <InputField handleEnter={handleEnter} />
          <ActionBtn id="btn" setFlag={setFlag} />
        </div>
        <ListOfRequirements
          handleDelete={handleDelete}
          arrOfIngredients={arrOfIngredients}
        />
      </div>
      <div id='resultAreaWrapper'>
        {data && data.map((recipe, index) => {
          return <RecipeReviewCard
            key={index}
            usedIngredients={recipe.usedIngredients}
            unusedIngredients={recipe.unusedIngredients}
            missedIngredients={recipe.missedIngredients}
            pictureURL={recipe.image}
            title={recipe.title}
          />
        })
        }
      </div>
    </div>
  )
}

export default App;
