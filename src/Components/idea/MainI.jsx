
import axios from "axios";
import { useEffect, useState } from "react";
import List from "./List";
import Modal from "./Modal";


function MainI() {
  const [table, setTable] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [showModal, setShowModal] = useState(false);
  const [modalInputs, setModalInputs] = useState({
    name: "",
    sum: "",
    image: ""

  });

  const [inputs, setInputs] = useState({
    name: "",
    sum: "",
    image: ""
  });

  const control = (e, what) => {
    const inputsCopy = { ...inputs };
    inputsCopy[what] = e.target.value;
    setInputs(inputsCopy);
  };


  //Read React
  useEffect(() => {
    axios
      .get("http://localhost:3003/idea")
      .then((res) => {
        setTable(res.data);
      })
      .catch((err) => console.log(err));
  }, [lastUpdate]);
  //Update React
  const edit = (item, id) => {
    setShowModal(false);
    axios.put('http://localhost:3003/idea/' + id, item)
      .then(res => {
        setLastUpdate(Date.now());
      })
      .catch((err) => console.log(err));
  }

  //create Reat 
  const create = (item) => {
    axios.post('http://localhost:3003/idea', item)
      .then(res => {
        setLastUpdate(Date.now());
      })
      .catch((err) => console.log(err));
    setInputs({
      name: "",
      sum: "",
      image: ""
    })

  }
  //Delete React
  const remove = (item) => {
    axios.delete('http://localhost:3003/idea/' + item.id)
      .then(res => {
        setLastUpdate(Date.now());
      })
      .catch((err) => console.log(err));
  }
  const modal = (item) => {
    setShowModal(true);
    setModalInputs(item);
  };

  const hide = () => {
    setShowModal(false);
  };

  return (
    <div className="App">

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Idejos</div>

              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="th2" className="col-form-label">
                      name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="th2"
                      value={inputs.name}
                      onChange={(e) => control(e, "name")}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="th3" className="col-form-label">
                      sum
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="th3"
                      value={inputs.sum}
                      onChange={(e) => control(e, "sum")}
                      placeholder="Enter sum"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="th4" className="col-form-label">
                      image
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="th4"
                      value={inputs.image}
                      onChange={(e) => control(e, "image")}
                      placeholder="Enter image"
                    />
                  </div>


                  <div className="modal-footer">

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => create(inputs)}
                    >
                      Save changes
                    </button>
                  </div>
                </form>
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Vardas</th>
                      <th>Suma</th>
                      <th>Nuotrauka</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                    <List table={table} modal={modal} remove={remove} create={create} />
                  </tbody>
                </table>
                <Modal
                  showModal={showModal}
                  modalInputs={modalInputs}
                  hide={hide}
                  edit={edit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainI;
