import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
        getFailed: false,
    };

    componentDidMount() {
        const repositories = localStorage.getItem('repositories');

        if (repositories) {
            this.setState({ repositories: JSON.parse(repositories) });
        }
    }

    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;

        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    handleInputChange = e => {
        if (e.target.value === '') {
            this.setState({ getFailed: false });
        }

        this.setState({ newRepo: e.target.value });
    };

    handleSubmit = async e => {
        try {
            e.preventDefault();

            this.setState({ loading: true });

            const { newRepo, repositories } = this.state;

            repositories.map(data => {
                if (data.name === newRepo) {
                    throw new Error('Repositório duplicado');
                }
            });

            const response = await api.get(`/repos/${newRepo}`);

            const data = {
                name: response.data.full_name,
            };

            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
                loading: false,
                getFailed: false,
            });
        } catch (err) {
            this.setState({ getFailed: true, loading: false });
        }
    };

    render() {
        const { newRepo, loading, repositories, getFailed } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit} getFailed={getFailed}>
                    <input
                        type="text"
                        placeholder="Adicionar repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />
                    <SubmitButton loading={loading}>
                        {loading ? (
                            <FaSpinner color="#FFF" size={14} />
                        ) : (
                            <FaPlus color="#FFF" size={14} />
                        )}
                    </SubmitButton>
                </Form>
                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    repository.name
                                )}`}
                            >
                                Detalhes
                            </Link>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}
