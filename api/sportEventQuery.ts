import { gql } from '@apollo/client';

const sportEventQuery = {
  query: gql`
    query {
      sportEventQuery {
        id
        category {
          id
          slug
        }
        competitors {
          id
          name
          score
        }
        markets {
          id
          name
          selections {
            id
            name
            odds
          }
        }
        startTime
        updatedAt
      }
    }
  `,
};

export default sportEventQuery;
