import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import Modals from "./Modals/Modals";
import { useParams } from "react-router-dom";
import UserModal from "./Modals/UserModal";
function ProjectTables() {
  /* Modal States */
  const param = useParams();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [project, setProject] = useState([]);
  const ACCESS=""+process.env.REACT_APP_ACCESS 
  useEffect(() => {
    setShow(false);
    async function fetchData() {
      await axios.get("http://localhost:4000/roomslist").then((res) => {
        setData(res.data);
      })

    }
    async function fetchUsers() {
      await axios.get(`http://localhost:4000/users`,{
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': ACCESS
      }
      }).then((res) => {
        setData(res.data);
      });
    }
    param.user ? fetchUsers() : fetchData();
  }, [param,ACCESS]);


  async function DeleteRoom(e, id) {
    e.preventDefault();
    await axios.delete("http://localhost:4000/roomslist/" + id,{
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': ACCESS
    }
    }).then((res) => {
      window.location.reload();
    });
  }




  async function DeleteUser(e, id) {
    e.preventDefault();
    await axios.delete("http://localhost:4000/users/" + id,{
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': ACCESS
    }
    }).then((res) => {
      window.location.reload();
    });
  }




  async function UpdateUser(e, id) {
    e.preventDefault();
    await axios.get("http://localhost:4000/users/"+ id,{
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': ACCESS
      }
    }).then((res) => {
      setProject(res.data);
      show ? setShow(false) : setShow(true);
    });
  }



  async function UpdateRoom(e, id) {
    e.preventDefault();

    await axios.get("http://localhost:4000/roomslist/"+id).then((res) => {
      setProject(res.data);
      show ? setShow(false) : setShow(true);
    });
  }



  function hideform() {
    setShow(false);
  }

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle> {param.user ? (
              <h5>Users Data </h5>
            ) : (
              <h5>Rooms Details </h5>
            )}</CardTitle>
          <CardSubtitle className="mb-2 text-muted">
            {param.user ? (
              <h6>Overview of Users Data </h6>
            ) : (
              <h6>Overview of Hostel Account </h6>
            )}
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              {param.user ? (
                <tr>
                  <th>User Name</th>
                  <th>Email Address</th>
                  <th>User ID</th>
                  <th>Action</th>
                </tr>
              ) : (
                <tr>
                  <th>Room No</th>
                  <th>Room Type</th>
                  <th>Status</th>
                  <th>Room Rent</th>
                  <th>Action</th>
                </tr>
              )}
            </thead>
            <tbody>
              {data.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <div className="ms-3">
                        {param.user ? (
                          <h6 className="mb-0">{tdata.name}</h6>
                        ) : (
                          <>
                            <h6 className="mb-0">Room No: {tdata.roomno}</h6>
                            <span className="text-muted">
                              Floor No: {tdata.floorno}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                  {param.user ? (
                    <td>{tdata.email}</td>
                  ) : (
                    <td> {tdata.roomtype}</td>
                  )}
                  {param.user ? (
                    <td>{tdata._id}</td>
                  ) : (
                    <td>
                      {tdata.roomcapacity <= "1" ? (
                        <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                      ) : (
                        <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                      )}
                    </td>
                  )}

                  <td>{tdata.roomprice}</td>
                  <td>
                    <Button
                      className="btn"
                      color="success"
                      style={{ marginRight: "1rem" }}
                      onClick={(e) =>
                        param.user
                          ? UpdateUser(e, tdata._id)
                          : UpdateRoom(e, tdata._id)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      className="btn"
                      color="danger"
                      onClick={(e) =>
                        param.user
                          ? DeleteUser(e, tdata._id)
                          : DeleteRoom(e, tdata._id)
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      {param.user?
      (<div>{show ? <UserModal data={project} handler={hideform} /> : null}</div>):
      (<div>{show ? <Modals data={project} handler={hideform} /> : null}</div>)
      }
    </div>
  );
}

export default ProjectTables;
