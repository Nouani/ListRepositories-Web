import React, { Component } from 'react';
import api from '../../services/api';

// import { Container } from './styles';

export default class Repository extends Component {
    async componentDidMount() {
        const { match } = this.props;

        const repoName = decodeURIComponent(match.params.repository);

        const reponse = await api.get(`/repos/${repoName}`);
        const issues = await api.get(`/repos/${repoName}/issues`);
    }

    render() {
        return <h1>Repository</h1>;
    }
}
