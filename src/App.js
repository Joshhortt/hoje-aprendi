import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");

        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        const { data: facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(250);

        if (!error) setFacts(facts);
        else alert("There was a problem getting data");
        // setFacts(facts);
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />

        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
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

// UFCD 1975 - Transformação de moldes de vestidos - 25
// UFCD 1990 - Modelação de protótipos - 50
// UFCD 1991 - Confeção de protótipos -50
// UFCD 1992 - Confeção de peças finais - 50
// UFCD 8598 - Desenvolvimento pessoal e técnicas de procura de emprego - 25

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
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    //1.Prevent browser reload
    e.preventDefault();
    console.log(text, source, category);
    //2.Check if data is valid, if so create a new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      //3.(NEW) Upload fact to Supabse and receive the new fact object
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      //4.Add a new fact to the UI: add the fact to state
      if (!error) setFacts((facts) => [newFact[0], ...facts]);
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
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Insere o Link ..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Escolhe módulo:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button class="btn btn-large" disabled={isUploading}>
        Publicar
      </button>
    </form>
  );
}

// Category Filter Component
function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
          >
            Tudo
          </button>
        </li>

        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
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
function FactList({ facts, setFacts }) {
  if (facts.length === 0)
    return (
      <p className="message">
        Neste momento, não existem partilhas neste módulo. ☹ Adiciona agora a
        primeira partilha!🤩
      </p>
    );

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>Existem {facts.length} partilhas na Base de Dados. Partilha também!</p>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();
    setIsUpdating(false);

    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }

  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[📛CONTROVERSO]</span> : null}
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
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍{fact.votesInteresting}
        </button>

        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>

        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default App;
