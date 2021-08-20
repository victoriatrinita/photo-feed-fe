import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Header from '../header';

afterEach(()=>{
    cleanup();
})

test('it should render header', ()=>{
    render(<BrowserRouter><Header/></BrowserRouter>);
    const headerElement = screen.getByTestId('header')
    expect(headerElement).toBeInTheDocument();
})
