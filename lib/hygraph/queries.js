import {gql} from "graphql-request";

const AllPosts = gql`
  query AllPosts {
      blogPosts {
        body
        createdAt
        id
        slug
        title
        updatedAt
        heroImage {
          height
          url
          width
        }
      }
    }
`;

const SinglePost = gql`
  query SinglePost($slug: String!) {
    blogPost(where: { slug: $slug }) {
      body
      createdAt
      title
      id
      slug
      updatedAt
      heroImage {
        url
        width
        height
      }
    }
  }
`;

export { AllPosts, SinglePost }