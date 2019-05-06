import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";


const Api = () => (
   <Query
    query={gql`
      {
        profile {
          id,
          name
        }
      }
    `}
  > 
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return data.profile.map(({ id, name }) => (
        <div key={id}>
          <p>{` id:: ${id} name :: ${name}`}</p>
        </div>
      ));
    }}
  </Query>
);


export default Api;