import React from 'react';
import {getByTestId, getByText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{

    render(<ContactForm />)
});

test('renders the contact form header', ()=> {

    render(<ContactForm />)
    const h1 = screen.getByText('Contact Form')
    expect(h1).toBeDefined()
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    
    const name = 'Edd'
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, name)
    expect(firstNameInput).toHaveValue(name)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    
    const errorFirstName = 'Error: firstName must have at least 5 characters.'
    const errorLastName = 'Error: lastName is a required field.'
    const errorEmail = 'Error: email must be a valid email address.'
    render(<ContactForm />)
    const submitButton = screen.getByRole('button')
    userEvent.click(submitButton)
    expect(screen.getByText(errorFirstName)).toBeInTheDocument()
    expect(screen.getByText(errorLastName)).toBeInTheDocument()
    expect(screen.getByText(errorEmail)).toBeInTheDocument()
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    
    const firstName = 'Sinclair'
    const lastName = 'Hawkins'
    const errorEmail = 'Error: email must be a valid email address.'
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name*/i)
    const lastNameInput = screen.getByLabelText(/last name*/i)
    userEvent.type(firstNameInput, firstName)
    userEvent.type(lastNameInput, lastName)
    const submitButton = screen.getByRole('button')
    userEvent.click(submitButton) 
    expect(screen.getByText(errorEmail)).toBeInTheDocument()
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
    const email = 'notavalidemail.com'
    const errorEmail = 'Error: email must be a valid email address.'
    render(<ContactForm />)
    const emailInput = screen.getByLabelText(/email*/i)
    userEvent.type(emailInput, email)
    expect(screen.getByText(errorEmail)).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

    const firstName = 'Sinclair'
    const email = 'notavalidemail.com'
    const errorLastName = 'Error: lastName is a required field.'
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name*/i)
    const emailInput = screen.getByLabelText(/email*/i)
    const submitButton = screen.getByRole('button')
    userEvent.type(firstNameInput, firstName)
    userEvent.type(emailInput, email)
    userEvent.click(submitButton) 
    expect(screen.getByText(errorLastName)).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
    const firstName = 'Sinclair'
    const lastName = 'Hawkins'
    const email = 'avalidemail@gmail.com'
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name*/i)
    const lastNameInput = screen.getByLabelText(/last name*/i)
    const emailInput = screen.getByLabelText(/email*/i)
    const submitButton = screen.getByRole('button')
    userEvent.type(firstNameInput, firstName)
    userEvent.type(lastNameInput, lastName)
    userEvent.type(emailInput, email)
    expect(screen.queryByText(firstName)).toBeNull()
    expect(screen.queryByText(lastName)).toBeNull()
    expect(screen.queryByText(email)).toBeNull()
    userEvent.click(submitButton)
    expect(screen.getByText(firstName)).toBeInTheDocument()
    expect(screen.getByText(lastName)).toBeInTheDocument()
    expect(screen.getByText(email)).toBeInTheDocument()
});

test('renders all fields text when all fields are submitted.', async () => {
   
    const firstName = 'Sinclair'
    const lastName = 'Hawkins'
    const email = 'avalidemail@gmail.com'
    const message = 'messageDisplay'   
    const firstNameID = 'firstnameDisplay'
    const lastNameID = 'lastnameDisplay'
    const emailID = 'emailDisplay'
    const messageID = 'messageDisplay'
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name*/i)
    const lastNameInput = screen.getByLabelText(/last name*/i)
    const emailInput = screen.getByLabelText(/email*/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitButton = screen.getByRole('button')
    userEvent.type(firstNameInput, firstName)
    userEvent.type(lastNameInput, lastName)
    userEvent.type(emailInput, email)
    userEvent.type(messageInput, message)
    userEvent.click(submitButton)
    expect(screen.getByTestId(firstNameID)).toBeInTheDocument()
    expect(screen.getByTestId(lastNameID)).toBeInTheDocument()
    expect(screen.getByTestId(emailID)).toBeInTheDocument()
    expect(screen.getByTestId(messageID)).toBeInTheDocument()
});