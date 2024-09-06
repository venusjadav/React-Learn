import Navbar from "./components/Navbar";
import Visited from "./components/visit-places";
import data from "./data";

function App() {
    const places = data.map((item) => {
        return <Visited {...item} />;
    });

    return (
        <div className="App">
            <Navbar />
            <section className="card-list">{places}</section>
        </div>
    );
}

export default App;
