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

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState(initialFacts);
  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      {showForm ? <NewFactForm setFacts={setFacts} /> : null}

      <main className="main">
        <CategoryFilter />
        <FactList facts={facts} />
      </main>
    </>
  );
}

// Header
function Header({ showForm, setShowForm }) {
  const appTitle = "Hoje Aprendi!";

  return (
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
        {showForm ? "Fechar" : "Partilhar"}
      </button>
    </header>
  );
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

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

// New Fact Form Component
function NewFactForm({ setFacts }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  function handleSubmit(e) {
    //1.Prevent browser reload
    e.preventDefault();
    console.log(text, source, category);
    //2.Check if data is valid, if so create a new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      //3.Create a new fact object
      const newFact = {
        id: Math.round(Math.random() * 10000000),
        text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getCurrentYear(),
      };
      //4.Add a new fact to the UI. add the fact to state
      //5.Reset the input fields.
      //6.Close the form
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Partilha aqui contéudos com outros..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Insere o Link ..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Escolhe módulo:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button class="btn btn-large">Publicar</button>
    </form>
  );
}

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
function FactList({ facts }) {
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
