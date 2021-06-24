import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { Modal, Button, Overlay, OverlayTrigger, Popover, Form, Card } from "react-bootstrap";


// should ref the API file & write the axios request directly in the API file!

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
  const [show, setShow] = useState({ show: false })

  // need to make so that hitting search redirects to user's profile page!

  useEffect(() => {

    userSearch ? setShow({}) : setShow({ show: false })

    var tempArr;
    tempArr = [];
    axios.get(`/api/search/${userSearch}`).then((response) => {
      response.data.map(entry => {
        tempArr.push({ _id: entry._id, username: entry.username })
      })

      setUserSearchResults(tempArr);
      // setShow({})

    }).catch(err => {
      setUserSearchResults([]);
      // setShow({ show: false });
    })

  }, [userSearch])

  return (
    <>

      <OverlayTrigger
        trigger="focus"
        {...show}
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

              {userSearchResults.length === 0 ? <h5>No Results Found</h5> : ""}
              
              {userSearchResults.length > 0 ?
                userSearchResults.map(entry => (
                  <Card key={entry._id}>
                    <Card.Body>{entry.username}</Card.Body>
                  </Card>
                ))
                : ""
              }
            </Popover.Content>
          </Popover>
        }
      >
        <input className="input-group" onChange={(event) => setUserSearch(event.target.value)} value={userSearch} id="userSearch" placeholder="search for friends" type="text" />

      </OverlayTrigger>

    </>
  )

}




export default UserSearch;