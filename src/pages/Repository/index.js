import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import api from '../../services/api';

import Container from '../../components/Container';
import {
    Loading,
    Owner,
    IssueList,
    FilterOptions,
    GroupButton,
    ButtonPage,
} from './styles';

export default class Repository extends Component {
    propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            }),
        }).isRequired,
    };

    state = {
        repository: {},
        issues: [],
        loading: true,
        filter: 'all',
        repoName: '',
        page: 1,
        numberPages: 10,
    };

    async componentDidMount() {
        const { match } = this.props;

        const repoName = decodeURIComponent(match.params.repository);

        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: 'all',
                    per_page: 5,
                },
            }),
        ]);

        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: false,
            repoName,
        });
    }

    loadIssues = async () => {
        this.setState({ loadingIssue: true });

        const { filter, repoName, page } = this.state;

        const response = await api.get(`/repos/${repoName}/issues`, {
            params: {
                state: filter,
                per_page: 5,
                page,
            },
        });

        this.setState({ issues: response.data, loadingIssue: false });
    };

    handleChangeOption = async e => {
        await this.setState({ filter: e.target.value });
        this.loadIssues();
    };

    handleChangeFilter = async signal => {
        const { page } = this.state;

        await this.setState({
            page: signal === '-' ? page - 1 : page + 1,
        });

        this.loadIssues();
    };

    render() {
        const { repository, issues, loading, page, numberPages } = this.state;

        if (loading) {
            return <Loading>Carregando...</Loading>;
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar aos Repositórios</Link>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>

                <IssueList>
                    <FilterOptions>
                        <h4>Filtrar por:</h4>
                        <select
                            name="example"
                            onChange={this.handleChangeOption}
                        >
                            <option value="all">Todas</option>
                            <option value="open">Abertas</option>
                            <option value="closed">Fechadas</option>
                        </select>
                    </FilterOptions>

                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img
                                src={issue.user.avatar_url}
                                alt={issue.user.login}
                            />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>
                                            {label.name}
                                        </span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}

                    <GroupButton>
                        <ButtonPage
                            type="text"
                            onClick={() => this.handleChangeFilter('-')}
                            desabilitar={page === 1}
                        >
                            <FaArrowLeft color="#eee" />
                        </ButtonPage>
                        <ButtonPage
                            type="text"
                            onClick={() => this.handleChangeFilter('+')}
                            desabilitar={page === numberPages}
                        >
                            <FaArrowRight color="#eee" />
                        </ButtonPage>
                    </GroupButton>
                </IssueList>
            </Container>
        );
    }
}
