// Footer.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../src/components/Footer';
import '@testing-library/jest-dom';
describe('Footer Component', () => {
  it('renders the main heading', () => {
    render(<Footer />);
    expect(screen.getByText(/وقت یه شروع جدیده/i)).toBeInTheDocument();
  });

  it('renders address and phone number', () => {
    render(<Footer />);
    expect(screen.getByText(/نشانی: دانشگاه علم و صنعت/i)).toBeInTheDocument();
    expect(screen.getByText(/021-12345678/i)).toBeInTheDocument();
  });

  it('should render all social media icons', () => {
    render(<Footer />);
    
    const icons = ['TelegramIcon', 'TwitterIcon', 'LinkedInIcon', 'InstagramIcon'];
    icons.forEach(icon => {
      expect(screen.getByTestId(icon)).toBeInTheDocument();
    });
  });
  
  it('renders links to about us, faq, and contact us', () => {
    render(<Footer />);
    expect(screen.getByText(/درباره ما/i)).toBeInTheDocument();
    expect(screen.getByText(/سوالات متداول/i)).toBeInTheDocument();
    expect(screen.getByText(/ارتباط با ما/i)).toBeInTheDocument();
  });

  it('renders the logo image', () => {
    render(<Footer />);
    const image = screen.getByAltText(/logo/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });

  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/کلیه حقوق این سایت متعلق به مجموعه سحابی می‌باشد/i)).toBeInTheDocument();
  });
});