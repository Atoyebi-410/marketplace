import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import API from "../services/api";

const ProductDetailPage = ({ match }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await API.get(`/api/products/${match.params.id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [match.params.id]);

  if (!product) return <p>Loading...</p>;

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Image src={product.imageUrl || "/placeholder.jpg"} fluid />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Seller:</strong> {product.seller.name}
          </p>
          <Button variant="primary">Buy Now</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
