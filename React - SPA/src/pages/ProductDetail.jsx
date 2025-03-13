import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const params = useParams();

  return (
    <>
      <p>Product Details...</p>
      <p>{params.productId}</p>
    </>
  );
}
