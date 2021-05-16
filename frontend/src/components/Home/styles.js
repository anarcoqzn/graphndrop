import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
`;

export const DashboardContainer = styled.div `
    width: 80%;
    height: 95vh;
    display: grid;
    grid-template-rows: 75% 25%;
`;

export const GraphContainer = styled.div`
    display: grid;
    justify-items: center;
    text-align: center;
    align-items: center;
    border: 1px solid black;
`;

export const OperationOverviewContainer = styled.div`
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    display: grid;
    padding: 10px;
    grid-template-columns: auto auto;
    grid-template-rows: 30px auto;
    background-color: #DCDCDC;
    label {
        font-size: 16px;
        font-weight:bold;
    }
    overflow-y:auto;
`;

export const OperationDetails = styled.div`
    grid-row: 2;
    grid-column:1;
    display: grid;
    width: fit-content;
`
export const SidebarContainer = styled.div`
    width: 20%;
    max-height: 95vh;
    display: grid;
    background-color: whitesmoke;
    padding: 10px;
    grid-template-rows: 100px auto;
    ul {
        list-style: none;
        li:not(:last-child) {
            margin-bottom: 5px;
        }
    }
`;

export const SideBarListItem = styled.li`
    width: 100%;
    padding: 10px;
    border: 1px solid white;
    cursor: pointer;
    transition: .3s;
    :hover{
        background-color: white;
        border: 1px solid black;
    }

    ${props=> props.selected ? "background-color: white;border: 1px solid black;" : null}
`;