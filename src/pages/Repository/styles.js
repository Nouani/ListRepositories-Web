import styled from 'styled-components';

export const Loading = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        color: #7159c1;
        font-size: 16px;
        text-decoration: none;
    }

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }
`;

export const IssueList = styled.ul`
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;

        & + li {
            margin-top: 10px;
        }

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #eee;
        }

        div {
            flex: 1;
            margin-left: 15px;

            strong {
                font-size: 16px;

                a {
                    text-decoration: none;
                    color: #333;

                    &:hover {
                        color: #7159c1;
                    }
                }

                span {
                    background: #eee;
                    color: #333;
                    border-radius: 3px;
                    font-size: 12px;
                    font-weight: 600;
                    height: 20px;
                    padding: 3px 4px;
                    margin-left: 10px;
                }
            }

            p {
                margin-top: 5px;
                font-size: 12px;
                color: #999;
            }
        }
    }
`;

export const FilterOptions = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;

    h4 {
        margin-right: 5px;
    }
`;

export const GroupButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
`;

export const ButtonPage = styled.button`
    border-style: none;
    background: #333333;
    padding: 5px 15px;
    border-radius: 5px 0 0 5px;
    transition: background 0.2s;

    & + button {
        border-radius: 0 5px 5px 0;
        margin-left: 2px;
    }

    &:hover {
        background: #7159c1;
        color: #fff;
    }

    svg {
        display: flex;
        align-items: center;
    }
`;
