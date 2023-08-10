import styled from 'styled-components';

export const BodyWrapper = styled.div`
`;


export const InfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    background-color: #444;

    margin: 10px;
    border-radius: 10px;
    border: 1px solid #1e1e1e;
    padding-bottom: 10px;
`
export const Column = styled.div`
    display: inline-flex;
    flex-direction: column;
    width: 49%;
`

export const HeaderWrapper = styled.div`
    background-color: #1e1e1e;
    /* display: block; */
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 5%;
    padding-right: 5%;
    align-items: center;
    padding-top: 20px;
`

export const InfoWrapperVertical = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: #43587a;

    margin: 10px;
    border-radius: 10px;
    border: 1px solid #1e1e1e;
    padding-bottom: 10px;
    text-align: left;
    padding-left: 20px;
    padding: 30px;
    padding-right: 60px;
    width: fit-content;
`

export const FooterWrapper = styled.div`
    height: 80px;
    display: flex;
    flex-direction:row-reverse;
    /* justify-content: space-around; */
    align-items: center;
    padding-right: 30px;
    font-weight: 600;
    font-style: italic;

`
