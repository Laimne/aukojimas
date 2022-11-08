function Item({ data, modal, remove, ideas }) {
    const showEdit = () => {
      modal(data);
    };
  
    return (
      <tr>

        <td>{data.name}</td>
        <td>{data.price}</td>
        <td>{ideas && ideas?.find(idea=> idea.id===data.idea_id)?.name}</td>
        <td> <button className="btn btn-primary" onClick={showEdit}>
          Edit
        </button> </td>
        <td>  <button className="btn btn-danger" onClick={()=> remove(data)}>
          Delete
        </button></td>
      </tr>
    );
  }
  
  export default Item;