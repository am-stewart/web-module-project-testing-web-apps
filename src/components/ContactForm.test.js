import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const input = 'Sara';

    const firstname = screen.getByPlaceholderText('Edd');
    userEvent.type(firstname, input);    

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton)

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render (<ContactForm/>);
    
    const firstname = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstname, 'Allison');
    const lastname = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastname, 'Stewart');
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, 'allison@gmail');

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    const firstname = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstname, 'Allison');
    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, 'allison@gmail.com');
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const firstname = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstname, 'Allison');
    const lastname = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastname, 'Stewart');
    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, 'allison@gmail.com');
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    const firstNameSubmit = await screen.queryByText('Allison');
    const lastNameSubmit = await screen.queryByText('Stewart');
    const emailSubmit = await screen.queryByText('allison@gmail.com');
    const messageSubmit = await screen.queryByTestId('messageDisplay')

    expect(firstNameSubmit).toBeInTheDocument();
    expect(lastNameSubmit).toBeInTheDocument();
    expect(emailSubmit).toBeInTheDocument();
    expect(messageSubmit).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

    const firstname = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstname, 'Allison');
    const lastname = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastname, 'Stewart');
    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, 'allison@gmail.com');
    const message = screen.getByLabelText(/Message/i);
    userEvent.type(message, 'message goes here')
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    const firstNameSubmit = await screen.queryByText('Allison');
    const lastNameSubmit = await screen.queryByText('Stewart');
    const emailSubmit = await screen.queryByText('allison@gmail.com');
    const messageSubmit = await screen.queryByText('message goes here')

    expect(firstNameSubmit).toBeInTheDocument();
    expect(lastNameSubmit).toBeInTheDocument();
    expect(emailSubmit).toBeInTheDocument();
    expect(messageSubmit).toBeInTheDocument();
});