import React, { Component } from "react";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import Loading from "./Loading";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAuthor: {},
      filteredAuthors: [],
      authors: [],
      loading: false
    };
    this.selectAuthor = this.selectAuthor.bind(this);
    this.unselectAuthor = this.unselectAuthor.bind(this);
    this.filterAuthors = this.filterAuthors.bind(this);
  }
  componentDidMount() {
    axios
      .get("https://the-index-api.herokuapp.com/api/authors/")
      .then(response => response.data)
      .then(authors => this.setState({ authors: authors, loading: true }))
      .catch(error => console.error(error));
  }
  selectAuthor(author) {
    console.log(author);
    axios
      .get(`https://the-index-api.herokuapp.com/api/authors/${author.id}/`)
      .then(response => response.data)
      .then(author => this.setState({ currentAuthor: author, loading: true }))
      .catch(error => console.error(error));
  }

  unselectAuthor() {
    this.setState({ currentAuthor: {} });
  }

  filterAuthors(query) {
    query = query.toLowerCase();
    let filteredAuthors = this.state.authors.filter(author => {
      return `${author.first_name} ${author.last_name}`.includes(query);
    });
    this.setState({ filteredAuthors: filteredAuthors });
  }

  getContentView() {
    if (this.state.loading) {
      if (this.state.currentAuthor.first_name) {
        return <AuthorDetail author={this.state.currentAuthor} />;
      } else if (this.state.filteredAuthors[0]) {
        return (
          <AuthorsList
            authors={this.state.filteredAuthors}
            selectAuthor={this.selectAuthor}
          />
        );
      } else {
        return (
          <AuthorsList
            authors={this.state.authors}
            selectAuthor={this.selectAuthor}
          />
        );
      }
    } else {
      return <Loading />;
    }
  }

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">
            <SearchBar filterAuthors={this.filterAuthors} />
            {this.getContentView()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
