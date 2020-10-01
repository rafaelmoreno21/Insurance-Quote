import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { getDifferentYear, calculateBrand, getPlan } from '../helper';
const Field = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;
const Label = styled.label`
    flex: 0 0 100px;
`;
const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;
const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;
    &:hover {
        background-color: #26C6DA;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width:100%;
    text-align: center;
    margin-bottom: 2rem;
`;

const Form = ({ saveResume, saveLoading }) => {

    const [data, saveData] = useState({
        brand: '',
        year: '',
        plan: ''
    });
    const [error, saveError] = useState(false);

    // extraer los valores del state
    const { brand, year, plan } = data;

    // Leer los datos del formulario y colocarlos en el state
    const getInformation = e => {
        saveData({
            ...data,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = e => {
        e.preventDefault();
        if (brand.trim() === '' || year.trim() === '' || plan.trim === '') {
            saveError(true);
            return;
        }
        saveError(false);

        let result = 2000;
        //get different year
        const different = getDifferentYear(year);

        result -= ((different * 3) * result / 100);


        result = calculateBrand(brand) * result;


        const incrementPlan = getPlan(plan);

        result = parseFloat(incrementPlan * result).toFixed(2);

        saveLoading(true);

        setTimeout(() => {
            saveLoading(false);

            saveResume({
                quote: Number(result),
                data
            })
        }, 3000)




    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            { error ? <Error>All fields are required</Error> : null}

            <Field>
                <Label>Brand</Label>
                <Select
                    name="brand"
                    value={brand}
                    onChange={getInformation}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="american">Americano</option>
                    <option value="european">Europeo</option>
                    <option value="asian">Asiatico</option>
                </Select>
            </Field>

            <Field>
                <Label>Year</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={getInformation}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Field>

            <Field>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basic"
                    checked={plan === "basic"}
                    onChange={getInformation}
                /> Basic

                <InputRadio
                    type="radio"
                    name="plan"
                    value="full"
                    checked={plan === "full"}
                    onChange={getInformation}
                /> Full
            </Field>

            <Boton type="submit">Quote</Boton>
        </form>

    );
}

Form.propTypes = {
    saveResume: PropTypes.func.isRequired,
    saveLoading: PropTypes.func.isRequired,
}

export default Form;