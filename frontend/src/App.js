import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./pages/notFound";
import Places from "./pages/places";
import Place from "./pages/place";
import AddPlace from "./pages/addPlace";
import EditPlace from "./pages/editPlace";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route exact path="/places" element={<Places/>}/>
            <Route path="/places/:id" element={<Place/>} />
            <Route path="/add-place" element={<AddPlace/>} />
            <Route path="/edit-place/:id" element={<EditPlace/>} />
            <Route path="/not-found" element={<NotFound/>} />
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default App;
