
import axios from "axios";
import { useEffect, useState } from "react";
import List from "./List";
import Modal from "./Modal";


function MainH() {
  const [table, setTable] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [showModal, setShowModal] = useState(false);
  const [modalInputs, setModalInputs] = useState({
    name: "",
    price: "",
    idea_id: "",
  });

  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    idea_id: ""
  });

  const control = (e, what) => {
    const inputsCopy = { ...inputs };
    inputsCopy[what] = e.target.value;
    setInputs(inputsCopy);
  };

  //Read React
  useEffect(() => {
    axios
      .get("http://localhost:3003/history")
      .then((res) => {
        setTable(res.data);
      })
      .catch((err) => console.log(err));
  }, [lastUpdate]);
  useEffect(() => {
    axios
      .get("http://localhost:3003/idea")
      .then((res) => {
        setIdeas(res.data);
      })
      .catch((err) => console.log(err));
  }, [table]);
  //Update React
  const edit = (item, id) => {
    setShowModal(false);
    axios.put('http://localhost:3003/history/' + id, item)
      .then(res => {
        setLastUpdate(Date.now());
      })
      .catch((err) => console.log(err));
  }
  //create Reat 
  const create = (item) => {
    axios.post('http://localhost:3003/history', item)
      .then(res => {
        setLastUpdate(Date.now());
      })
      .catch((err) => console.log(err));
    setInputs({
      name: "",
      price: "",
      idea_id: ""
    })

  }
  //Delete React
  const remove = (item) => {
    axios.delete('http://localhost:3003/history/' + item.id)
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
              <div className="card-header">Aukojimo projektai</div>
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
                      value={inputs.price}
                      onChange={(e) => control(e, "price")}
                      placeholder="Enter price"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="th4" className="col-form-label">
                      image
                    </label>
                    <select onChange={(e) => control(e, "idea_id")}>
                      <option defaultValue='1'disabled selected>------</option>
                      {ideas.map(idea => <option key={idea.id} value={idea.id}>{idea.name}</option>)}
                    </select>

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
                      <th>Aukotojas</th>
                      <th>Suma</th>
                      <th>Ideja</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                    <List table={table} modal={modal} remove={remove} ideas={ideas}/>
                  </tbody>
                </table>
                <Modal
                  showModal={showModal}
                  modalInputs={modalInputs}
                  hide={hide}
                  edit={edit}
                  ideas={ideas}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainH;
