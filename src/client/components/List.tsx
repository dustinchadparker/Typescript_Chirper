import * as React from "react";
import ChirpCard from "./Card";

export interface IListProps {}

export interface IListState {
  chirps: { id: string; user: string; content: string }[];

  user: string;
  content: string;
}

class IList extends React.Component<IListProps, IListState> {
  constructor(props: IListProps) {
    super(props);
    this.state = { chirps: [], user: null, content: null };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      let r = await fetch("/api/chirps");
      let data = await r.json();
      let chirps = Object.keys(data).map(key => {
        return {
          id: key,
          user: data[key].user,
          content: data[key].content
        };
      });
      chirps.pop();
      chirps.reverse();
      this.setState({ chirps });
    } catch (e) {
      console.log(e);
    }
  }

  async handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    if (this.state.content && this.state.user) {
      let info = {
        user: this.state.user,
        content: this.state.content
      };

      e.preventDefault();
      try {
        await fetch("/api/chirps", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(info)
        });
      } catch (e) {
        console.log(e);
      }
      location.reload();
    } else {
      alert("Requires username and content!");
    }
  }

  getData = () => {
    return (
      <div className="row my-3">
        {this.state.chirps.map(chirp => {
          return <ChirpCard key={chirp.id} chirp={chirp} />;
        })}
      </div>
    );
  };

  render() {
    return (
      <section>
        <h1> Time to get Chirping!</h1>
        <div className="row">
          <div className="col-md-8">
            <form
              onSubmit={this.handleSubmit}
              className="form-group  shadow-lg bg-white border border-primary rounded"
            >
              <label>Username:</label>
              <input
                type="text"
                className="form-control "
                value={this.state.user}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ user: e.target.value })
                }
              />
              <label>Chirp:</label>
              <input
                type="text"
                className="form-control "
                value={this.state.content}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ content: e.target.value })
                }
              />
              <button className="btn btn-info btn-lg shadow-lg mt-2 mb-1">
                Post!
              </button>
            </form>
          </div>
        </div>

        {this.getData()}
      </section>
    );
  }
}

export default IList;
