import React, { Component } from "react";
import BookRow from "./BookRow";

class AuthorDetail extends Component {
  render() {
    let author = this.props.author;
    console.log("Author: ", author);

    let books = author.books.map(book => (
      <BookRow book={book} key={book.title} author={author} />
    ));

    return (
      <div className="author col-xs-10">
        <div>
          <h3>
            {author.first_name} {author.last_name}
          </h3>
          <img
            src={author.imageUrl}
            className="img-thumbnail"
            alt="Author Image"
          />
        </div>
        <table className="mt-3 table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Authors</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>{books}</tbody>
        </table>
      </div>
    );
  }
}

export default AuthorDetail;
