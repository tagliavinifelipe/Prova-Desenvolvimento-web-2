import { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from "firebase/firestore";
import "./App.css"; // Importação do CSS que criaremos abaixo

export default function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [filmes, setFilmes] = useState([]);
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuarioLogado(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (usuarioLogado) {
      const q = query(collection(db, "filmes"), orderBy("nome", "asc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFilmes(lista);
      });
      return () => unsubscribe();
    }
  }, [usuarioLogado]);

  const cadastrar = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      alert("Usuário criado com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar: " + error.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
    } catch (error) {
      alert("Erro ao entrar: " + error.message);
    }
  };

  const logout = () => signOut(auth);

  async function handleAdicionar() {
    if (!nome || !genero) {
      alert("Preencha todos os campos!");
      return;
    }
    try {
      await addDoc(collection(db, "filmes"), {
        nome: nome,
        genero: genero,
        criadoEm: new Date()
      });
      setNome("");
      setGenero("");
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  }

  return (
    <div className="container-geral">
      <div className="header">
        <h2>Catálogo de Filmes ou Séries (Firebase)</h2>
      </div>

      <div className="conteudo">
        {!usuarioLogado ? (
          <div className="auth-box">
            <h3>Acesso ao Sistema</h3>
            <input 
              type="email" 
              placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Senha" 
              onChange={(e) => setSenha(e.target.value)} 
            />
            <div className="botoes-row">
              <button onClick={login} className="btn-primary">Entrar</button>
              <button onClick={cadastrar} className="btn-secondary">Cadastrar</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="user-info">
              <p>Olá, <strong>{usuarioLogado.email}</strong></p>
              <button onClick={logout} className="btn-logout">Sair do Sistema</button>
            </div>
            
            {/* IMAGEM RELACIONADA A FILMES ADICIONADA AQUI */}
            <div className="banner-cinema">
              <img 
                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=600" 
                alt="Cinema Banner" 
              />
            </div>

            <hr />

            <div className="form-cadastro">
              <h3>Adicionar Filme / Série</h3>
              <div className="input-group">
                <label>Nome: </label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Gênero: </label>
                <input type="text" value={genero} onChange={(e) => setGenero(e.target.value)} />
              </div>
              <button onClick={handleAdicionar} className="btn-save">Salvar no Firebase</button>
            </div>

            <div className="lista-filmes">
              <h3>Lista de Filmes</h3>
              <ul>
                {filmes.map((filme) => (
                  <li key={filme.id}>
                    <strong>{filme.nome}</strong> - <span>{filme.genero}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="footer">
        <p>Felipe Tagliavini Santo | {new Date().toLocaleDateString("pt-BR")}</p>
      </div>
    </div>
  );
} 