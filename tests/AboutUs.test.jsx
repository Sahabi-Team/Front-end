import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TeamPage from '../src/pages/AboutUs.jsx';
import '@testing-library/jest-dom';



vi.mock('../src/components/home/NavbarCard.jsx', () => ({
  __esModule: true,
  default: () => <div data-testid="navbar">Navbar Mock</div>
}));

vi.mock('../src/components/Footer.jsx', () => ({
  __esModule: true,
  default: () => <div data-testid="footer">Footer Mock</div>
}));


describe('TeamPage', () => {
  it('should render navbar and footer', () => {
    render(<TeamPage />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should render the main title', () => {
    render(<TeamPage />);
    expect(screen.getByText('درباره ما')).toBeInTheDocument();
  });

  it('should render all team members', () => {
    render(<TeamPage />);
    
    const teamMembers = [
      'محمد شرف بیانی',
      'نازنین شریفی',
      'معین خان محمدی',
      'علی کارگر',
      'ایمان قادر',
      'حبیب الله پنبه چی'
    ];
    
    teamMembers.forEach(member => {
      expect(screen.getByText(member)).toBeInTheDocument();
    });
  });

  it('should render team member roles correctly', () => {
    render(<TeamPage />);
    
   
    const frontendMembers = screen.getAllByText('عضو تیم فرانت اند');
    const backendMembers = screen.getAllByText('عضو تیم بک اند');
    
    expect(frontendMembers.length).toBe(4);
    expect(backendMembers.length).toBe(2);
  });

  it('should render "Who we are" section', () => {
    render(<TeamPage />);
    expect(screen.getByText('ما کی هستیم؟')).toBeInTheDocument();
    expect(screen.getByText(/ما یک تیم ۶ نفره‌ از جوان‌های پرانرژی/)).toBeInTheDocument();
  });

  it('should render "Our goals" section with all items', () => {
    render(<TeamPage />);
    expect(screen.getByText('هدف ما چیه؟')).toBeInTheDocument();
    
    const goals = [
      'ساده‌سازی دسترسی به مربیان حرفه‌ای',
      'ارائه برنامه‌های تمرینی کاملاً شخصی‌سازی‌شده',
      'ایجاد فضایی قابل اعتماد و حرفه‌ای',
      'پیشرفت مداوم پلتفرم'
    ];
    
    goals.forEach(goal => {
      expect(screen.getByText(goal)).toBeInTheDocument();
    });
  });

});