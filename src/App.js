import "./style.css";

function App() {
  const appTitle = "Hoje Aprendi!";
  return (
    <>
      {/*HEADER*/}
      <header className="header">
        <div className="logo">
          <img src="logo.png" height="68" width="68" alt="Hoje Aprendi!" />
          <h1>{appTitle}</h1>
        </div>
        <button className="btn btn-large btn-open">Partilhar</button>
      </header>
      <NewFactForm />
      <main className="main">
        <CategoryFilter />
        <FactList />
      </main>
    </>
  );
}

// New Fact Form Component
function NewFactForm() {
  return <form className="fact-form">Fact form</form>;
}

// Category Filter Component
function CategoryFilter() {
  return <aside>Category filter</aside>;
}

// Fact List Component
function FactList() {
  return <section>Facts list</section>;
}

export default App;
