import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function OrderDatatable() {

    const [orderList, setOrderList] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    async function fetchData(url) {
      try {
        setLoading(true)
        const response = await axios.get(url)
        setOrderList(response.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }

    React.useEffect(()=>{
      if(orderList && orderList.length===0) {
        fetchData('/orders')
      }
    }, [orderList])

    return (
      <div className="MessageTableContainer">
        <div className="MessageTableHeader">
          <h1>Orders</h1>
        </div>
        <div className="MessageTableBody">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Order Id</TableCell>
                  <TableCell align="right">User Id</TableCell>
                  <TableCell align="right">Customer Name</TableCell>
                  <TableCell align="right">Total Price</TableCell>
                  <TableCell align="right">Order Status Url</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                {(!loading && orderList) ? orderList.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.order.id}
                    </TableCell>
                    <TableCell align="right">{row.order.user_id} </TableCell>
                    <TableCell align="right">{row.order.customer.first_name} {row.order.customer.last_name}</TableCell>
                    <TableCell align="right">{row.order.total_price}</TableCell>
                    <TableCell align="right">{row.order.completed_at}</TableCell>
                  </TableRow>
                )): (<></>)}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  } 