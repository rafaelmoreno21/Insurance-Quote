import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { primaryLetters } from '../helper';

const ContainerResume = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #FFF;
    margin-top: 1rem;
`;

const Resume = ({ data }) => {
    const { brand, year, plan } = data;
    if (brand === '' || year === '' || plan === '') return null
    return (
        <ContainerResume>
            <h2>Quote summary</h2>
            <ul>
                <li>Brand: {primaryLetters(brand)}</li>
                <li>Plan: {primaryLetters(plan)} </li>
                <li>Year of the car: {year} </li>
            </ul>
        </ContainerResume>
    );
}

Resume.propTypes = {
    data: PropTypes.object.isRequired
}

export default Resume;