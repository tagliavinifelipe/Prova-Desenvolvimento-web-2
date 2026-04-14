import { useState } from "react";

export default function App() {
  const [filmes, setFilmes] = useState([]);
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");

  function handleAdicionar() {
    if (!nome || !genero) return;
    setFilmes([...filmes, { id: Date.now(), nome, genero }]);
    setNome("");
    setGenero("");

  }

  return (
    
    
    
    <div>
      
      <div style={{ background: "#222", color: "#fff", padding: "12px", textAlign: "center" }}>
        <h2>Catálogo de Filmes ou Series</h2>
        
      </div>


      <div style={{ padding: "20px" }}>
        <h3>Adicionar Filme / Série</h3>

        <div>
          <label>Nome: </label>
          <input

            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome"
          />
        </div>

        <br />

        <div>
          <label>Gênero: </label>
          <input
            type="text"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            placeholder="Digite o gênero"
          />
        </div>

        <br />

        <button onClick={handleAdicionar}>Adicionar</button>
      </div>

     
      <div style={{ padding: "0 20px" }}>
        <h3>Lista de Filmes / Séries</h3>
        <ul>
          {filmes.map((filme) => (
            <li key={filme.id}>
              <strong>{filme.nome}</strong> - {filme.genero}
            </li>
          ))}
        </ul>
      </div>

      
      <div style={{ background: "#222", color: "#fff", padding: "12px", textAlign: "center", marginTop: "40px" }}>
        <p>Felipe Tagliavini Santo | {new Date().toLocaleDateString("pt-BR")}</p>
      </div>
    </div>
  );
}
