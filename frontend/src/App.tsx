import {ThemeProvider} from "@/providers/theme-provider.tsx";
import HousePayRouteProvider from "@/providers/house-pay-route-provider.tsx";

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="housepay-ui-theme">
            <HousePayRouteProvider/>
        </ThemeProvider>
    );
}

export default App;
