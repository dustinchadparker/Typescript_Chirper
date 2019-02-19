import React from "react";
import { Link } from "react-router-dom";

export default class List extends React.Component<IListProps, IListState> {
  constructor(props: IListProps) {
    super(props);
  }

  getData = () => {
    return (
      <div className="chirping-container">
      
        {$.ajax({
          method: "GET",
          url: "http://localhost:3000/api/chirps/",
          dataType: "json",
          success: function(res) {
            $.each(res, (idNum: number, obj) => {
              if (obj.text) {
                $(".chirping-container").append(
                  `<div class="chirp border media-body border-primary" id="${idNum}"><h4 class="media-heading name">${
                    obj.name
                  }: </h4><p> ${obj.text}</p></div>`
                );

                $(`#${idNum}`).append(
                  `<button class="btn btn-outline-success" id="editor" type="button" onclick="editChirp(${idNum})">Edit</button>`
                );
                $(`#${idNum}`).append(
                  `<button class="btn btn-outline-danger" id="delete" type="button" onclick="deleteChirp(${idNum})">X<span class="deletetooltip">Delete</span></button>`
                );
              }
            });
          }
        })}
      </div>
    );
  }

  submitChirp() {
    let value = $("#create-chirp").val();
    let valueName = $("#create-name").val();
    let text = { name: valueName, text: value };

    $.ajax({
      method: "POST",
      url: "http://localhost:3000/api/chirps/",
      data: JSON.stringify(text),
      contentType: "application/json; charset=utf-8"
    });

    $("#create-chirp").val("");

    location.reload();
    this.getData();
  }

  render() {
    return (
      
      <body>
        {this.getData}
        <form>
          Name:
          <input
            id="create-name"
            type="text"
            placeholder="Your Name Here"
          />{" "}
          Chirp:
          <input
            id="create-chirp"
            type="text"
            placeholder="Send a new chirp!"
          />
          <input
            id="submit-chirp"
            type="button"
            onClick={this.submitChirp}
            className="btn btn-secondary"
            value="Submit"
          />
        </form>


        
      </body>
    );
  }
}

interface IListProps {}

interface IListState {
  names: Array<string>;
}
