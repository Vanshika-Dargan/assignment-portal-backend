import {google} from 'googleapis'
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CLIENT_REDIRECT_URL=process.env.GOOGLE_CLIENT_REDIRECT_URL;

export const oauthClient=new google.auth.OAuth2(GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,GOOGLE_CLIENT_REDIRECT_URL)