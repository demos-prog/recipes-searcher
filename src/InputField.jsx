import TextField from '@mui/material/TextField';

export default function InputField({ handleEnter }) {

  function handleForm(e) {
    e.preventDefault();
    const elem = document.querySelector('#inp');
    const inputValue = elem.value;
    handleEnter(inputValue);
    elem.value = "";
    elem.blur();
  }

  return (
    <form onSubmit={handleForm}>
      <TextField
        id="inp"
        label="Enter an ingredient"
        type="search"
        variant="standard"
        inputProps={{
          style: { color: '#AC05C2' },
        }}
      />
    </form>
  )
}
