import { useState, useEffect } from "react";
import "./App.css";
import EmployeesData from "./EmployeesData";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  let [data, setData] = useState([]);
  let [firstname, setFirstname] = useState("Leo");
  let [lastname, setlastname] = useState("Messi");
  let [age, setAge] = useState(35);
  let [id, setId] = useState(0);
  let [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeesData);
  }, []);

  let handleEdit = (id) => {
    let dt = data.filter((item) => item.id === id);
    setIsUpdate(true);
    setFirstname(dt[0].firstName);
    setlastname(dt[0].lastName);
    setAge(dt[0].age);
    setId(id);
  };

  let handleDelete = (id) => {
    let dt = data.filter((item) => item.id !== id);
    setData(dt);
  };

  function handleClear() {
    setFirstname("");
    setlastname("");
    setAge("");
    setId("");
  }

  function handleAdd() {
    if (firstname === "" || lastname === "" || age === "") {
      alert("enter Valid values");
    } else {
      const newEmployee = {
        id: data.length + 1,
        firstName: firstname,
        lastName: lastname,
        age: Number(age),
      };
      setData([...data, newEmployee]);
      handleClear();
    }
  }

  function handleUpdate() {
    let index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
    let dt = [...data];
    dt[index].firstName = firstname;
    dt[index].lastName = lastname;
    dt[index].age = age;
    setData(dt);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <div>
          <label>
            First name
            <input
              type="text"
              placeholder="Entet your first name"
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              value={firstname}
            />
          </label>
        </div>
        <div>
          <label>
            Last name
            <input
              type="text"
              placeholder="Entet your last name"
              onChange={(e) => {
                setlastname(e.target.value);
              }}
              value={lastname}
            />
          </label>
        </div>

        <div>
          <label>
            age
            <input
              type="number"
              placeholder="Entet your age "
              onChange={(e) => {
                setAge(e.target.value);
              }}
              value={age}
            />
          </label>
        </div>
        {!isUpdate ? (
          <button
            onClick={() => {
              handleSave();
            }}
            className="btn btn-primary"
          >
            SAVE
          </button>
        ) : (
          <button
            onClick={() => {
              handleUpdate();
            }}
            className="btn btn-primary"
          >
            UPDATE
          </button>
        )}
        <div>
          <button
            className="btn btn-danger"
            onClick={() => {
              handleClear();
            }}
          >
            CLEAR
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              handleAdd();
            }}
          >
            ADD
          </button>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <td>SR.NO</td>
            <td>Id</td>
            <td>First Name</td>
            <td>LastName</td>
            <td>age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button
                    onClick={() => {
                      handleEdit(item.id);
                    }}
                    className="btn btn-primary"
                  >
                    EDIT
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
