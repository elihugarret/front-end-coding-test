import Layout from '../components/MyLayout.js'
import Search from '../components/Search'

import fetch from 'isomorphic-unfetch'
import React from 'react'

const clientId = 'eecd764f985f74def70a'
const clientSecret = 'e206b8c35bc154b78e3dfbdea6871fb97aff2bc3'

class Commits extends React.Component {
    static async getInitialProps({query}) {
        const res = await fetch(`https://api.github.com/repos/${query.owner}/${query.name}/commits?client_id=${clientId}&client_secret=${clientSecret}`)
        const data_commits = await res.json()
        console.log(`Show data fetched. Count: ${data_commits.length}`)
        return {
            query: query,
            commits: data_commits
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            owner: this.props.query.owner,
            name: this.props.query.name,
            commits: this.props.commits.slice(0, 20),
            input_value: ''
        }        
    }

    filter = (e) => {
        let filtered = this.props.commits.slice(0, 20).filter((el) => {
            return el.commit.message.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || el.commit.author.date.indexOf(e.target.value) !== -1
        })
        this.setState({
            input_value: e.target.value,
            commits: filtered
        })
    }

    render() {
        return (
            <Layout>    
                <h1>{this.state.name}</h1>
                <Search value={this.state.input_value} onChange={this.filter}/>                
                <ul>
                    {this.state.commits.map((comm) => (
                        <li key={comm.commit.url}>
                            <p><b>{comm.commit.author.name}</b></p>
                            <a href={comm.html_url} target="_blank" >{comm.commit.message}</a>
                            <p>{comm.commit.author.date}</p>
                            <img src={ comm.author == undefined ? '//i.imgur.com/ArRiBMs.png' : comm.author.avatar_url} style={{width: "20%"}}/>
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

export default Commits