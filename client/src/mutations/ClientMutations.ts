import {gql} from '@apollo/client';

const ADD_CLIENT = gql` mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
        id
        name
        email
        phone
    }
} `
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

export { ADD_CLIENT, DELETE_CLIENT };
