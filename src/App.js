import "./style.css";

function App() {
  return (
    <>
      {/*HEADER*/}
      <header className="header">
        <div className="logo">
          <img src="logo.png" height="68" width="68" alt="Hoje Aprendi!" />
          <h1>Hoje Aprendi!</h1>
        </div>
        <button className="btn btn-large btn-open">Partilhar</button>
      </header>

      <CategoryFilter />
    </>
  );
}
// Second Component
function CategoryFilter() {
  return <aside>Category filter</aside>;
}

export default App;
