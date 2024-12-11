import Button from 'react-bootstrap/Button';

function Btn(props) {
  return (
    <>
      <Button className="c-btn" variant="primary" size="lg" active>
        {props.name}
      </Button>
    </>
  );
}

export default Btn;