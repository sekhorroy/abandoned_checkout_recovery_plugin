import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function MessageDatatable() {

    const [messageList, setMessageList] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    async function fetchData(url) {
      try {
        setLoading(true)
        const response = await axios.get(url)
        setMessageList(response.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }

    React.useEffect(()=>{
      if(messageList && messageList.length===0) {
        fetchData('/messages')
      }
    }, [messageList])

    return (
      <div className="MessageTableContainer">
        <div className="MessageTableHeader">
          <h1>Messages</h1>
        </div>
        <div className="MessageTableBody">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Message </TableCell>
                  <TableCell align="right">User Id</TableCell>
                  <TableCell align="right">Order Id</TableCell>
                  <TableCell align="right">Total Price</TableCell>
                  <TableCell align="right">Recovery url</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                {(!loading && messageList) ? messageList.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {`Hi ${row.customer.first_name} ${row.customer.last_name}, Your order No: ${row.order_id} is pending`}
                    </TableCell>
                    <TableCell align="right">{row.user_id}</TableCell>
                    <TableCell align="right">{row.order_id}</TableCell>
                    <TableCell align="right">{row.total_price}</TableCell>
                    <TableCell align="right">{row.abandoned_checkout_url}</TableCell>
                  </TableRow>
                )): (<></>)}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }