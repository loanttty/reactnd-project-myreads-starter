import React, { Component } from 'react';
import PropTypes from "prop-types"
import {update, getAll} from './BooksAPI';

class Book extends Component {

	static PropTypes = {
		book: PropTypes.object.isRequired
	}

	state ={
		shelfChanged: '',
		shelfedBooks: []
	}

	updateShelf = event => {
		/**
		 * *One way is to pass shelf instead of this.state.shelf.
		 * *Another way is to use the second parameter of the setState function. 
		 * *The second parameter is a function that will be called after the state has updated
		 */
		const shelfChanged = event.target.value
		this.setState({shelfChanged}, () => {
			update(this.props.book,this.state.shelfChanged).then( () => {
				getAll().then(shelfedBooks => 
					this.setState({shelfedBooks}, () => this.props.addBookToShelf(this.state.shelfedBooks))
				)
			});
		})
	}
	
	render() {
		const {book} = this.props
		const booksOnShelfDefaultValue = (
			<select onChange={this.updateShelf} defaultValue={book.shelf}>
				<option value="move" disabled>Move to...</option>
				<option value="currentlyReading">Currently Reading</option>
				<option value="wantToRead">Want to Read</option>
				<option value="read">Read</option>
				<option value="none">None</option>
			</select>
		)
		const booksOnSearchDefaultValue = (
			<select onChange={this.updateShelf} defaultValue="none">
				<option value="move" disabled>Move to...</option>
				<option value="currentlyReading">Currently Reading</option>
				<option value="wantToRead">Want to Read</option>
				<option value="read">Read</option>
				<option value="none">None</option>
			</select>
		)
		let thumnail = (
			<div className="book-cover" style={{ width: 128, height: 192}}>Image Not Available</div>
			)
		if (book.imageLinks !== undefined) {
			thumnail = (
				<div className="book-cover" style={{ width: 128, height: 192, backgroundImage: "url("+book.imageLinks.thumbnail+")"}}></div>
			)
		}
		return (
			<div>
				<li key={book.id}>
						<div className="book">
							<div className="book-top">
								{thumnail}
								<div className="book-shelf-changer">
									{book.shelf !== undefined ? booksOnShelfDefaultValue : booksOnSearchDefaultValue}
								</div>
							</div>
							<div className="book-title">{book.title}</div>
							<div className="book-authors">{book.authors && book.authors.join(', ')}</div>
						</div>
					</li>			
			</div>
		)
	}
}

export default Book