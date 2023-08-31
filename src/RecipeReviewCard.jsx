import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ usedIngredients, unusedIngredients, missedIngredients, pictureURL, title }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card sx={{ width: 300, margin: 2 }}>
      <CardHeader
        title={title}
      />
      <CardMedia
        component="img"
        height="194"
        image={pictureURL}
        alt={title}
      />
      <CardContent>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={() => {
            setExpanded(!expanded);
          }}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {usedIngredients.length > 0 && <>
            <Typography paragraph><u>Used ingredients:</u></Typography>
            {usedIngredients.map((item, index) => {
              return <p key={index}>{item.original}</p>
            })}</>}

          {unusedIngredients.length > 0 && <>
            <Typography paragraph></Typography>
            <Typography paragraph><u>Unused ingredients:</u></Typography>
            {unusedIngredients.map((item, index) => {
              return <p key={index}>{item.original}</p>
            })}</>}
          {missedIngredients.length > 0 && <>
            <Typography paragraph></Typography>
            <Typography paragraph><u>Missed ingredients:</u></Typography>
            {missedIngredients.map((item, index) => {
              return <p key={index}>{item.original}</p>
            })}</>}

        </CardContent>
      </Collapse>
    </Card>
  );
}