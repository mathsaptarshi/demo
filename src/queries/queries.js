import { gql } from 'apollo-boost';

const addMailMutation = gql`
    mutation AddMailData($id: ID!, $name: String! ){
        AddMailData( id: $id, name: $name){            
            id
            name
        }
    }
`;

export { addMailMutation };
