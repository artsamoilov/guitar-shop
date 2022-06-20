import './loader.css';

function Loader(): JSX.Element {
  return (
    <div className="loader">
      <div className="loader-element" />
      <div className="loader-element" />
      <div className="loader-element" />
      <p className="visually-hidden">Загрузка...</p>
    </div>
  );
}

export default Loader;
