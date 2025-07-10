import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import SummarizerForm from '../src/components/CustomForm'


describe('SummarizerForm', () => {
  it('renders a textarea, textInput and a button', () => {
    render(<SummarizerForm />);

    expect(screen.getByPlaceholderText(/Enter text to summarize/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter length of summary/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Summarize/i })).toBeInTheDocument();

  });

  it('calls the summarize API on submit', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ summary: 'Shortened summary' }),
      })
    ) as jest.Mock;

    render(<SummarizerForm />);

    fireEvent.change(screen.getByPlaceholderText(/Enter text to summarize/i), {
      target: { value: 'Some long input text here...' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter length of summary/i), {
      target: { value: 'Some number input here...' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Summarize/i }));

    expect(await screen.findByText(/Summary:/i)).toBeInTheDocument();
  });
});