import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import queryString from 'query-string';



class Books extends Component {

  constructor(props){
    super(props);

    this.state = { books: [], selected: "", edit: [] };
  };

  componentDidMount() {
    this.loadJson();
  };

  loadJson = () => {

      var url = 'http://localhost:3010/books?subjects_like=' + this.props.subject;
      axios.get(url)
        .then( (response) => {
          var data = response.data;
          this.setState({ books: data });
        })
        .catch( (error) => {
          console.log(error);
        });

  };

  passId = (id) => {

    var edit =  this.state.books.filter(books => books.id === id)
    this.setState({books: this.state.books, selected: id, edit: edit})

  };

  changeEdit = (event) => {

    var path = event.target.getAttribute('path');
    var array = path.split(",");

    var value = event.target.value;
    var data = this.state.edit;


    if(array.length > 1)
    {
      if(array[0] == "bookshelves" || array[0] == "formats" || array[0] == "subjects"){

        data[0][array[0]][array[1]] = value
      }
      else{
        data[0][array[0]][0][array[1]] = value
      }

    }
    else
    {
        data[0][array[0]] = value
    }


  };

  post = (event) => {

      var post = this.state.edit;
      var alldata = this.state.books;

      for(var x = 0; post.length == x; x++)
      {
        if(alldata[x]["id"] == post[0]["id"])
        {
          alldata[x] = post[0]["id"]
        }
      }

  };

  render() {

    const listItems2 = this.state.books.filter((books => books.id === this.state.selected)).map((books) =>
      <div key="1">

        <form className="p-3">
          <hr />

          <div className="form-group">
            <label>ID :</label>
            <input type="text" className="form-control" defaultValue={books.id} path={["id"]} key={Math.random()} onKeyUp={this.changeEdit}  />
          </div>

          <hr />

          <label className="h4">authors :</label>
          <div className="form-row">
          {
              books.authors.map( d => (
                      Object.keys(d).map( (a, index) => (

                          <div className="col" key={index}>
                            <label>{a} :</label>
                            <input type="text" className="form-control" path={["authors", a] } defaultValue={d[a]} key={Math.random()} onKeyUp={this.changeEdit}  />
                          </div>

                      ))
              ))
          }
          </div>

          <hr />

          <label>bookshelves :</label>
          <div className="form-row">
          {
              books.bookshelves.map( (d, index) => (
                        <div className="col" key={index}>
                          <input type="text" className="form-control p-2" path={["bookshelves", index] } aria-describedby="inputGroup-sizing-default" defaultValue={d} key={Math.random()} onKeyUp={this.changeEdit}   />
                        </div>
              ))
          }
          </div>

          <hr />

          <div className="form-group">
            <label>download_count :</label>
            <input type="text" className="form-control" path={["download_count"] }  defaultValue={books.download_count} key={Math.random()} onKeyUp={this.changeEdit} />
          </div>

          <hr />

          <label className="h4">formats :</label>
          <div className="form-row">
          {
              Object.keys(books.formats).map( (d, index) => (
                    <div className="col-6" key={index}>
                      <label>{d}</label>
                      <input type="text" className="form-control" path={["formats", d] } defaultValue={books.formats[d]} key={Math.random()} onKeyUp={this.changeEdit}  />
                    </div>
              ))

          }
          </div>

          <hr />

          <div className="form-group">
            <label>languages :</label>
            <input type="text" className="form-control" path={["languages"] } defaultValue={books.languages} key={Math.random()} onKeyUp={this.changeEdit}  />
          </div>

          <hr />

          <div className="form-group">
            <label>media_type :</label>
            <input type="text" className="form-control" path={["media_type"] } defaultValue={books.media_type} key={Math.random()} onKeyUp={this.changeEdit}  />
          </div>

          <hr />

          <label>subjects :</label>
          <div className="form-row">
          {
              books.subjects.map( (d, index) => (
                      <div className="col" key={index}>
                          <input type="text" className="form-control p-2" path={["subjects", index] }  aria-describedby="inputGroup-sizing-default" defaultValue={d} key={Math.random()} onKeyUp={this.changeEdit} />
                      </div>
              ))
          }
          </div>

          <hr />

          <div className="form-group">
            <label>title :</label>
            <input type="text" className="form-control" path={["title"] } defaultValue={books.title} key={Math.random()} onKeyUp={this.changeEdit}  />
          </div>


          <center><div onClick={this.post} className="btn btn-dark">Submit</div></center>
        </form>

      </div>
    );


    const listItems = this.state.books.map((books) =>

        <li className="p-1 h5 bg-dark rounded text-white" key={books.id} onClick={this.passId.bind(this, books.id)}>{books.title} </li>

    );

    return (
      <div>
        <div> </div>
        <div className="p-3 list">
          {listItems}
        </div>
        {this.state.selected ? listItems2 : null}
      </div>
    );
  }
}

export default Books;
