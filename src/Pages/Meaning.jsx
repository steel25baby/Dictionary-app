function Meaning({ partOfSpeech, definitions }) {
  return (
    <div className="Meaning">
      <h3 className="partOfSpeechMeaning">{partOfSpeech}</h3>
      <ul>
        {definitions &&
          definitions.map((current, i) => (
            <li key={i}>{current.definition}</li>
          ))}
      </ul>
    </div>
  );
}

export default Meaning;
