import Item from './Item';
import './ListOfRequirements.css';

export default function ListOfRequirements({ handleDelete, arrOfIngredients }) {

  return (
    <div id="listWrap">
      {arrOfIngredients.map((item, index) => {
        return <Item handleDelete={handleDelete} key={index} item={item} />
      })}
    </div>
  )
}
