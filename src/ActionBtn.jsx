import Button from '@mui/material/Button';


export default function ActionBtn({ setFlag }) {
  return (
    <Button onClick={() => setFlag(prev => !prev)} variant="contained" size="small">
      Find recipes
    </Button>
  )
}
