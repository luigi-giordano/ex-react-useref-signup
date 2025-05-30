import { useMemo, useState } from "react"

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

function App() {

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [description, setDescription] = useState("");

  const isUsernameValid = useMemo(() => {
    const charsValid = [...userName].every(char => letters.includes(char.toLowerCase()) || numbers.includes(char)
    );
    return charsValid && userName.length >= 6;
  }, [userName]);

  const isPasswordValid = useMemo(() => {
    return (
      password.trim().length >= 6 &&
      [...password].some(char => letters.includes(char)) &&
      [...password].some(char => numbers.includes(char)) &&
      [...password].some(char => symbols.includes(char))
    );
  }, [password])

  const isDescriptionValid = useMemo(() => {
    return (
      description.trim().length >= 100 &&
      description.trim().length < 1000
    );
  }, [description])

  const handleSubmit = e => {
    e.preventDefault();
    if (
      !fullName.trim() ||
      !userName.trim() ||
      !password.trim() ||
      !specialization.trim() ||
      !experienceYears.trim() ||
      experienceYears <= 0 ||
      !description.trim() ||
      !isUsernameValid ||
      !isPasswordValid ||
      !isDescriptionValid
    ) {
      alert("Errore: compilare tutti i campi!");
      return;
    }
    console.log('Submit effettuato correttamente:', {
      fullName,
      userName,
      password,
      specialization,
      experienceYears,
      description,
    });
  }


  return (
    <div>
      <h1>Web Developer Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Nome Completo</p>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
        <label>
          <p>Username</p>
          <input type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {userName.trim() && (
            <p style={{ color: isUsernameValid ? 'green' : 'red' }}>
              {isUsernameValid ? "Username valido" : "Deve avere almeno 6 caratteri alfanumerici"}
            </p>
          )}
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.trim() && (
            <p style={{ color: isPasswordValid ? 'green' : 'red' }}>
              {isPasswordValid ? "Password valida" : "Deve avere almeno 8 caratteri, una lettera, un numero, un simbolo"}
            </p>
          )}
        </label>
        <label>
          <p>Specializzazione</p>
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </label>
        <label>
          <p>Anni di esperienza</p>
          <input
            type="number"
            value={experienceYears}
            onChange={(e) => setExperienceYears(e.target.value)}
          />
        </label>
        <label>
          <p>Descrizione</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {description.trim() && (
            <p style={{ color: isDescriptionValid ? 'green' : 'red' }}>
              {isDescriptionValid ? "Descrizione valida" : `Deve avere tra 100 e 1000 caratteri (${description.trim().length})`}
            </p>
          )}
        </label>
        <button type="submit">Registrati</button>
      </form>
    </div>
  )
}

export default App