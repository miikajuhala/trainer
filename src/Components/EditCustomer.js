import { TextField, Button, DialogContentText, DialogTitle, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import React from 'react'
import axios from 'axios';

export default function EditCustomer(props){

    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({city: "",email:"",firstname: "",lastname:"",phone:"",} )





    const handleClickOpen = () => {
      setCustomer({city: props.customer.city, 
        email:props.customer.email,
        firstname: props.customer.firstname,
        lastname:props.customer.lastname,
        phone:props.customer.phone, 
        postcode:props.customer.postcode,
        streetaddress:props.customer.streetaddress})
      setOpen(true); 
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleOk =()=>{
      axios.put(props.customer.links[0].href, {
        city: customer.city, 
        email:customer.email,
        firstname: customer.firstname,
        lastname: customer.lastname,
        phone: customer.phone, 
        postcode: customer.postcode,
        streetaddress: customer.streetaddress,
      })
      .then(res =>{
        props.setMsg("User edited!")
        props.setOpen(true)
        props.update();
        console.log("update!"+res)
        setOpen(false);
      })
      
      
    }

     const inputChanged = (event) => {
      setCustomer({...customer, [event.target.name]: event.target.value});
     }
  
    return (
      <div>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Edit customer
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