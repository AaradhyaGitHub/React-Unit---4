import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
  const params = useParams();

  return (
    <>
      <p>Product Details...</p>
      <p>{params.productId}</p>
      {/*
            This by default is a relative path --> <p><Link to="..">Back</Link></p>

            Relative to route definition. In this case, when we go up, we go up to parent which is /root 

            instead we want to go to prodcuts

            adding relative = "path" --> React will remove one segment...
            in this case, the id is removed and we go back to /products

        */}
      <p>
        <Link to=".." relative="path">
          Back
        </Link>
      </p>
    </>
  );
}
