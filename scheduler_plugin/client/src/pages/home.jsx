import { Button } from "@mui/material";
import axios from "axios";
import MessageDatatable from "./messagedatatable";
import OrderDatatable from "./orderdatatable";

function Home() {
    const handleClick = () => {
      async function deleteAll() {
        try {
          await axios.delete('/delete/all')
        } catch (error) {
          console.log(error);
        }
      }

      deleteAll()
    }

    return (
      <div className="Home">
        <Button onClick={()=>{handleClick()}}>Reset</Button>
        <MessageDatatable />
        <OrderDatatable />
      </div>
    );
}
  
export default Home;
  