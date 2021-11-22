import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
 
import ListSwitch from './ListSwitch';
 
describe('List Switch', () => {
  test('displays a label given as a child', () => {
    const label = 'Include in shopping list';

    render(<ListSwitch list="shoppingList" handleChange={jest.fn} children={label}/>);

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  test('is toggled when clicked', () => {
    render(<ListSwitch list="shoppingList" handleChange={jest.fn} children={'Include in shopping list'}/>);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();

    userEvent.click(screen.getByRole('checkbox'));
    expect(checkbox).not.toBeChecked();
  });

  test('calls an event handler given as a prop when toggled', () => {
    const eventHandler = jest.fn();

    render(<ListSwitch list="shoppingList" handleChange={eventHandler} children={'Include in shopping list'}/>);
    userEvent.click(screen.getByRole('checkbox'));

    expect(eventHandler).toHaveBeenCalledTimes(1);
  });
});