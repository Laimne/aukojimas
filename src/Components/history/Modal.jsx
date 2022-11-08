import { useEffect, useState } from "react";

function Modal({ showModal, hide, modalInputs, edit, ideas }) {
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    idea_id: "",
  });

  const control = (e, what) => {
    const inputsCopy = { ...inputs };
    inputsCopy[what] = e.target.value;
    setInputs(inputsCopy);
  };

  useEffect(() => {
    setInputs({
      name: modalInputs.name,
      price: modalInputs.price,
      idea_id: modalInputs.idea_id,

    });
  }, [modalInputs]);

  const handleEdit = () => {
    edit(
      {
        name: inputs.name,
        price: inputs.price,
        idea_id: inputs.idea_id,
      },
      modalInputs.id
    );
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{
        display: showModal ? "block" : "none",
        opacity: showModal ? "1" : "0",
      }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Aukojimas
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={hide}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
           
            
              <div className="form-group">
                <label htmlFor="th3" className="col-form-label">
                  name
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="th3"
                  value={inputs.name}
                  onChange={(e) => control(e, "name")}
                  placeholder="Enter name"
                />
              </div>

              
              <div className="form-group">
                <label htmlFor="th4" className="col-form-label">
                 Price
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="th4"
                  value={inputs.price}
                  onChange={(e) => control(e, "price")}
                  placeholder="Enter price"
                />
              </div>

              <div className="form-group">
                <label htmlFor="th5" className="col-form-label">
                 Ideja
                </label>
                <select onChange={(e) => control(e, "idea_id")}>
        
                      {ideas.map(idea => <option key={idea.id} value={idea.id} selected={inputs.idea_id === idea.id ? true : false}>{idea.name}</option>)}
                    </select>
                
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={hide}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEdit}
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;