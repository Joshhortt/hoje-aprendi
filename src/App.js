import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";

const initialFacts = [
  {
    id: 1,
    text: "Como começar a costurar: 1o dicas para iniciantes",
    source: "https://alegro.pt/lets-talk/como-comecar-costurar",
    category: "transformação moldes de vestidos",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2023,
  },
  {
    id: 2,
    text: "Processo criativo no design de moda: como explorar o seu?",
    source:
      "https://www.digitaletextil.com.br/blog/processo-criativo-design-de-moda/",
    category: "modelação protótipos",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2023,
  },
  {
    id: 3,
    text: "Livro Corte e Costura. O Guia Definitivo de Técnicas Para a Produção de Blazers, Blusas, Calças, Saias e Vestidos",
    source:
      "https://indicalivros.com/livros/corte-e-costura-o-guia-definitivo-de-tecnicas-para-a-producao-de-blazers-blusas-calcas-saias-e-vestidos-alison-smith",
    category: "confeção protótipos",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2023,
  },
  {
    id: 4,
    text: "Livro Corte e Costura. O Guia Definitivo de Técnicas Para a Produção de Jeans",
    source:
      "https://indicalivros.com/livros/corte-e-costura-o-guia-definitivo-de-tecnicas-para-a-producao-de-blazers-blusas-calcas-saias-e-vestidos-alison-smith",
    category: "confeção peças finais",
    votesInteresting: 7,
    votesMindblowing: 2,
    votesFalse: 3,
    createdIn: 2023,
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getFacts() {
      setIsLoading(true);
      const { data: facts, error } = await supabase
        .from("facts")
        .select("*")
        .order("votesInteresting", { ascending: false })
        .limit(250);
      setFacts(facts);
      setIsLoading(false);
    }
    getFacts();
  }, []);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter />
        {isLoading ? <Loader /> : <FactList facts={facts} />}
      </main>
    </>
  );
}

// Loader
function Loader() {
  return (
    <p className="message">
      Aguarde! enquando a página carrega por completo...
    </p>
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
  { name: "Trans. Moldes de vestidos", color: "#3b82f6" },
  { name: "Modelação de protótipos", color: "#16a34a" },
  { name: "Confeção de protótipos", color: "#ef4444" },
  { name: "Confeção de peças finais", color: "#eab308" },
  { name: "D.P. e Téc. procura emprego", color: "#db2777" },
  { name: "Informações da Inovinter", color: "#f97316" },
  { name: "Conteúdos do Formador", color: "#8b5cf6" },
];

//UFCD 1975 - Transformação de moldes de vestidos - 25
//UFCD 1990 - Modelação de protótipos - 50
//UFCD 1991 - Confeção de protótipos -50
//UFCD 1992 - Confeção de peças finais - 50
//UFCD 8598 - Desenvolvimento pessoal e técnicas de procura de emprego - 25

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
function NewFactForm({ setFacts, setShowForm }) {
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
        createdIn: new Date().getFullYear(),
      };
      //4.Add a new fact to the UI: add the fact to state
      setFacts((facts) => [newFact, ...facts]);
      //5.Reset the input fields.
      setText("");
      setSource("");
      setCategory("");
      //6.Close the form
      setShowForm(false);
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
