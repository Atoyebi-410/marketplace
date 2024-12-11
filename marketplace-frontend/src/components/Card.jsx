import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function HeroCard(props) {
  return (
    <div className='HeroCard'>
        <Card >
        <Card.Img src={props.image} alt="Card image" />
            <Card.Body>
            <Card.Title>{props.title} </Card.Title>
            <Card.Text>
              {props.text}
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    </div>
  );
}

export default HeroCard;