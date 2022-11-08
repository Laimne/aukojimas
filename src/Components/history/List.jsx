import Item from "./Item";

function List({ table, modal, remove, ideas }) {
  return (
    <>
      {table.map((data) => (
        <Item key={data.id} data={data} modal={modal} remove={remove} ideas={ideas}></Item>
      ))}
    </>
  );
}

export default List;