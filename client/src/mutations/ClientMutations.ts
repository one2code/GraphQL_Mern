import {gql} from '@apollo/client';

// * Matches the id of the client in the database and then deletes the client and all listed properties when instatiated
const DELETE_CLIENT = gql`
mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
        id
        email
        name
        phone
    }

}`

export { DELETE_CLIENT };
