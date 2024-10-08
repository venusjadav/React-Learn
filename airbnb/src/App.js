import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Card from "./components/Card";
import data from "./data";

function App() {
    // Array of the card
    const cards = data.map((item) => {
        // return <Card key={item.id} item={item} />;
        // watch video project spread object as props
        return <Card key={item.id} {...item} />;
    });
    return (
        <div className="App">
            <Navbar />
            <Hero />
            <section className="cards-list">{cards}</section>
        </div>
    );
}

export default App;
