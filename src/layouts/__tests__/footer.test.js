import { render, screen, cleanup } from '@testing-library/react';
import Footer from '../footer';

afterEach(()=>{
    cleanup();
})

test('it should render footer', ()=>{
    render(<Footer/>);
    const footerElement = screen.getByTestId('footer')
    expect(footerElement).toBeInTheDocument();
})
