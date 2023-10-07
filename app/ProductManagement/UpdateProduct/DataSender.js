import axios from "axios";
import { toast } from "react-toastify";
export default function DataSender(data, id, refechData) {
  const PRODUCT = `
    mutation Mutation($id: String!, $input: ProductInput) {
        updateProduct(_id: $id, input: $input) {
          _id
          product_name
        }
      }
      
  `;

  axios
    .post(process.env.GRAPHQL_SERVER, {
      query: `${PRODUCT}`,
      variables: {
        id: id,
        input: data,
      },
    })
    .then((res) => {
      toast.success(
        `${res?.data?.data?.updateProduct?.product_name} Updated Successfully ! `,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: false,
          theme: "light",
          style: {
            borderRadius: 10,
            font: "bold",
            fontSize: 15,
          },
        }
      );
    })
    .catch((err) => {
      console.log(err, "gql");
    })
    .finally(() => {
      refechData();
      console.log("done done done");
    });
  return;
}
