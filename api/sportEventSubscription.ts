import { gql } from '@apollo/client';

const sportEventSubscription = gql`
  subscription {
    sportEventSubscription {
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
`;

export default sportEventSubscription;
