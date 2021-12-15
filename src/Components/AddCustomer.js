import { TextField, Button, DialogContentText, DialogTitle, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import React, { useEffect } from 'react'
import axios from 'axios';

export default function AddCustomer(props){

    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({city: "",email:"",firstname: "",lastname:"",phone:"",postcode:"",streetaddress:"",} )

    
      



    const handleClickOpen = () => {
      setOpen(true); 
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleOk =()=>{
    props.addCustomer(customer)
    props.getUsers()
    setOpen(false)
      
    }

     const inputChanged = (event) => {
      setCustomer({...customer, [event.target.name]: event.target.value});
     }
  
    return (
      <div>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
         Add a new customer
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle >Edit Customer</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Remember to save your changes
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Firstname"
              fullWidth
              variant="standard"
              name='firstname'
              value={customer.firstname}
              onChange={inputChanged}
            />
             <TextField
              autoFocus
              margin="dense"
              label="Lastname"
              fullWidth
              variant="standard"
              name='lastname'
              value={customer.lastname}
              onChange={inputChanged}
            />
             <TextField
              autoFocus
              margin="dense"
              label="City"
              fullWidth
              variant="standard"
              name='city'
              value={customer.city}
              onChange={inputChanged}
            />
              <TextField
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              name='email'
              value={customer.email}
              onChange={inputChanged}
            />
              <TextField
              autoFocus
              margin="dense"
              label="Phone"
              type="phone"
              fullWidth
              variant="standard"
              name='phone'
              value={customer.phone}
              onChange={inputChanged}
            />
              <TextField
              autoFocus
              margin="dense"
              label="Postcode"
              fullWidth
              variant="standard"
              name='postcode'
              value={customer.postcode}
              onChange={inputChanged}
            />
             <TextField
              autoFocus
              margin="dense"
              label="Streetaddress"
              fullWidth
              variant="standard"
              name='streetaddress'
              value={customer.streetaddress}
              onChange={inputChanged}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleOk}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }