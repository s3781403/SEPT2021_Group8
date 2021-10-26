import {BrowserRouter, Switch, Route} from "react-router-dom";
import HomePage from "./ui/pages/HomePage";
import BookDetail from "./ui/pages/BookDetail";
import AdminDashboard from "./ui/pages/AdminDashboard";
import AppHeader from "./ui/components/AppHeader";
import {AppContext, AppProvider} from "./context/AppContext";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {useContext} from "react";
import LoadingBar from "./ui/components/LoadingBar";
import LoginPage from "./ui/pages/LoginPage";
import RegistrationPage from "./ui/pages/Registration";
import ShoppingCart from "./ui/pages/ShoppingCart";
import AddEditBook from "./ui/components/AdminDashboardComp/AddEditBook";
import OrderHistory from "./ui/pages/OrderHistory";
import OrderSuccess from "./ui/pages/OrderSuccess";

const appTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#220f48',
        },
        secondary: {
            main: '#f50057',
        },
    },
    spacing: 8,
});

function App() {

    return (
        <AppProvider>
            <ThemeProvider theme={appTheme}>
                <div>
                    {/*  Header */}
                    <LoadingBar/>

                    {/*  TopBar (Logo + Search)*/}
                    {/*  Login, Cart, Menu */}

                    {/*  Page content (Changes based on path) */}
                    <BrowserRouter>
                        <AppHeader/>
                        <Switch>

                            <Route path={"/"} exact={true} component={HomePage}/>
                            <Route path={"/book/:bookid"} exact={true} component={BookDetail}/>
                            <Route path={"/admin"} exact={true} component={AdminDashboard}/>
                            <Route path={"/login"}  component={LoginPage}/>
                            <Route path={"/register"} exact={true} component={RegistrationPage}/>
                            <Route path={"/cart"} exact={true} component={ShoppingCart}/>
                            <Route path={"/admin/book/add"} exact={true} component={AddEditBook}/>
                            <Route path={"/admin/book/edit/:bookid"} exact={true} component={AddEditBook }/>
                            <Route path={"/orderhistory"} exact={true} component={OrderHistory }/>
                            <Route path={"/ordersuccess"} exact={true} component={OrderSuccess }/>

                        </Switch>
                    </BrowserRouter>

                    {/*  Footer */}
                </div>
            </ThemeProvider>
        </AppProvider>
    );
}

export default App;
