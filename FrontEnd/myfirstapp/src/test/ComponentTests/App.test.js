import React from 'react';
import { render,screen } from '@testing-library/react';
import BookCardMaterial from "../../ui/components/BookCardMaterial";
import {NotLoggedIn} from "../../ui/pages/LoginPage";
import {BrowserRouter} from "react-router-dom";
import AdminBookCard from "../../ui/pages/AdminBookCard";
import AdminDashboard from "../../ui/pages/AdminDashboard";
import OrderHistory from "../../ui/pages/OrderHistory";
import ShoppingCart from "../../ui/pages/ShoppingCart";
import PayPal from "../../ui/pages/PayPal";
import AddEditBook from "../../ui/components/AdminDashboardComp/AddEditBook";
import RegistrationPage from "../../ui/pages/Registration";
import HomePage from "../../ui/pages/HomePage";

const book={"id": 26,
    "isbn": 5124567891123,
    "title": "Atomic Habits",
    "category": "Non-Fiction",
    "author": "James Clear",
    "publisher": "Penguin",
    "price": 20.5,
    "type": "physical",
    "quality": 0,
    "stock": 5,
    "sellerID": 2012294,
    "imageURL": "http://sept-group-8-images.s3-ap-southeast-2.amazonaws.com/1632145201351-1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg",
    "create_At": "2021-09-24T02:39:00.355+00:00",
    "update_At": null}

describe('In the book cards of the home page, the book title is shown', () => {
    test('renders BookCardMaterial component', () => {
        render(<BookCardMaterial book={book} />);
        const linkElement = screen.getByText(/Atomic Habits/i);
        expect(linkElement).toBeInTheDocument();
    });
});

describe('In the Login page, Sign In is shown', () => {
    test('renders login component', () => {
        render( <BrowserRouter ><NotLoggedIn/></BrowserRouter>);
        const linkElement = screen.getAllByText("Sign In");
        expect(linkElement.length).toBeGreaterThan(0);
    });
});

describe('For the admin page, the book title is shown', () => {
    test('renders AdminBookCard component', () => {
        render(<AdminBookCard book={book} />);
        const linkElement = screen.getByText(/Atomic Habits/i);
        expect(linkElement).toBeInTheDocument();
    });
});

describe('For the admin page, the book price is shown', () => {
    test('renders AdminBookCard component', () => {
        render(<AdminBookCard book={book} />);
        const linkElement = screen.getByText(/20.5/i);
        expect(linkElement).toBeInTheDocument();
    });
});


describe('For the Admin Page,in the bottom navigation Users is shown', () => {
    test('renders AdminDashboard component', () => {
        render(<AdminDashboard/>);
        const linkElement = screen.getAllByText("Users")
        expect(linkElement.length).toBeLessThanOrEqual(5)
    });
});
describe('For the Admin Page,in the bottom navigation Transactions button is shown', () => {
    test('renders AdminDashboard component', () => {
        render(<AdminDashboard/>);
        const linkElement = screen.getAllByText("Orders")
        expect(linkElement.length).toBeLessThanOrEqual(5)
    });
});

describe('For the Admin Page,in the Role requests button is shown', () => {
    test('renders AdminDashboard component', () => {
        render(<AdminDashboard/>);
        const linkElement = screen.getAllByText("Role Requests")
        expect(linkElement.length).toBeLessThanOrEqual(5)
    });
});

describe('For the Order history page, the order history button is shown', () => {
    test('renders OrderHistory component', () => {
        render(<OrderHistory/>);
        const linkElement = screen.getAllByText("Order history")
        expect(linkElement.length).toBeLessThanOrEqual(5)
    });
});

describe('For the shopping cart page, the Cart Summary is shown', () => {
    test('renders Shopping Cart component', () => {
        render(<ShoppingCart/>);
        const linkElement = screen.getByText("Cart Summary");
        expect(linkElement).toBeInTheDocument();
    });
});

describe('For the shopping cart page, the checkout button is shown', () => {
    test('renders Shopping Cart component', () => {
        render(<ShoppingCart/>);
        const linkElement = screen.getByText("Checkout");
        expect(linkElement).toBeInTheDocument();
    });
});

describe('For the registration page, the register button is shown', () => {
    test('renders Registration component', () => {
        render(<RegistrationPage/>);
        const linkElement = screen.getByText("Register");
        expect(linkElement).toBeInTheDocument();
    });
});







