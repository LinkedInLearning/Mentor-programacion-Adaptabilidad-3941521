import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Formulario from './Formulario';

describe('Formulario', () => {
    it('renderiza los elementos del formulario', () => {
        render(<Formulario />);

        expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument();
    });

    it('muestra errores de validación al enviar con campos vacíos', () => {
        render(<Formulario />);

        fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));

        expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument();
        expect(screen.getByText('El correo electrónico es obligatorio')).toBeInTheDocument();
        expect(screen.getByText('El mensaje es obligatorio')).toBeInTheDocument();
    });

    it('muestra error de validación de correo electrónico para correo inválido', () => {
        render(<Formulario />);

        fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'invalid-email' } });
        fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));

        expect(screen.getByText('El correo electrónico no es válido')).toBeInTheDocument();
    });

    it('envía el formulario con entradas válidas', () => {
        render(<Formulario />);

        fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Mensaje/i), { target: { value: 'Hello, this is a test message.' } });
        fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));

        expect(screen.queryByText('El nombre es obligatorio')).not.toBeInTheDocument();
        expect(screen.queryByText('El correo electrónico es obligatorio')).not.toBeInTheDocument();
        expect(screen.queryByText('El mensaje es obligatorio')).not.toBeInTheDocument();
        expect(screen.queryByText('El correo electrónico no es válido')).not.toBeInTheDocument();
    });
});

describe('validarCorreo', () => {
    it('devuelve mensaje de error cuando el correo está vacío', () => {
        render(<Formulario />);
        fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: '' } });
        fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));
        expect(screen.getByText('El correo electrónico es obligatorio')).toBeInTheDocument();
    });

    it('devuelve mensaje de error cuando el correo es inválido', () => {
        render(<Formulario />);
        fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'invalid-email' } });
        fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));
        expect(screen.getByText('El correo electrónico no es válido')).toBeInTheDocument();
    });

    it('no devuelve mensaje de error cuando el correo es válido', () => {
        render(<Formulario />);
        fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'valid.email@example.com' } });
        fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));
        expect(screen.queryByText('El correo electrónico es obligatorio')).not.toBeInTheDocument();
        expect(screen.queryByText('El correo electrónico no es válido')).not.toBeInTheDocument();
    });
});