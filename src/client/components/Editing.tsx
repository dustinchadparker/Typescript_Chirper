import * as React from "react";
import { RouteComponentProps } from "react-router";

export interface IEditingProps extends RouteComponentProps<{ id: string }> {}

export interface IEditingState {
  chirp: { user: string; content: string };
}

class Editing extends React.Component<IEditingProps, IEditingState> {
  constructor(props: IEditingProps) {
    super(props);
    this.state = {
      chirp: {
        user: null,
        content: null
      }
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    try {
      let r = await fetch(`/api/chirps/${id}`);
      let chirp = await r.json();
      this.setState({ chirp });
    } catch (e) {
      console.log(e);
    }
  }

  async handleDelete() {
    let id = this.props.match.params.id;

    try {
      await fetch(`/api/chirps/${id}`, {
        method: "DELETE"
      });
      this.props.history.push("/");
    } catch (e) {
      console.log(e);
    }
  }
  async handleEdit(e: React.ChangeEvent<HTMLFormElement>) {
    let id = this.props.match.params.id;

    let info = {
      user: this.state.chirp.user,
      content: this.state.chirp.content
    };

    e.preventDefault();
    try {
      await fetch(`/api/chirps/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(info)
      });
      this.props.history.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  handleChange(val: string) {
    this.state.chirp.content = val;
  }
  render() {
    const { user, content } = this.state.chirp;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card my-2 border border-dark rounded shadow-lg">
            <div className="card-body">
              <h4 className="card-title">{user} says:</h4>
              <div className="input-group mb-3">
                <input
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.handleChange(e.target.value)
                  }
                  className="form-control"
                  placeholder={content}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <button
                  onClick={this.handleEdit.bind(this)}
                  className="btn btn-info"
                >
                  Save Editing of Chirp
                </button>
                <button
                  onClick={this.handleDelete.bind(this)}
                  className="btn btn-danger"
                >
                  X<span className="deletetooltip">Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Editing;
