import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { Modal, Button, Overlay, OverlayTrigger, Popover, Form, Card } from "react-bootstrap";


// should ref the API file & write the axios request directly in the API file!


// key={uuidv4()}
// dont need! use _id





// popover overlay might be better...




{/* <Form.Select aria-label="Default select example">
  <option>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</Form.Select> */}

// add a scrollbar!!!



function UserSearch() {




  const [userSearch, setUserSearch] = useState();
  const [userSearchResults, setUserSearchResults] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // need to make so that hitting search redirects to user's profile page!

  useEffect(() => {
    //   console.log(privacySettings);

      var tempArr;
      tempArr = [];
      axios.get(`/api/search/${userSearch}`).then((response) => {
        // console.log(response);
        // change to get array of vars, put in search result!
        // results.data._id & results.data.username
        // handleShow()
        response.data.map(entry => {
          tempArr.push({ _id: entry._id, username: entry.username })
        })

        setUserSearchResults(tempArr);
        console.log(userSearchResults);

      }).catch(err => setUserSearchResults([]))

  }, [userSearch])

  return (
    <>

      <OverlayTrigger
        trigger="focus"
        show={userSearchResults.length !== 0 ? true : false}
        // {userSearchResults.length !== 0 ? : show=false}
        // might be okay; try 'focus' as well maybe...
        key="bottom"
        placement="bottom"
        overlay={
          <Popover id={`popover-positioned-bottom`}>
            <Popover.Title as="h3">{`Search Results`}</Popover.Title>
            <Popover.Content>
              {/* <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select> */}
              {userSearchResults.map(entry => (
                <Card key={entry._id}>
                  <Card.Body>{entry.username}</Card.Body>
                </Card>
              )

              )}
            </Popover.Content>
          </Popover>
        }
      >
        <input className="input-group" onChange={(event) => setUserSearch(event.target.value)} value={userSearch} id="userSearch" placeholder="search for friends" type="text" />

      </OverlayTrigger>

      {/* <input className="input-group" onChange={(event) => setUserSearch(event.target.value)} value={userSearch} id="userSearch" placeholder="search for friends" type="text" /> */}

      {/* <Form.Select aria-label="Default select example">
        <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select> */}


    </>
  )

}




export default UserSearch;