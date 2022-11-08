import { useEffect, useState } from "react";

function Modal({ showModal, hide, modalInputs, edit }) {
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

  useEffect(() => {
    setInputs({
      
      name: modalInputs.name,
      sum: modalInputs.sum,
      image: modalInputs.image
    });
  }, [modalInputs]);

  const handleEdit = () => {
    edit(
      {
    
        name: inputs.name,
        sum: inputs.sum,
        image: inputs.image
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
           Paaukojimai
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