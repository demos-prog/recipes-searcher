import IconButton from '@mui/material/IconButton';
import deleteIcon from './assets/delete_black_24dp.svg';
import './Item.css';



export default function Item({ handleDelete, item }) {
  return (
    <div className='itemWrap'>
      <pre>{"   " + item}</pre>
      <IconButton onClick={() => handleDelete(item)} aria-label="delete" size="small">
        <img
          id="deleteIcon"
          alt="deleteIacon"
          src={deleteIcon}
        />
      </IconButton>
    </div>
  )
}
