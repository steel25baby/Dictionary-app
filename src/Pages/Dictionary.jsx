import { useState } from "react";
import Meaning from "./Meaning";

function Dictionary() {
  const [word, setword] = useState("Dictionary");
  const [wordmeaning, setwordmeaning] = useState(null);
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

  const handleword = (ev) => {
    setword(ev.target.value);
  };

  const handleSearchword = async (ev) => {
    ev.preventDefault();
    setwordmeaning(null);
    seterror(null);

    try{
        setloading(true);
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        // console.log(response)
        if(response.ok===true){
            const data = await response.json()
            console.log(data)
            setwordmeaning(data[0].meanings)
            setloading(false)
        }
        else{
       seterror(`couldn't find the meaning of the word)  '${word}'`)
       setloading(false)
        }
    }
    catch(error){
        seterror(`There was an error with getting the meaning of the word '${word}' please check the internet conection or try again later`)
        setloading(false)
    }
  };

  return (
    <div>
      <h1>Advanced Dictionary</h1>
      <input
        type="text"
        placeholder="Type an English name"
        onChange={handleword}
      />
      <button onClick={handleSearchword}>Search {`${word}`}</button>

      <div className="meaning">
        {
            error && <h2>{error}</h2>
        }
        {
            loading && <h2>Loading please wait...</h2>
        }
        {
            wordmeaning && wordmeaning.map((current,i) => <Meaning partOfSpeech={current.partOfSpeech} definitions={current.definitions} key={i}/>)
        }
      </div>
    </div>
  );
}

export default Dictionary;
