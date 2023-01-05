import { useState } from "react";
import "./style.css";

const initialFacts = [
  {
    id: 1,
    text: "Como começar a costurar: 1o dicas para iniciantes",
    source: "https://alegro.pt/lets-talk/como-comecar-costurar",
    category: "introdução à costura",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2022,
  },
  {
    id: 2,
    text: "Processo criativo no design de moda: como explorar o seu?",
    source:
      "https://www.digitaletextil.com.br/blog/processo-criativo-design-de-moda/",
    category: "projeto de moda criativo",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2022,
  },
  {
    id: 3,
    text: "Livro Corte e Costura. O Guia Definitivo de Técnicas Para a Produção de Blazers, Blusas, Calças, Saias e Vestidos",
    source:
      "https://indicalivros.com/livros/corte-e-costura-o-guia-definitivo-de-tecnicas-para-a-producao-de-blazers-blusas-calcas-saias-e-vestidos-alison-smith",
    category: "corte de saias e vestidos",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2022,
  },
];

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span style={{ fontSize: "40px" }}>{count}</span>
      <button className="btn btn-large" onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
    </div>
  );
}

function App() {
  // Three Parts of using state

  // 1. Define state variable
  const [showForm, setShowForm] = useState(false);

  const appTitle = "Hoje Aprendi!";
  return (
    <>
      {/*HEADER*/}
      <header className="header">
        <div className="logo">
          <img src="logo.png" height="68" width="68" alt="Hoje Aprendi!" />
          <h1>{appTitle}</h1>
        </div>
        <button
          className="btn btn-large btn-open"
          // 3. Update state variable
          onClick={() => setShowForm((show) => !show)}
        >
          Partilhar
        </button>
      </header>
      {/* 2. Define state variable */}
      {showForm ? <NewFactForm /> : null}

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

// Data take from v1/data.js
const CATEGORIES = [
  { name: "Iniciação à Costura", color: "#3b82f6" },
  { name: "Projeto de Moda Criativo", color: "#16a34a" },
  { name: "Corte de Saias e Vestidos", color: "#ef4444" },
  { name: "Corte de Calças", color: "#eab308" },
  { name: "Corte de Camisas", color: "#db2777" },
  { name: "Costura Criativa", color: "#14b8a6" },
  { name: "Técnicas de Costura", color: "#f97316" },
  { name: "Conteúdos do Formador", color: "#8b5cf6" },
];

// Category Filter Component
function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li className="category">
          <button className="btn btn-all-categories">Tudo</button>
        </li>

        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// Fact List Component
function FactList() {
  // Temporary
  const facts = initialFacts;
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} />
        ))}
      </ul>
      <p>Existem {facts.length} partilhas na Base de Dados. Partilha também!</p>
    </section>
  );
}

function Fact({ fact }) {
  return (
    <li className="fact">
      <p>
        {fact.text}
        <a className="source" href={fact.source} target="blank">
          (Link)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            ?.color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button>👍{fact.votesInteresting}</button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
}

export default App;
