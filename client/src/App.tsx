import { RouterProvider } from "react-router-dom";
import { routers } from "./routes";

function App() {
    // test commit
    return (
        <div>
            <RouterProvider router={routers} />
        </div>
    );
}

export default App;
