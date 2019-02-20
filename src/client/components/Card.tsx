import * as React from "react";

import { Link } from "react-router-dom";

export interface CardProps {
  chirp: { id: string; user: string; content: string };
}

const CardMod: React.SFC<CardProps> = props => {
  const { id, user, content } = props.chirp;
  return (
    <div className="col-md-8">
      <div className="card mb-1 border border-dark rounded shadow-lg">
        <div className="card-body">
          <h4 className="card-title">
            {user} <span className="says">says:</span>
          </h4>
          <p className="card-text">{content}</p>
          <Link to={`/editing/${id}`} className="btn btn-primary">
            Edit Chirp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardMod;
