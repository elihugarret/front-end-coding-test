import Layout from '../components/MyLayout'
import Search from '../components/Search'

import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import React from 'react'

const clientId = 'eecd764f985f74def70a'
const clientSecret = 'e206b8c35bc154b78e3dfbdea6871fb97aff2bc3'

class Index extends React.Component {
    static async getInitialProps({query}) {
        const res = await fetch(`https://api.github.com/users/reactjs/repos?client_id=${clientId}&client_secret=${clientSecret}`)
        const data = await res.json()
        return {
            repos: data
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            repos: this.props.repos,
            input_value: ''
        }
    }

    sortBy = (e) => {
        let types = {
            stars: 'stargazers_count',
            forks: 'forks_count',
            name: 'name'
        }
        let type = types[e.target.id]
        let sorted = this.props.repos.sort((a, b) => {
            if (a[type] > b[type]) return -1
            if (a[type] < b[type]) return 1
            return 0
        })
        this.setState({ repos: sorted })
    }

    filter = (e) => {
        let filtered = this.props.repos.filter((el) => {
            return el.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
        })
        this.setState({
            input_value: e.target.value,
            repos: filtered
        })
    }

    render() {
        return (
            <Layout>
                <h1>ReactJS Repositories</h1>
                <div>
                    <button id="stars" onClick={this.sortBy}>Sort By Stars</button>
                    <button id="forks" onClick={this.sortBy}>Sort By Forks</button>
                    <button id="name" onClick={this.sortBy}>Sort By Name</button>
                </div>
                <Search value={this.state.input_value} onChange={this.filter}/>
                <ul>
                    {this.state.repos.map((repo) => (
                        <li key={repo.name}>
                            <Link as={`/commits/${repo.owner.login}/${repo.name}`} 
                                  href={`/commits?owner=${repo.owner.login}&name=${repo.name}`}>
                                <a>{repo.name}</a>
                            </Link>
                            <p>{"Stars: " + repo.stargazers_count}</p>
                            <p>{"Forks: " + repo.forks_count}</p>                            
                        </li>
                    ))}
                </ul>
                <style jsx>{`
                    button {
                        margin-left: 2%;
                    }
                    li {
                        list-style-type:none;
                        border-bottom-style: solid;
                        margin-bottom: 2%;
                        background: aliceblue;
                    }
                    li:hover {
                        background: darkgrey;
                    }
                `}</style>
            </Layout>
        )
    }
}

export default Index