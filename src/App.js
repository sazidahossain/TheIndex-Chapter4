import React, { Component } from "react";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      filteredAuthors: [],
      loading: true,
      currentAuthor: {}
    };

    this.selectAuthor = this.selectAuthor.bind(this);
    this.unselectAuthor = this.unselectAuthor.bind(this);
    this.filterAuthors = this.filterAuthors.bind(this);
  }

  componentDidMount() {
    instance
      .get("/api/authors/")
      .then(res => res.data)
      .then(authors =>
        this.setState({
          authors: authors,
          filteredAuthors: authors,
          loading: false
        })
      )
      .catch(err => console.error(err));
  }

  selectAuthor(authorID) {
    this.setState({ loading: true });
    instance
      .get(`/api/authors/${authorID}/`)
      .then(res => res.data)
      .then(author =>
        this.setState({
          currentAuthor: author,
          loading: false
        })
      )
      .catch(err => console.error(err));
  }

  unselectAuthor() {
    const filteredAuthors = this.state.authors;
    this.setState({
      currentAuthor: {},
      filteredAuthors: filteredAuthors
    });
  }

  filterAuthors(query) {
    query = query.toLowerCase();
    let filteredAuthors = this.state.authors.filter(author => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query);
    });
    this.setState({ filteredAuthors: filteredAuthors });
  }

  getContentView() {
    if (this.state.loading) {
      return <Loading />;
    } else if (this.state.currentAuthor.id) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorsList
          authors={this.state.filteredAuthors}
          selectAuthor={this.selectAuthor}
          filterAuthors={this.filterAuthors}
        />
      );
    }
  }

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
