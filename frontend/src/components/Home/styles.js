import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
`;

export const GraphContainer = styled.div `
    width: 80%;
    height: 95;
    display: flex;
`;

export const SidebarContainer = styled.div`
    width: 20%;
    height: 95vh;
    display: grid;
    background-color: whitesmoke;
    padding: 10px;
    li {
        width: 100%;
        padding: 10px;
        border: 1px solid white;
        cursor: pointer;
        transition: .3s;
        :hover {
            background-color: white;
            border: 1px solid black;
        }
    }
`;
