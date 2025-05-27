import { Client, Account, Databases, Query, ID } from "react-native-appwrite";

//Track the searches made by user

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform("com.jsm.movieapp");

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try { 
    const res = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    console.log(res);
    if (res.documents.length > 0) {
      const existingMovie = res.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        title:movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
    // check if a record of the search , if found +1; if not found create a new doc
  } catch (erorr) {
    console.log(erorr);
    throw erorr;
  }
};

// const client = new Client()
//     .setEndpoint('https://fra.cloud.appwrite.io/v1')
//     .setProject('6809c9cf0039d5953947')
//     .setPlatform('com.jsm.movieapp');
// You've successfully added a platform to your project. Access Appwrite services using this project's API Endpoint and Project ID:

// API Endpoint
// https://fra.cloud.appwrite.io/v1
// Project ID
// 6809c9cf0039d5953947
