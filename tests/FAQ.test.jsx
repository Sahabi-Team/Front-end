import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FAQPage from '../src/pages/FAQ.jsx';
import '@testing-library/jest-dom';


vi.mock('../src/components/home/NavbarCard.jsx', () => ({
  __esModule: true,
  default: () => <div data-testid="navbar">Navbar Mock</div>
}));

vi.mock('../src/components/Footer.jsx', () => ({
  __esModule: true,
  default: () => <div data-testid="footer">Footer Mock</div>
}));

vi.mock('../src/components/FAQ/Accordion.jsx', () => ({
  __esModule: true,
  default: ({ question }) => <div data-testid="accordion-item">{question}</div>
}));


vi.mock('../src/assets/imgs/FAQ.png', () => ({
  __esModule: true,
  default: 'test-image-url'
}));

describe('FAQPage', () => {
  it('should render all main components', () => {
    render(<FAQPage />);
    
   
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    
    
    const image = screen.getByAltText('FAQ_Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image-url');
    
    
    expect(screen.getByText('سوالی داری؟')).toBeInTheDocument();
  });

  it('should render all FAQ items', () => {
    render(<FAQPage />);
    
   
    const questions = [
      "برای انجام تمرین‌های ورزشی حتما باید باشگاه برم؟",
      "اگه حرکتی رو بلد نبودم چیکار کنم؟",
      "توی چندوقت میتونم به وزن ایده آلم برسم؟",
      "برای انجام حرکات ورزشی به چه وسایلی نیاز دارم؟",
      "آیا میتونم خودم مربی ورزشیمو انتخاب کنم؟",
      "همزمان چندتا برنامه ورزشی میتونم داشته باشم؟",
      "اگه از مربیم ناراضی بودم چی؟",
      "کمر و زانوهام درد می‌کنه، می‌تونم از این برنامه استفاده کنم؟",
      "چطوری می‌تونم از مربیان ورزشی مشاوره بگیرم؟"
    ];
    
    questions.forEach(question => {
      expect(screen.getByText(question)).toBeInTheDocument();
    });
    
   
    const accordionItems = screen.getAllByTestId('accordion-item');
    expect(accordionItems.length).toBe(9);
  });
});